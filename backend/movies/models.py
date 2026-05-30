from django.db import models
import uuid


class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    is_top_city = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Cities"
        ordering = ['name']

    def __str__(self):
        return f"{self.name}, {self.state}"


class Theatre(models.Model):
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='theatres')
    address = models.TextField()
    screen_count = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.name} - {self.city.name}"


class Movie(models.Model):
    LANGUAGE_CHOICES = [
        ('Tamil', 'Tamil'),
        ('English', 'English'),
        ('Telugu', 'Telugu'),
        ('Hindi', 'Hindi'),
        ('Malayalam', 'Malayalam'),
        ('Kannada', 'Kannada'),
    ]
    FORMAT_CHOICES = [
        ('2D', '2D'),
        ('3D', '3D'),
        ('EPIQ', 'EPIQ'),
        ('IMAX 3D', 'IMAX 3D'),
    ]

    title = models.CharField(max_length=200)
    poster = models.URLField(max_length=500, blank=True, null=True)
    banner = models.URLField(max_length=500, blank=True, null=True)
    runtime = models.CharField(max_length=20, help_text="e.g., 2h 30m")
    genres = models.CharField(max_length=200, help_text="Comma separated genres")
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    format_type = models.CharField(max_length=20, choices=FORMAT_CHOICES, default='2D')
    release_date = models.DateField()
    rating = models.CharField(max_length=10, default='UA')
    description = models.TextField(blank=True)
    cast = models.TextField(blank=True, help_text="Comma separated cast names")
    director = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)
    cities = models.ManyToManyField(City, related_name='movies', blank=True)

    def __str__(self):
        return f"{self.title} ({self.language})"


class Show(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='shows')
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE, related_name='shows')
    date = models.DateField()
    time = models.TimeField()
    end_time = models.TimeField()
    price_classic = models.DecimalField(max_digits=8, decimal_places=2, default=220.34)
    price_classic_plus = models.DecimalField(max_digits=8, decimal_places=2, default=237.28)
    price_prime = models.DecimalField(max_digits=8, decimal_places=2, default=262.70)
    price_recliner = models.DecimalField(max_digits=8, decimal_places=2, default=440.68)
    screen_type = models.CharField(max_length=20, default='LASER')

    class Meta:
        ordering = ['date', 'time']

    def __str__(self):
        return f"{self.movie.title} @ {self.theatre.name} - {self.date} {self.time}"


class Seat(models.Model):
    CATEGORY_CHOICES = [
        ('CLASSIC', 'Classic Rows'),
        ('CLASSIC_PLUS', 'Classic Plus Rows'),
        ('PRIME', 'Prime Rows'),
        ('RECLINER', 'Recliner Rows'),
    ]
    STATUS_CHOICES = [
        ('AVAILABLE', 'Available'),
        ('BOOKED', 'Booked'),
        ('BLOCKED', 'Blocked'),
    ]

    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='seats')
    row = models.CharField(max_length=5)
    number = models.IntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='AVAILABLE')

    class Meta:
        ordering = ['row', 'number']
        unique_together = ['show', 'row', 'number']

    def __str__(self):
        return f"{self.row}{self.number} ({self.category})"


class Booking(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
    ]

    booking_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    show = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='bookings')
    seats = models.ManyToManyField(Seat, related_name='bookings')
    customer_name = models.CharField(max_length=100, blank=True)
    customer_email = models.EmailField(blank=True)
    customer_phone = models.CharField(max_length=15, blank=True)
    num_tickets = models.IntegerField(default=1)
    net_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gst = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    convenience_fee = models.DecimalField(max_digits=10, decimal_places=2, default=46.02)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.booking_id} - {self.show.movie.title}"


class Payment(models.Model):
    METHOD_CHOICES = [
        ('UPI', 'UPI'),
        ('CREDIT_CARD', 'Credit Card'),
        ('DEBIT_CARD', 'Debit Card'),
        ('NET_BANKING', 'Net Banking'),
        ('WALLET', 'Wallet'),
    ]
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    method = models.CharField(max_length=20, choices=METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.transaction_id} - ₹{self.amount}"
