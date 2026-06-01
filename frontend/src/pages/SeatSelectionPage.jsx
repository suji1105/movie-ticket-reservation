import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { movies } from '../data/mockData';
import './SeatSelectionPage.css';

const SECTIONS = [
  {
    name: 'RECLINER',
    price: 500,
    rows: ['M', 'L'],
    seatsPerRow: 12,
  },
  {
    name: 'ELITE',
    price: 260,
    rows: ['K', 'J', 'H', 'G', 'F'],
    seatsPerRow: 14,
  },
  {
    name: 'CLASSIC',
    price: 170,
    rows: ['E', 'D', 'C', 'B', 'A'],
    seatsPerRow: 14,
  },
];

function isSold(row, seatNum) {
  const code = row.charCodeAt(0);
  const hash = ((code * 31 + seatNum * 17 + 7) * 2654435761) >>> 0;
  return hash % 100 < 30;
}

function generateSeats() {
  const sections = SECTIONS.map((section) => {
    const rows = section.rows.map((rowLetter) => {
      const seats = [];
      for (let i = 1; i <= section.seatsPerRow; i++) {
        seats.push({
          id: `${rowLetter}${i}`,
          row: rowLetter,
          number: i,
          label: String(i).padStart(2, '0'),
          sold: isSold(rowLetter, i),
        });
      }
      return { rowLetter, seats };
    });
    return { ...section, rows };
  });
  return sections;
}

const SeatSelectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

const city = searchParams.get('city') || 'Unknown City';
const theatre = searchParams.get('theatre') || 'Unknown Theatre';
const time = searchParams.get('time') || '10:00 AM';
const date = searchParams.get('date') || 'Today';

  const movie = movies.find((m) => String(m.id) === id);
  const movieTitle = movie ? movie.title : 'Movie';

  const [sections] = useState(() => generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId, section) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seatId);
      if (exists) {
        return prev.filter((s) => s.id !== seatId);
      }
      return [...prev, { id: seatId, price: section.price }];
    });
  };

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handlePay = () => {
    if (selectedSeats.length === 0) return;
    // Build seat details for payment page
    const seatDetails = selectedSeats.map((s) => {
      // Find which section this seat belongs to
      const sectionName = sections.find((sec) =>
        sec.rows.some((row) => row.seats.some((seat) => seat.id === s.id))
      )?.name || 'CLASSIC';
      return { label: s.id, section: sectionName, price: s.price };
    });
    navigate(`/movie/${id}/payment`, {
      state: {
        selectedSeats: seatDetails,
        city,
        theatre,
        time,
        date,
        movieId: id,
        totalAmount,
      },
    });
  };

  return (
    <div className="seat-page">
      <div className="seat-content">
        {/* TOP BAR */}
        <div className="seat-topbar">
          <button className="seat-back-btn" onClick={() => navigate(-1)}>
            ←
          </button>
          <div className="seat-topbar-info">
            <h2 className="seat-topbar-title">{movieTitle}</h2>
            <p className="seat-topbar-theatre">
              {city} • {theatre}
            </p>
          </div>
        </div>

        {/* DATE + TICKET COUNT */}
        <div className="seat-meta-row">
          <span className="seat-meta-date">{date}</span>
          <span className="seat-meta-tickets">
            {selectedSeats.length || 1} Ticket{selectedSeats.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* TIME SLOT BADGE */}
        <div className="seat-time-row">
          <span className="seat-time-badge">{time}</span>
        </div>

        {/* SEAT MAP */}
        <div className="seat-map-container">
          {sections.map((section) => (
            <div key={section.name} className="seat-section">
              <div className="seat-section-header">
                <span className="seat-section-name">{section.name}</span>
                <span className="seat-section-price">₹{section.price}</span>
              </div>

              {section.rows.map((row) => (
                <div key={row.rowLetter} className="seat-row">
                  <span className="seat-row-label">{row.rowLetter}</span>
                  <div className="seat-row-seats">
                    {row.seats.map((seat) => {
                      const isSelected = selectedSeats.some((s) => s.id === seat.id);
                      let seatClass = 'seat-btn';
                      if (seat.sold) seatClass += ' seat-sold';
                      else if (isSelected) seatClass += ' seat-selected';
                      else seatClass += ' seat-available';

                      const isAisle = seat.number === 7;

                      return (
                        <button
                          key={seat.id}
                          className={`${seatClass}${isAisle ? ' seat-aisle' : ''}`}
                          disabled={seat.sold}
                          onClick={() => !seat.sold && toggleSeat(seat.id, section)}
                          title={`${seat.id} - ₹${section.price}`}
                        >
                          {seat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* SCREEN */}
          <div className="seat-screen-wrapper">
            <div className="seat-screen">
              <span>All eyes this way please</span>
            </div>
          </div>

          {/* LEGEND */}
          <div className="seat-legend">
            <div className="seat-legend-item">
              <span className="legend-box legend-available"></span>
              <span>Available</span>
            </div>
            <div className="seat-legend-item">
              <span className="legend-box legend-selected"></span>
              <span>Selected</span>
            </div>
            <div className="seat-legend-item">
              <span className="legend-box legend-sold"></span>
              <span>Sold</span>
            </div>
          </div>
        </div>

        {/* BOTTOM PAY BAR */}
        <div className="seat-pay-bar">
          <div className="seat-pay-info">
            <span className="seat-pay-count">
              {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Selected
            </span>
            <span className="seat-pay-seats">
              {selectedSeats.map((s) => s.id).join(', ')}
            </span>
          </div>
          <button
            className={`seat-pay-btn ${selectedSeats.length === 0 ? 'disabled' : ''}`}
            onClick={handlePay}
            disabled={selectedSeats.length === 0}
          >
            Pay ₹{totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionPage;