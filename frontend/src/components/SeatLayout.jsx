import { useState } from 'react';
import './SeatLayout.css';

const SEAT_CONFIG = {
  CLASSIC: { rows: ['A', 'B'], seats: 14, price: 220.34, label: 'CLASSIC ROWS' },
  CLASSIC_PLUS: { rows: ['C', 'D', 'E', 'F', 'G', 'H'], seats: 16, price: 237.28, label: 'CLASSIC PLUS ROWS' },
  PRIME: { rows: ['J', 'K', 'L', 'M', 'N', 'P'], seats: 19, price: 262.70, label: 'PRIME ROWS' },
  RECLINER: { rows: ['Q'], seats: 12, price: 440.68, label: 'RECLINER ROWS' },
};

export default function SeatLayout({ onSeatSelect, selectedSeats, bookedSeats = [] }) {
  const isBooked = (row, num) => bookedSeats.some(s => s.row === row && s.number === num);
  const isSelected = (row, num) => selectedSeats.some(s => s.row === row && s.number === num);

  const getCategory = (row) => {
    for (const [cat, config] of Object.entries(SEAT_CONFIG)) {
      if (config.rows.includes(row)) return cat;
    }
    return 'CLASSIC';
  };

  const toggleSeat = (row, num) => {
    if (isBooked(row, num)) return;
    const cat = getCategory(row);
    const seat = { row, number: num, category: cat, price: SEAT_CONFIG[cat].price };

    if (isSelected(row, num)) {
      onSeatSelect(selectedSeats.filter(s => !(s.row === row && s.number === num)));
    } else {
      onSeatSelect([...selectedSeats, seat]);
    }
  };

  return (
    <div className="seat-layout">
      <div className="screen-container">
        <div className="screen-curve" />
        <span className="screen-label">SCREEN</span>
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-box available" />
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected" />
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box occupied" />
          <span>Occupied</span>
        </div>
      </div>

      {Object.entries(SEAT_CONFIG).map(([category, config]) => (
        <div key={category} className="seat-section">
          <div className="section-label">{config.label} (₹{config.price} + GST)</div>
          {config.rows.map(row => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              <div className="seats">
                {Array.from({ length: config.seats }, (_, i) => {
                  const num = config.seats - i;
                  const booked = isBooked(row, num);
                  const selected = isSelected(row, num);
                  return (
                    <button
                      key={num}
                      className={`seat ${booked ? 'booked' : ''} ${selected ? 'selected' : ''} ${category === 'RECLINER' ? 'recliner' : ''}`}
                      onClick={() => toggleSeat(row, num)}
                      disabled={booked}
                      title={`${row}${num}`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              <span className="row-label">{row}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
