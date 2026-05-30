import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './SeatSelectionPage.css';

export default function SeatSelectionPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [seatSections, setSeatSections] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {

    const mockSeats = [

      {
        category: 'Silver',
        price: 150,
        seats: [
          'A1','A2','A3','A4','A5',
          'A6','A7','A8','A9','A10',
          'A11','A12','A13','A14','A15'
        ]
      },

      {
        category: 'Gold',
        price: 250,
        seats: [
          'B1','B2','B3','B4','B5',
          'B6','B7','B8','B9','B10',
          'B11','B12','B13','B14','B15'
        ]
      },

      {
        category: 'Platinum',
        price: 350,
        seats: [
          'C1','C2','C3','C4','C5',
          'C6','C7','C8','C9','C10',
          'C11','C12','C13','C14','C15'
        ]
      }

    ];

    setSeatSections(mockSeats);

  }, []);

  // Select Seat
  const toggleSeat = (seat) => {

    if (selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat
      ]);

    }
  };

  // Payment
  const proceedToPayment = () => {

    let total = 0;

    selectedSeats.forEach((seat) => {

      // Silver
      if (seat.startsWith('A')) {
        total += 150;
      }

      // Gold
      else if (seat.startsWith('B')) {
        total += 250;
      }

      // Platinum
      else if (seat.startsWith('C')) {
        total += 350;
      }

    });

    navigate(`/movie/${id}/payment`, {
      state: {
        seats: selectedSeats,
        totalAmount: total,
      },
    });
  };

  return (

    <section className="seat-selection">

      <h1>Select Seats</h1>

      {seatSections.map((section, index) => (

        <div
          className="seat-category"
          key={index}
        >

          <h2>
            {section.category} - ₹{section.price}
          </h2>

          <div className="seat-grid">

            {section.seats.map((seat, idx) => (

              <button
                key={idx}
                className={`seat-btn ${
                  selectedSeats.includes(seat)
                    ? 'selected'
                    : ''
                }`}
                onClick={() => toggleSeat(seat)}
              >
                {seat}
              </button>

            ))}

          </div>

        </div>

      ))}

      <div className="selected-info">

        <h3>Selected Seats</h3>

        <p>
          {selectedSeats.length > 0
            ? selectedSeats.join(', ')
            : 'No Seats Selected'}
        </p>

      </div>

      <div className="payment-container">

        <button
          className="payment-btn"
          disabled={selectedSeats.length === 0}
          onClick={proceedToPayment}
        >
          Proceed to Payment
        </button>

      </div>

    </section>
  );
}