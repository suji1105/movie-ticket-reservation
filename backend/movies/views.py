from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import City, Theatre, Movie, Show, Seat, Booking, Payment
from .serializers import (
    CitySerializer, TheatreSerializer, MovieSerializer, MovieListSerializer,
    ShowSerializer, SeatSerializer, BookingSerializer, PaymentSerializer
)


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    @action(detail=False, methods=['get'])
    def top(self, request):
        top_cities = City.objects.filter(is_top_city=True)
        serializer = self.get_serializer(top_cities, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def movies(self, request, pk=None):
        city = self.get_object()
        movies = Movie.objects.filter(cities=city)
        serializer = MovieListSerializer(movies, many=True)
        return Response(serializer.data)


class TheatreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Theatre.objects.all()
    serializer_class = TheatreSerializer

    def get_queryset(self):
        queryset = Theatre.objects.all()
        city_id = self.request.query_params.get('city', None)
        if city_id:
            queryset = queryset.filter(city_id=city_id)
        return queryset


class MovieViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Movie.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return MovieListSerializer
        return MovieSerializer

    def get_queryset(self):
        queryset = Movie.objects.all()
        language = self.request.query_params.get('language', None)
        genre = self.request.query_params.get('genre', None)
        format_type = self.request.query_params.get('format', None)
        city_id = self.request.query_params.get('city', None)
        featured = self.request.query_params.get('featured', None)

        if language:
            queryset = queryset.filter(language=language)
        if genre:
            queryset = queryset.filter(genres__icontains=genre)
        if format_type:
            queryset = queryset.filter(format_type=format_type)
        if city_id:
            queryset = queryset.filter(cities__id=city_id)
        if featured:
            queryset = queryset.filter(is_featured=True)
        return queryset.distinct()

    @action(detail=True, methods=['get'])
    def shows(self, request, pk=None):
        movie = self.get_object()
        city_id = request.query_params.get('city', None)
        shows = Show.objects.filter(movie=movie)
        if city_id:
            shows = shows.filter(theatre__city_id=city_id)
        serializer = ShowSerializer(shows, many=True)
        return Response(serializer.data)


class ShowViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

    @action(detail=True, methods=['get'])
    def seats(self, request, pk=None):
        show = self.get_object()
        seats = Seat.objects.filter(show=show)
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def create_booking(request):
    show_id = request.data.get('show_id')
    seat_ids = request.data.get('seat_ids', [])
    customer_name = request.data.get('customer_name', '')
    customer_email = request.data.get('customer_email', '')
    customer_phone = request.data.get('customer_phone', '')

    if not show_id or not seat_ids:
        return Response({'error': 'show_id and seat_ids are required'},
                        status=status.HTTP_400_BAD_REQUEST)

    show = get_object_or_404(Show, id=show_id)
    seats = Seat.objects.filter(id__in=seat_ids, show=show, status='AVAILABLE')

    if seats.count() != len(seat_ids):
        return Response({'error': 'Some seats are not available'},
                        status=status.HTTP_400_BAD_REQUEST)

    # Calculate pricing
    net_price = 0
    for seat in seats:
        if seat.category == 'CLASSIC':
            net_price += float(show.price_classic)
        elif seat.category == 'CLASSIC_PLUS':
            net_price += float(show.price_classic_plus)
        elif seat.category == 'PRIME':
            net_price += float(show.price_prime)
        elif seat.category == 'RECLINER':
            net_price += float(show.price_recliner)

    gst = round(net_price * 0.18, 2)
    total_price = round(net_price + gst, 2)
    convenience_fee = 46.02
    grand_total = round(total_price + convenience_fee, 2)

    booking = Booking.objects.create(
        show=show,
        customer_name=customer_name,
        customer_email=customer_email,
        customer_phone=customer_phone,
        num_tickets=len(seat_ids),
        net_price=net_price,
        gst=gst,
        total_price=total_price,
        convenience_fee=convenience_fee,
        grand_total=grand_total,
    )
    booking.seats.set(seats)

    # Mark seats as booked
    seats.update(status='BOOKED')

    serializer = BookingSerializer(booking)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def process_payment(request):
    booking_id = request.data.get('booking_id')
    method = request.data.get('method', 'UPI')

    booking = get_object_or_404(Booking, id=booking_id)

    payment = Payment.objects.create(
        booking=booking,
        method=method,
        amount=booking.grand_total,
        status='SUCCESS'
    )

    booking.status = 'CONFIRMED'
    booking.save()

    serializer = PaymentSerializer(payment)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
