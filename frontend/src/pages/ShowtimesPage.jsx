import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/mockData';
import { useCity } from '../contexts/CityContext';
import './ShowtimesPage.css';

// ── Theatres for every city ─────────────────────────
const theatresByCity = {
  Chennai: [
    { id: 1, name: 'PVR: VR Mall, Anna Nagar', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:15 PM', format: '2D' }, { time: '4:30 PM', format: '2D' }, { time: '7:45 PM', format: '2D' }, { time: '11:00 PM', format: '2D' }] },
    { id: 2, name: 'AGS Cinemas, T. Nagar', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '6:15 PM', format: 'DOLBY ATMOS' }, { time: '9:30 PM', format: 'DOLBY ATMOS' }] },
    { id: 3, name: 'SPI S2 Cinemas, OMR', cancellable: true, shows: [{ time: '11:00 AM', format: 'EPIQ' }, { time: '2:30 PM', format: 'EPIQ' }, { time: '6:00 PM', format: 'EPIQ' }, { time: '9:45 PM', format: 'EPIQ' }] },
    { id: 4, name: 'INOX: Phoenix MarketCity, Velachery', cancellable: true, shows: [{ time: '10:15 AM', format: '2D' }, { time: '1:30 PM', format: '2D' }, { time: '5:00 PM', format: '2D' }, { time: '8:15 PM', format: '2D' }] },
    { id: 5, name: 'Rohini Silver Screens, Koyambedu', cancellable: false, shows: [{ time: '10:00 AM', format: '4K DOLBY 7.1' }, { time: '1:00 PM', format: '4K DOLBY 7.1' }, { time: '4:00 PM', format: '4K DOLBY 7.1' }, { time: '7:00 PM', format: '4K DOLBY 7.1' }, { time: '10:00 PM', format: '4K DOLBY 7.1' }] },
    { id: 6, name: 'Sathyam Cinemas, Royapettah', cancellable: true, shows: [{ time: '9:30 AM', format: 'IMAX 2D' }, { time: '12:45 PM', format: 'IMAX 2D' }, { time: '4:00 PM', format: 'IMAX 2D' }, { time: '7:15 PM', format: 'IMAX 2D' }, { time: '10:30 PM', format: 'IMAX 2D' }] },
  ],
  Mumbai: [
    { id: 7, name: 'PVR: Juhu', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 8, name: 'INOX Megaplex, R-City Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'IMAX 3D' }, { time: '2:00 PM', format: 'IMAX 3D' }, { time: '5:30 PM', format: 'IMAX 3D' }, { time: '9:00 PM', format: 'IMAX 3D' }] },
    { id: 9, name: 'Cinepolis: Andheri West', cancellable: true, shows: [{ time: '11:00 AM', format: '4DX' }, { time: '2:30 PM', format: '4DX' }, { time: '6:00 PM', format: '4DX' }, { time: '9:30 PM', format: '4DX' }] },
    { id: 10, name: 'PVR ICON: Oberoi Mall, Goregaon', cancellable: false, shows: [{ time: '10:45 AM', format: 'DOLBY ATMOS' }, { time: '1:45 PM', format: 'DOLBY ATMOS' }, { time: '4:45 PM', format: 'DOLBY ATMOS' }, { time: '7:45 PM', format: 'DOLBY ATMOS' }, { time: '10:45 PM', format: 'DOLBY ATMOS' }] },
    { id: 11, name: 'Gaiety Galaxy, Bandra', cancellable: true, shows: [{ time: '12:00 PM', format: '2D' }, { time: '3:00 PM', format: '2D' }, { time: '6:30 PM', format: '2D' }, { time: '9:30 PM', format: '2D' }] },
  ],
  Delhi: [
    { id: 12, name: 'PVR Luxe: Select Citywalk, Saket', cancellable: true, shows: [{ time: '10:00 AM', format: 'GOLD CLASS' }, { time: '1:30 PM', format: 'GOLD CLASS' }, { time: '5:00 PM', format: 'GOLD CLASS' }, { time: '8:30 PM', format: 'GOLD CLASS' }] },
    { id: 13, name: 'PVR: Pacific Mall, Subhash Nagar', cancellable: true, shows: [{ time: '10:15 AM', format: '2D' }, { time: '1:15 PM', format: '2D' }, { time: '4:15 PM', format: '2D' }, { time: '7:15 PM', format: '2D' }, { time: '10:15 PM', format: '2D' }] },
    { id: 14, name: 'INOX: Nehru Place', cancellable: true, shows: [{ time: '11:00 AM', format: 'DOLBY ATMOS' }, { time: '2:30 PM', format: 'DOLBY ATMOS' }, { time: '6:00 PM', format: 'DOLBY ATMOS' }, { time: '9:30 PM', format: 'DOLBY ATMOS' }] },
    { id: 15, name: 'Cinepolis: DLF Mall of India, Noida', cancellable: false, shows: [{ time: '10:30 AM', format: 'IMAX 2D' }, { time: '2:00 PM', format: 'IMAX 2D' }, { time: '5:30 PM', format: 'IMAX 2D' }, { time: '9:00 PM', format: 'IMAX 2D' }] },
  ],
  Bengaluru: [
    { id: 16, name: 'PVR: Orion Mall, Rajajinagar', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 17, name: 'INOX: Garuda Mall, Magrath Road', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
    { id: 18, name: 'Cinepolis: Royal Meenakshi Mall', cancellable: true, shows: [{ time: '11:15 AM', format: '4DX' }, { time: '2:45 PM', format: '4DX' }, { time: '6:15 PM', format: '4DX' }, { time: '9:45 PM', format: '4DX' }] },
    { id: 19, name: 'PVR: Forum Mall, Koramangala', cancellable: false, shows: [{ time: '10:00 AM', format: 'IMAX 2D' }, { time: '1:30 PM', format: 'IMAX 2D' }, { time: '5:00 PM', format: 'IMAX 2D' }, { time: '8:30 PM', format: 'IMAX 2D' }] },
  ],
  Hyderabad: [
    { id: 20, name: 'PVR: Next Galleria Mall, Punjagutta', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:15 PM', format: '2D' }, { time: '4:30 PM', format: '2D' }, { time: '7:45 PM', format: '2D' }, { time: '11:00 PM', format: '2D' }] },
    { id: 21, name: 'INOX: GVK One Mall, Banjara Hills', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
    { id: 22, name: 'Asian Cinemas: Hyderabad Central', cancellable: true, shows: [{ time: '11:00 AM', format: '4K LASER' }, { time: '2:30 PM', format: '4K LASER' }, { time: '6:00 PM', format: '4K LASER' }, { time: '9:30 PM', format: '4K LASER' }] },
    { id: 23, name: 'Prasads Multiplex, Necklace Road', cancellable: false, shows: [{ time: '10:15 AM', format: 'IMAX 2D' }, { time: '1:45 PM', format: 'IMAX 2D' }, { time: '5:15 PM', format: 'IMAX 2D' }, { time: '8:45 PM', format: 'IMAX 2D' }] },
  ],
  Kolkata: [
    { id: 24, name: 'INOX: South City Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 25, name: 'PVR: Mani Square, EM Bypass', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
    { id: 26, name: 'Cinepolis: Acropolis Mall, Kasba', cancellable: true, shows: [{ time: '11:00 AM', format: '2D' }, { time: '2:30 PM', format: '2D' }, { time: '6:00 PM', format: '2D' }, { time: '9:30 PM', format: '2D' }] },
  ],
  Pune: [
    { id: 27, name: 'PVR: Phoenix Marketcity, Viman Nagar', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 28, name: 'INOX: Bund Garden Road', cancellable: true, shows: [{ time: '10:30 AM', format: 'IMAX 2D' }, { time: '2:00 PM', format: 'IMAX 2D' }, { time: '5:30 PM', format: 'IMAX 2D' }, { time: '9:00 PM', format: 'IMAX 2D' }] },
    { id: 29, name: 'Cinepolis: Seasons Mall, Magarpatta', cancellable: false, shows: [{ time: '11:15 AM', format: 'DOLBY ATMOS' }, { time: '2:45 PM', format: 'DOLBY ATMOS' }, { time: '6:15 PM', format: 'DOLBY ATMOS' }, { time: '9:45 PM', format: 'DOLBY ATMOS' }] },
  ],
  Ahmedabad: [
    { id: 30, name: 'PVR: Acropolis Mall, Thaltej', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:15 PM', format: '2D' }, { time: '4:30 PM', format: '2D' }, { time: '7:45 PM', format: '2D' }] },
    { id: 31, name: 'Cinepolis: Ahmedabad One Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
    { id: 32, name: 'INOX: SG Highway', cancellable: false, shows: [{ time: '11:00 AM', format: '2D' }, { time: '2:30 PM', format: '2D' }, { time: '6:00 PM', format: '2D' }, { time: '9:30 PM', format: '2D' }] },
  ],
  Kochi: [
    { id: 33, name: 'PVR: Forum Mall, Kochi', cancellable: true, shows: [{ time: '10:40 AM', format: '2D' }, { time: '3:30 PM', format: '2D' }, { time: '7:15 PM', format: '2D' }, { time: '10:40 PM', format: '2D' }] },
    { id: 34, name: 'Shenoys: Kochi', cancellable: true, shows: [{ time: '10:45 AM', format: '4K DOLBY 7.1' }, { time: '1:00 PM', format: '4K DOLBY 7.1' }, { time: '4:15 PM', format: '4K DOLBY 7.1' }, { time: '10:45 PM', format: '4K DOLBY 7.1' }] },
    { id: 35, name: 'PVR: Oberon Mall, Kochi', cancellable: true, shows: [{ time: '10:50 AM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:30 PM', format: '2D' }, { time: '10:50 PM', format: '2D' }] },
    { id: 36, name: 'Cinepolis: Centre Square Mall', cancellable: false, shows: [{ time: '10:00 AM', format: '2K LASER DOLBY 7.1' }, { time: '1:30 PM', format: '2K LASER DOLBY 7.1' }, { time: '6:30 PM', format: '2K LASER DOLBY 7.1' }, { time: '10:00 PM', format: '2K LASER DOLBY 7.1' }] },
  ],
  Coimbatore: [
    { id: 37, name: 'INOX: Brookefields Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 38, name: 'KG Cinemas', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
    { id: 39, name: 'Cinepolis: Fun Republic Mall', cancellable: false, shows: [{ time: '11:00 AM', format: '4K' }, { time: '2:30 PM', format: '4K' }, { time: '6:00 PM', format: '4K' }, { time: '9:30 PM', format: '4K' }] },
  ],
  Madurai: [
    { id: 40, name: 'Meenakshi Cinemas', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 41, name: 'Thenandal Cinemas', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY 7.1' }, { time: '1:30 PM', format: 'DOLBY 7.1' }, { time: '6:30 PM', format: 'DOLBY 7.1' }, { time: '9:30 PM', format: 'DOLBY 7.1' }] },
  ],
  Trichy: [
    { id: 42, name: 'SRS Cinemas, Trichy', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 43, name: 'G.K.D Cinemas', cancellable: false, shows: [{ time: '10:30 AM', format: '4K' }, { time: '2:00 PM', format: '4K' }, { time: '6:00 PM', format: '4K' }, { time: '9:30 PM', format: '4K' }] },
  ],
  Salem: [
    { id: 44, name: 'PVR: Salem', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 45, name: 'Lakshmi Cinemas', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY 7.1' }, { time: '1:30 PM', format: 'DOLBY 7.1' }, { time: '6:30 PM', format: 'DOLBY 7.1' }] },
  ],
  Tirunelveli: [
    { id: 46, name: 'Ramasamy Cinemas', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 47, name: 'SKS Cinemas', cancellable: false, shows: [{ time: '10:30 AM', format: '4K' }, { time: '2:00 PM', format: '4K' }, { time: '6:30 PM', format: '4K' }, { time: '9:30 PM', format: '4K' }] },
  ],
  Vijayawada: [
    { id: 48, name: 'PVR: Trendset Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:15 PM', format: '2D' }, { time: '4:30 PM', format: '2D' }, { time: '7:45 PM', format: '2D' }] },
    { id: 49, name: 'INOX: PVP Square Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
  ],
  Visakhapatnam: [
    { id: 50, name: 'INOX: CMR Central Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 51, name: 'Cinepolis: Varun Beach Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'IMAX 2D' }, { time: '2:00 PM', format: 'IMAX 2D' }, { time: '5:30 PM', format: 'IMAX 2D' }, { time: '9:00 PM', format: 'IMAX 2D' }] },
  ],
  Thiruvananthapuram: [
    { id: 52, name: 'PVR: Mall of Travancore', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 53, name: 'Ariesplex SL Cinemas', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '6:00 PM', format: 'DOLBY ATMOS' }, { time: '9:30 PM', format: 'DOLBY ATMOS' }] },
  ],
  Jaipur: [
    { id: 54, name: 'INOX: Crystal Palm Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 55, name: 'Raj Mandir Cinema', cancellable: false, shows: [{ time: '12:00 PM', format: '2D' }, { time: '3:30 PM', format: '2D' }, { time: '6:30 PM', format: '2D' }, { time: '9:30 PM', format: '2D' }] },
  ],
  Lucknow: [
    { id: 56, name: 'PVR: Phoenix Palassio', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:15 PM', format: '2D' }, { time: '4:30 PM', format: '2D' }, { time: '7:45 PM', format: '2D' }] },
    { id: 57, name: 'INOX: Riverside Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
  ],
  Chandigarh: [
    { id: 58, name: 'PVR: Elante Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }, { time: '10:00 PM', format: '2D' }] },
    { id: 59, name: 'Cinepolis: DLF City Centre', cancellable: true, shows: [{ time: '10:45 AM', format: 'IMAX 2D' }, { time: '2:15 PM', format: 'IMAX 2D' }, { time: '5:45 PM', format: 'IMAX 2D' }, { time: '9:15 PM', format: 'IMAX 2D' }] },
  ],
  Indore: [
    { id: 60, name: 'PVR: Treasure Island Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 61, name: 'INOX: C21 Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
  ],
  Nagpur: [
    { id: 62, name: 'PVR: Empress Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 63, name: 'INOX: Poonam Mall', cancellable: false, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
  ],
  Bhopal: [
    { id: 64, name: 'INOX: DB City Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 65, name: 'Cinepolis: Aashima Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '6:00 PM', format: 'DOLBY ATMOS' }, { time: '9:30 PM', format: 'DOLBY ATMOS' }] },
  ],
  Patna: [
    { id: 66, name: 'PVR: P&M Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 67, name: 'INOX: Mangal City Mall', cancellable: true, shows: [{ time: '10:30 AM', format: 'DOLBY ATMOS' }, { time: '2:00 PM', format: 'DOLBY ATMOS' }, { time: '5:30 PM', format: 'DOLBY ATMOS' }, { time: '9:00 PM', format: 'DOLBY ATMOS' }] },
  ],
  Surat: [
    { id: 68, name: 'INOX: Raghuvir Mall', cancellable: true, shows: [{ time: '10:00 AM', format: '2D' }, { time: '1:00 PM', format: '2D' }, { time: '4:00 PM', format: '2D' }, { time: '7:00 PM', format: '2D' }] },
    { id: 69, name: 'Cinepolis: VR Surat', cancellable: true, shows: [{ time: '10:30 AM', format: 'IMAX 2D' }, { time: '2:00 PM', format: 'IMAX 2D' }, { time: '5:30 PM', format: 'IMAX 2D' }, { time: '9:00 PM', format: 'IMAX 2D' }] },
  ],
};

const getTheatreAddress = (theatreName, cityName) => {
  const customAddresses = {
    'PVR: VR Mall, Anna Nagar': 'VR Mall, Jawaharlal Nehru Road, Anna Nagar, Chennai',
    'AGS Cinemas, T. Nagar': 'No. 24, G.N. Chetty Road, T. Nagar, Chennai',
    'SPI S2 Cinemas, OMR': 'OMR Road, Thoraipakkam, Chennai',
    'INOX: Phoenix MarketCity, Velachery': 'Phoenix MarketCity, Velachery Road, Velachery, Chennai',
    'Rohini Silver Screens, Koyambedu': 'Koyambedu, Near Metro Station, Chennai',
    'Sathyam Cinemas, Royapettah': 'No. 8, Thiru-vi-ka Road, Royapettah, Chennai',
    'PVR: Juhu': 'Dynamix Mall, Juhu Scheme, Vile Parle West, Mumbai',
    'INOX Megaplex, R-City Mall': 'R-City Mall, LBS Marg, Ghatkopar West, Mumbai',
    'Cinepolis: Andheri West': 'Fun Republic Mall, Link Road, Andheri West, Mumbai',
    'PVR ICON: Oberoi Mall, Goregaon': 'Oberoi Mall, Western Express Highway, Goregaon East, Mumbai',
    'Gaiety Galaxy, Bandra': 'S.V. Road, Bandra West, Mumbai',
    'PVR Luxe: Select Citywalk, Saket': 'Select Citywalk Mall, Saket District Centre, New Delhi',
    'PVR: Pacific Mall, Subhash Nagar': 'Pacific Mall, Subhash Nagar, New Delhi',
    'INOX: Nehru Place': 'Nehru Place Metro Station, New Delhi',
    'Cinepolis: DLF Mall of India, Noida': 'DLF Mall of India, Sector 18, Noida, Delhi NCR',
    'PVR: Orion Mall, Rajajinagar': 'Orion Mall, Dr. Rajkumar Road, Rajajinagar, Bengaluru',
    'INOX: Garuda Mall, Magrath Road': 'Garuda Mall, Magrath Road, Ashok Nagar, Bengaluru',
    'Cinepolis: Royal Meenakshi Mall': 'Royal Meenakshi Mall, Bannerghatta Road, Bengaluru',
    'PVR: Forum Mall, Koramangala': 'Forum Mall, Hosur Road, Koramangala, Bengaluru',
    'PVR: Next Galleria Mall, Punjagutta': 'Next Galleria Mall, Punjagutta, Hyderabad',
    'INOX: GVK One Mall, Banjara Hills': 'GVK One Mall, Road No. 1, Banjara Hills, Hyderabad',
    'Prasads Multiplex, Necklace Road': 'Necklace Road, NTR Gardens, Hyderabad',
    'PVR: Forum Mall, Kochi': 'Forum Mall, NH 66, Maradu, Kochi',
    'Shenoys: Kochi': 'Shenoys Junction, MG Road, Ernakulam, Kochi',
    'PVR: Oberon Mall, Kochi': 'Oberon Mall, NH Bypass, Edappally, Kochi',
  };

  if (customAddresses[theatreName]) {
    return customAddresses[theatreName];
  }

  const coreName = theatreName.includes(':') ? theatreName.split(':')[1].trim() : theatreName;
  return `${coreName}, Main Road, ${cityName}`;
};

// ── Date helper ─────────────────────────────────────
function getNext7Days() {
  const days = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      dayName: dayNames[d.getDay()],
      date: String(d.getDate()).padStart(2, '0'),
      month: monthNames[d.getMonth()],
      fullDate: d.toISOString().split('T')[0],
      isToday: i === 0,
    });
  }
  return days;
}

const ShowtimesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCity } = useCity();
  const movie = movies.find((m) => String(m.id) === String(id));
  const dates = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  const [favorites, setFavorites] = useState({});

  if (!movie) {
    return (
      <div className="showtimes-page">
        <div className="showtimes-not-found">Movie not found.</div>
      </div>
    );
  }

  // Get theatres for selected city, fallback to Chennai
  const cityName = selectedCity?.name || 'Chennai';
  const cityTheatres = theatresByCity[cityName] || theatresByCity['Chennai'];

  const toggleFavorite = (theatreId) => {
    setFavorites((prev) => ({ ...prev, [theatreId]: !prev[theatreId] }));
  };

  const handleShowtimeClick = (theatreName, time) => {
    const encodedCity = encodeURIComponent(cityName);
    const encodedTheatre = encodeURIComponent(theatreName);
    const encodedTime = encodeURIComponent(time);
    const encodedDate = encodeURIComponent(selectedDate);
    navigate(`/movie/${id}/seats?theatre=${encodedTheatre}&time=${encodedTime}&date=${encodedDate}&city=${encodedCity}`);
  };

  return (
    <div className="showtimes-page">
      {/* Top Bar */}
      <div className="showtimes-topbar glass">
        <button className="showtimes-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <div className="showtimes-topbar-info">
          <h1 className="showtimes-movie-title">{movie.title}</h1>
          <span className="showtimes-movie-meta">Movie runtime: {movie.runtime}</span>
        </div>
      </div>

      {/* Date Selector */}
      <div className="showtimes-date-selector">
        <div className="showtimes-date-scroll">
          {dates.map((d) => (
            <button
              key={d.fullDate}
              className={`showtimes-date-item ${selectedDate === d.fullDate ? 'selected' : ''}`}
              onClick={() => setSelectedDate(d.fullDate)}
            >
              <span className="date-day">{d.dayName}</span>
              <span className="date-num">{d.date}</span>
              <span className="date-month">{d.month}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Format Badge */}
      <div className="showtimes-format-badge-row">
        <span className="showtimes-format-badge">
          {movie.language || 'Tamil'} • {movie.format_type || '2D'}
        </span>
      </div>

      {/* City indicator */}
      <div className="showtimes-city-indicator">
        📍 Showing theatres in <strong>{cityName}</strong>
      </div>

      {/* Filter Chips */}
      <div className="showtimes-filters">
        <button className="filter-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12M9 18h6" /></svg>
          Sort by
        </button>
        <button className="filter-chip">Special Formats</button>
        <button className="filter-chip">Cancellable</button>
        <button className="filter-chip">₹0 – ₹500</button>
      </div>

      {/* Theatre List */}
      <div className="showtimes-theatre-list">
        {cityTheatres.map((theatre) => (
          <div className="showtimes-theatre-card glass" key={theatre.id}>
            <div className="theatre-card-header">
              <div className="theatre-name-row">
                <button className="theatre-fav-btn" onClick={() => toggleFavorite(theatre.id)}>
                  {favorites[theatre.id] ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e91e63" stroke="#e91e63" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                  )}
                </button>
                <h3 className="theatre-name">{theatre.name}</h3>
                <button className="theatre-info-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </button>
              </div>
              <div className="theatre-address-row">
                <span className="theatre-address-text">
                  📍 {getTheatreAddress(theatre.name, cityName)}
                </span>
              </div>
              <span className={`theatre-cancel-label ${theatre.cancellable ? 'cancellable' : 'non-cancellable'}`}>
                {theatre.cancellable ? 'Cancellation available' : 'Non-cancellable'}
              </span>
            </div>
            <div className="theatre-shows-row">
              {theatre.shows.map((show, idx) => (
                <button
                  key={idx}
                  className="showtime-btn"
                  onClick={() => handleShowtimeClick(theatre.name, show.time)}
                >
                  <span className="showtime-time">{show.time}</span>
                  <span className="showtime-format">{show.format}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowtimesPage;
