from django.contrib import admin
from .models import City, Theatre, Movie, Show, Seat, Booking, Payment


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name', 'state', 'is_top_city']
    list_filter = ['state', 'is_top_city']
    search_fields = ['name', 'state']


@admin.register(Theatre)
class TheatreAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'screen_count']
    list_filter = ['city']
    search_fields = ['name']


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'language', 'format_type', 'runtime', 'rating', 'release_date', 'is_featured']
    list_filter = ['language', 'format_type', 'is_featured']
    search_fields = ['title', 'genres']
    filter_horizontal = ['cities']


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display = ['movie', 'theatre', 'date', 'time', 'screen_type']
    list_filter = ['date', 'screen_type']
    search_fields = ['movie__title', 'theatre__name']


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ['show', 'row', 'number', 'category', 'status']
    list_filter = ['category', 'status']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id', 'show', 'customer_name', 'num_tickets', 'grand_total', 'status', 'created_at']
    list_filter = ['status']
    search_fields = ['booking_id', 'customer_name']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'booking', 'method', 'amount', 'status', 'created_at']
    list_filter = ['method', 'status']
