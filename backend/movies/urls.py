from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cities', views.CityViewSet)
router.register(r'theatres', views.TheatreViewSet)
router.register(r'movies', views.MovieViewSet)
router.register(r'shows', views.ShowViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('bookings/', views.create_booking, name='create-booking'),
    path('payments/', views.process_payment, name='process-payment'),
]
