from django.core.management.base import BaseCommand
from movies.models import City, Theatre, Movie, Show, Seat
from datetime import date, time
import random


class Command(BaseCommand):
    help = 'Seed database with sample data for Cine Vault'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # Clear existing data
        Seat.objects.all().delete()
        Show.objects.all().delete()
        Movie.objects.all().delete()
        Theatre.objects.all().delete()
        City.objects.all().delete()

        # ── Cities ──────────────────────────────────────────────
        cities_data = [
            # Top 10 cities
            ('Chennai', 'Tamil Nadu', True),
            ('Mumbai', 'Maharashtra', True),
            ('Delhi', 'Delhi', True),
            ('Bengaluru', 'Karnataka', True),
            ('Hyderabad', 'Telangana', True),
            ('Kolkata', 'West Bengal', True),
            ('Pune', 'Maharashtra', True),
            ('Ahmedabad', 'Gujarat', True),
            ('Kochi', 'Kerala', True),
            ('Coimbatore', 'Tamil Nadu', True),
            # Other cities
            ('Madurai', 'Tamil Nadu', False),
            ('Trichy', 'Tamil Nadu', False),
            ('Salem', 'Tamil Nadu', False),
            ('Tirunelveli', 'Tamil Nadu', False),
            ('Vijayawada', 'Andhra Pradesh', False),
            ('Visakhapatnam', 'Andhra Pradesh', False),
            ('Thiruvananthapuram', 'Kerala', False),
            ('Jaipur', 'Rajasthan', False),
            ('Lucknow', 'Uttar Pradesh', False),
            ('Chandigarh', 'Punjab', False),
            ('Indore', 'Madhya Pradesh', False),
            ('Nagpur', 'Maharashtra', False),
            ('Bhopal', 'Madhya Pradesh', False),
            ('Patna', 'Bihar', False),
            ('Surat', 'Gujarat', False),
        ]

        cities = {}
        for name, state, is_top in cities_data:
            city = City.objects.create(name=name, state=state, is_top_city=is_top)
            cities[name] = city

        self.stdout.write(f'  Created {len(cities)} cities')

        # ── Theatres ────────────────────────────────────────────
        theatres_data = [
            ('PVR Global Mall', 'Chennai', 'Velachery Main Rd, Chennai', 4),
            ('SPI Palazzo', 'Chennai', 'Forum Mall, Vadapalani, Chennai', 3),
            ('INOX CITI', 'Chennai', 'Dr Radha Krishnan Salai, Chennai', 3),
            ('AGS Cinemas', 'Chennai', 'T Nagar, Chennai', 5),
            ('Luxe Cinemas', 'Chennai', 'Phoenix MarketCity, Chennai', 4),
            ('PVR Phoenix', 'Mumbai', 'Lower Parel, Mumbai', 5),
            ('INOX Megaplex', 'Mumbai', 'Inorbit Mall, Malad, Mumbai', 4),
            ('Cinepolis Andheri', 'Mumbai', 'Andheri West, Mumbai', 3),
            ('PVR Select City Walk', 'Delhi', 'Saket, New Delhi', 6),
            ('INOX Nehru Place', 'Delhi', 'Nehru Place, New Delhi', 3),
            ('PVR Orion Mall', 'Bengaluru', 'Rajajinagar, Bengaluru', 5),
            ('INOX Garuda Mall', 'Bengaluru', 'Magrath Rd, Bengaluru', 3),
            ('PVR Global Mall', 'Bengaluru', 'Mysore Road, Bengaluru', 4),
            ('AMB Cinemas', 'Hyderabad', 'Gachibowli, Hyderabad', 5),
            ('PVR Next', 'Hyderabad', 'Ameerpet, Hyderabad', 4),
            ('INOX South City', 'Kolkata', 'Prince Anwar Shah Rd, Kolkata', 3),
            ('INOX Bund Garden', 'Pune', 'Bund Garden Rd, Pune', 3),
            ('PVR Seasons Mall', 'Pune', 'Magarpatta, Pune', 4),
            ('SPI Solas', 'Ahmedabad', 'SG Highway, Ahmedabad', 3),
            ('PVR Lulu Mall', 'Kochi', 'Edappally, Kochi', 4),
            ('INOX Brookefields', 'Coimbatore', 'Brookefields Mall, Coimbatore', 3),
        ]

        theatres = []
        for name, city_name, addr, screens in theatres_data:
            t = Theatre.objects.create(
                name=name, city=cities[city_name],
                address=addr, screen_count=screens
            )
            theatres.append(t)

        self.stdout.write(f'  Created {len(theatres)} theatres')

        # ── Movies ──────────────────────────────────────────────
        movies_data = [
            {
                'title': 'Karuppu',
                'poster': 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
                'runtime': '3h 04m', 'genres': 'Drama,Thriller',
                'language': 'Tamil', 'format_type': '2D',
                'release_date': '2026-05-16', 'rating': 'UA 13+',
                'description': 'A gripping tale of survival and redemption set in rural Tamil Nadu.',
                'cast': 'Vijay Sethupathi,Nayanthara,Samuthirakani',
                'director': 'Vetrimaaran', 'is_featured': True,
            },
            {
                'title': 'Thunderbolts',
                'poster': 'https://image.tmdb.org/t/p/w500/m0lSxkFNnBVGsbOKMjRCVMQWhxc.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/m0lSxkFNnBVGsbOKMjRCVMQWhxc.jpg',
                'runtime': '2h 35m', 'genres': 'Action,Sci-Fi,Adventure',
                'language': 'English', 'format_type': 'IMAX 3D',
                'release_date': '2026-05-02', 'rating': 'UA 13+',
                'description': 'Marvel anti-heroes unite for a high-stakes mission.',
                'cast': 'Florence Pugh,Sebastian Stan,David Harbour',
                'director': 'Jake Schreier', 'is_featured': True,
            },
            {
                'title': 'Pushpa 3: The Rampage',
                'poster': 'https://image.tmdb.org/t/p/w500/bGaBn1nJyDAX9jah0Fm3V3eCVXR.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/bGaBn1nJyDAX9jah0Fm3V3eCVXR.jpg',
                'runtime': '2h 58m', 'genres': 'Action,Drama',
                'language': 'Telugu', 'format_type': '2D',
                'release_date': '2026-05-09', 'rating': 'UA',
                'description': 'Pushpa returns in the epic conclusion of the smuggling saga.',
                'cast': 'Allu Arjun,Rashmika Mandanna,Fahadh Faasil',
                'director': 'Sukumar', 'is_featured': True,
            },
            {
                'title': 'War 2',
                'poster': 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEERB2.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/1E5baAaEse26fej7uHcjOgEERB2.jpg',
                'runtime': '2h 45m', 'genres': 'Action,Thriller',
                'language': 'Hindi', 'format_type': '3D',
                'release_date': '2026-05-15', 'rating': 'UA',
                'description': 'The explosive sequel to Indias biggest action franchise.',
                'cast': 'Hrithik Roshan,Jr NTR,Kiara Advani',
                'director': 'Ayan Mukerji', 'is_featured': True,
            },
            {
                'title': 'Empuraan',
                'poster': 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
                'runtime': '2h 50m', 'genres': 'Action,Drama,Thriller',
                'language': 'Malayalam', 'format_type': 'EPIQ',
                'release_date': '2026-05-20', 'rating': 'UA',
                'description': 'The sequel to Lucifer. Zayed Masood faces new challenges.',
                'cast': 'Mohanlal,Prithviraj,Manju Warrier',
                'director': 'Prithviraj Sukumaran', 'is_featured': True,
            },
            {
                'title': 'Vidaamuyarchi',
                'poster': 'https://image.tmdb.org/t/p/w500/hU1TJiXchWCoMEkh3I7VfAaOywR.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/hU1TJiXchWCoMEkh3I7VfAaOywR.jpg',
                'runtime': '2h 25m', 'genres': 'Action,Thriller',
                'language': 'Tamil', 'format_type': '2D',
                'release_date': '2026-05-01', 'rating': 'UA',
                'description': 'A man embarks on a dangerous journey to save his wife.',
                'cast': 'Ajith Kumar,Trisha,Arjun Das',
                'director': 'Magizh Thirumeni', 'is_featured': False,
            },
            {
                'title': 'Spirit',
                'poster': 'https://image.tmdb.org/t/p/w500/ngl2Cxy2w7jF4E7gVxPnKIbeNPD.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/ngl2Cxy2w7jF4E7gVxPnKIbeNPD.jpg',
                'runtime': '2h 40m', 'genres': 'Drama,Crime',
                'language': 'Hindi', 'format_type': '2D',
                'release_date': '2026-05-08', 'rating': 'UA 13+',
                'description': 'A cop battles inner demons while solving a complex case.',
                'cast': 'Prabhas,Saif Ali Khan,Shraddha Kapoor',
                'director': 'Sandeep Reddy Vanga', 'is_featured': False,
            },
            {
                'title': 'Coolie',
                'poster': 'https://image.tmdb.org/t/p/w500/3V4L4kBOMJJj2ZNClIthKMWjaEx.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/3V4L4kBOMJJj2ZNClIthKMWjaEx.jpg',
                'runtime': '2h 55m', 'genres': 'Action,Comedy,Drama',
                'language': 'Tamil', 'format_type': '2D',
                'release_date': '2026-05-22', 'rating': 'UA',
                'description': 'Rajinikanths mass entertainer about a coolie who rises to power.',
                'cast': 'Rajinikanth,Shruti Haasan,Sathyaraj',
                'director': 'Lokesh Kanagaraj', 'is_featured': True,
            },
            {
                'title': 'Toxic',
                'poster': 'https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg',
                'runtime': '2h 30m', 'genres': 'Action,Crime,Thriller',
                'language': 'Kannada', 'format_type': '2D',
                'release_date': '2026-05-10', 'rating': 'UA 16+',
                'description': 'A dark underworld saga spanning continents.',
                'cast': 'Yash,Kiara Advani,Nayanthara',
                'director': 'Geetu Mohandas', 'is_featured': False,
            },
            {
                'title': 'Final Destination: Bloodlines',
                'poster': 'https://image.tmdb.org/t/p/w500/6WxhEvFsNOBxnMYuv5hVYrDHEpE.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/6WxhEvFsNOBxnMYuv5hVYrDHEpE.jpg',
                'runtime': '1h 50m', 'genres': 'Horror,Thriller',
                'language': 'English', 'format_type': '3D',
                'release_date': '2026-05-16', 'rating': 'A',
                'description': 'Death returns with a vengeance in this terrifying new chapter.',
                'cast': 'Brec Bassinger,Teo Briones,Kaitlyn Santa Juana',
                'director': 'Zach Lipovsky', 'is_featured': False,
            },
            {
                'title': 'Retro',
                'poster': 'https://image.tmdb.org/t/p/w500/aosm8bFxOwRFamNMCVhsIkF2jcf.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/aosm8bFxOwRFamNMCVhsIkF2jcf.jpg',
                'runtime': '2h 35m', 'genres': 'Romance,Drama',
                'language': 'Tamil', 'format_type': '2D',
                'release_date': '2026-05-12', 'rating': 'UA',
                'description': 'A heartfelt love story spanning different timelines.',
                'cast': 'Suriya,Jyotika,Jayam Ravi',
                'director': 'Gautham Vasudev Menon', 'is_featured': False,
            },
            {
                'title': 'Devara Part 2',
                'poster': 'https://image.tmdb.org/t/p/w500/kLEha2JMJlsXkcc5BKZJGA0vFIa.jpg',
                'banner': 'https://image.tmdb.org/t/p/original/kLEha2JMJlsXkcc5BKZJGA0vFIa.jpg',
                'runtime': '2h 48m', 'genres': 'Action,Adventure',
                'language': 'Telugu', 'format_type': 'IMAX 3D',
                'release_date': '2026-05-18', 'rating': 'UA',
                'description': 'The epic saga of the sea lord continues.',
                'cast': 'Jr NTR,Janhvi Kapoor,Saif Ali Khan',
                'director': 'Koratala Siva', 'is_featured': False,
            },
        ]

        movie_objects = []
        top_city_list = [c for c in cities.values() if c.is_top_city]
        all_city_list = list(cities.values())

        for mdata in movies_data:
            m = Movie.objects.create(
                title=mdata['title'],
                poster=mdata['poster'],
                banner=mdata['banner'],
                runtime=mdata['runtime'],
                genres=mdata['genres'],
                language=mdata['language'],
                format_type=mdata['format_type'],
                release_date=mdata['release_date'],
                rating=mdata['rating'],
                description=mdata['description'],
                cast=mdata['cast'],
                director=mdata['director'],
                is_featured=mdata['is_featured'],
            )
            # Assign to random cities (at least top cities)
            assigned = random.sample(top_city_list, k=min(7, len(top_city_list)))
            extras = random.sample(all_city_list, k=min(5, len(all_city_list)))
            all_assigned = list(set(assigned + extras))
            m.cities.set(all_assigned)
            movie_objects.append(m)

        self.stdout.write(f'  Created {len(movie_objects)} movies')

        # ── Shows ───────────────────────────────────────────────
        show_times = [
            (time(9, 0), time(12, 0)),
            (time(10, 0), time(13, 0)),
            (time(12, 5), time(15, 5)),
            (time(13, 5), time(16, 5)),
            (time(15, 10), time(18, 10)),
            (time(16, 15), time(19, 15)),
            (time(18, 15), time(21, 15)),
            (time(19, 15), time(22, 19)),
            (time(22, 20), time(1, 20)),
        ]

        show_count = 0
        today = date.today()

        for movie in movie_objects:
            movie_cities = movie.cities.all()
            for city in movie_cities:
                city_theatres = list(Theatre.objects.filter(city=city))
                if not city_theatres:
                    continue
                selected_theatres = random.sample(city_theatres, k=min(2, len(city_theatres)))
                for theatre in selected_theatres:
                    selected_times = random.sample(show_times, k=min(4, len(show_times)))
                    for st, et in selected_times:
                        show = Show.objects.create(
                            movie=movie,
                            theatre=theatre,
                            date=today,
                            time=st,
                            end_time=et,
                            screen_type=random.choice(['LASER', '4K', 'DOLBY']),
                        )
                        show_count += 1

                        # Create seats for each show
                        self._create_seats(show)

        self.stdout.write(f'  Created {show_count} shows with seats')
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def _create_seats(self, show):
        seats = []
        # Classic Rows A-B (14 seats each)
        for row in ['A', 'B']:
            for num in range(1, 15):
                seats.append(Seat(
                    show=show, row=row, number=num,
                    category='CLASSIC',
                    status=random.choice(['AVAILABLE', 'AVAILABLE', 'AVAILABLE', 'BOOKED'])
                ))

        # Classic Plus Rows C-H (16 seats each)
        for row in ['C', 'D', 'E', 'F', 'G', 'H']:
            for num in range(1, 17):
                seats.append(Seat(
                    show=show, row=row, number=num,
                    category='CLASSIC_PLUS',
                    status=random.choice(['AVAILABLE', 'AVAILABLE', 'AVAILABLE', 'BOOKED'])
                ))

        # Prime Rows J-P (19 seats each)
        for row in ['J', 'K', 'L', 'M', 'N', 'P']:
            for num in range(1, 20):
                seats.append(Seat(
                    show=show, row=row, number=num,
                    category='PRIME',
                    status=random.choice(['AVAILABLE', 'AVAILABLE', 'AVAILABLE', 'BOOKED'])
                ))

        # Recliner Row Q (12 seats)
        for num in range(1, 13):
            seats.append(Seat(
                show=show, row='Q', number=num,
                category='RECLINER',
                status=random.choice(['AVAILABLE', 'AVAILABLE', 'AVAILABLE', 'BOOKED'])
            ))

        Seat.objects.bulk_create(seats)
