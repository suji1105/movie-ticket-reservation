from rest_framework import serializers
from .models import City, Theatre, Movie, Show, Seat, Booking, Payment


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class TheatreSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.name', read_only=True)

    class Meta:
        model = Theatre
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'poster', 'banner', 'runtime', 'genres',
                  'language', 'format_type', 'rating', 'release_date', 'is_featured']


class ShowSerializer(serializers.ModelSerializer):
    theatre_name = serializers.CharField(source='theatre.name', read_only=True)
    theatre_address = serializers.CharField(source='theatre.address', read_only=True)
    movie_title = serializers.CharField(source='movie.title', read_only=True)

    class Meta:
        model = Show
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    seat_labels = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'

    def get_seat_labels(self, obj):
        return [f"{s.row}{s.number}" for s in obj.seats.all()]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
