import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { movies } from '../data/mockData';
import './PaymentPage.css';

export default function PaymentPage() {
  const { id } = useParams();
  const location = useLocation();

  const movie =
    movies.find((m) => String(m.id) === String(id)) || movies[0];

  const today = new Date();
  const fallbackDate = today.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const selectedSeats = location.state?.selectedSeats || [
    {
      label: 'A1',
      section: 'CLASSIC',
      price: 170,
    },
  ];

  const city = location.state?.city || 'Chennai';
  const theatre =
    location.state?.theatre || 'PVR: VR Mall, Anna Nagar';
  const time = location.state?.time || '10:00 AM';
  const date = location.state?.date || fallbackDate;
  const totalAmount = location.state?.totalAmount || 170;

  const ticketCount = selectedSeats.length;

  // Snacks & Beverages Data
  const foodItems = [
    { id: 'popcorn', name: 'Butter Popcorn (Large)', price: 180, icon: '🍿' },
    { id: 'pepsi', name: 'Pepsi Soda (Large)', price: 120, icon: '🥤' },
    { id: 'icecream', name: 'Chocolate Ice Cream', price: 90, icon: '🍨' },
    { id: 'nachos', name: 'Cheese Nachos', price: 150, icon: '🧀' },
    { id: 'burger', name: 'Classic Veg Burger', price: 140, icon: '🍔' }
  ];

  // States
  const [foodQuantities, setFoodQuantities] = useState({
    popcorn: 0,
    pepsi: 0,
    icecream: 0,
    nachos: 0,
    burger: 0
  });

  const [promoInput, setPromoInput] = useState('');
  const [activeCode, setActiveCode] = useState(null); // 'WELCOME100', 'CINE50', 'BOGO', 'FREEFOOD'
  const [promoError, setPromoError] = useState('');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  // Snacks handlers
  const handleAddFood = (itemId) => {
    setFoodQuantities(prev => ({
      ...prev,
      [itemId]: prev[itemId] + 1
    }));
  };

  const handleRemoveFood = (itemId) => {
    setFoodQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1)
    }));
  };

  // Promo code handlers
  const applyPromoCode = (code) => {
    setPromoError('');
    setPromoSuccessMsg('');
    const cleanCode = code.toUpperCase().trim();
    
    if (cleanCode === 'WELCOME100') {
      setActiveCode('WELCOME100');
      setPromoSuccessMsg('WELCOME100 applied successfully! Saved ₹100.');
    } else if (cleanCode === 'CINE50') {
      setActiveCode('CINE50');
      setPromoSuccessMsg('CINE50 applied successfully! Saved ₹50.');
    } else if (cleanCode === 'BOGO') {
      if (ticketCount > 1) {
        setActiveCode('BOGO');
        const lowestTicketPrice = Math.min(...selectedSeats.map(s => s.price));
        setPromoSuccessMsg(`BOGO applied! 1 Ticket free (Saved ₹${lowestTicketPrice}).`);
      } else {
        setPromoError('BOGO requires at least 2 tickets!');
        setActiveCode(null);
      }
    } else if (cleanCode === 'FREEFOOD') {
      const currentFoodTotal = Object.entries(foodQuantities).reduce((sum, [id, qty]) => {
        const item = foodItems.find(f => f.id === id);
        return sum + qty * item.price;
      }, 0);
      
      if (currentFoodTotal > 0) {
        setActiveCode('FREEFOOD');
        const discountVal = Math.min(currentFoodTotal, 150);
        setPromoSuccessMsg(`FREEFOOD applied! Saved ₹${discountVal} on snacks.`);
      } else {
        setPromoError('Add snacks first to apply FREEFOOD!');
        setActiveCode(null);
      }
    } else {
      setPromoError('Invalid promo code! Try WELCOME100, CINE50, BOGO, or FREEFOOD.');
      setActiveCode(null);
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
    }
  };

  const handleRemovePromo = () => {
    setActiveCode(null);
    setPromoInput('');
    setPromoError('');
    setPromoSuccessMsg('');
  };

  // Calculations
  const ticketPrice = totalAmount;

  // Calculate food total
  const foodTotal = Object.entries(foodQuantities).reduce((sum, [id, qty]) => {
    const item = foodItems.find(f => f.id === id);
    return sum + qty * item.price;
  }, 0);

  // Calculate discount
  let discount = 0;
  if (activeCode === 'WELCOME100') {
    discount = 100;
  } else if (activeCode === 'CINE50') {
    discount = 50;
  } else if (activeCode === 'BOGO') {
    if (ticketCount > 1) {
      const lowestTicketPrice = Math.min(...selectedSeats.map(s => s.price));
      discount = lowestTicketPrice;
    }
  } else if (activeCode === 'FREEFOOD') {
    discount = Math.min(foodTotal, 150);
  }

  const netPrice = ticketPrice;
  const totalBeforeTax = Math.max(0, netPrice + foodTotal - discount);
  const gst = +(totalBeforeTax * 0.18).toFixed(2);
  const grandTotal = +(totalBeforeTax + gst).toFixed(2);

  const seatSections = selectedSeats.reduce((acc, seat) => {
    const section = seat.section || 'CLASSIC';

    if (!acc[section]) {
      acc[section] = [];
    }

    acc[section].push(seat.label);

    return acc;
  }, {});

  const parseRuntime = (runtime) => {
    if (!runtime) return 0;

    const hMatch = runtime.match(/(\d+)h/i);
    const mMatch = runtime.match(/(\d+)m/i);

    return (
      (hMatch ? parseInt(hMatch[1]) * 60 : 0) +
      (mMatch ? parseInt(mMatch[1]) : 0)
    );
  };

  const calculateEndTime = (startTime, runtime) => {
    const runtimeMinutes = parseRuntime(runtime);

    const match = startTime.match(
      /(\d+):(\d+)\s*(AM|PM)/i
    );

    if (!match) return '';

    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }

    if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const totalMinutes =
      hours * 60 + minutes + runtimeMinutes;

    let endHour = Math.floor(totalMinutes / 60) % 24;
    const endMinute = totalMinutes % 60;

    const endPeriod = endHour >= 12 ? 'PM' : 'AM';

    if (endHour > 12) {
      endHour -= 12;
    }

    if (endHour === 0) {
      endHour = 12;
    }

    return `${endHour}:${String(endMinute).padStart(
      2,
      '0'
    )} ${endPeriod}`;
  };

  const endTime = calculateEndTime(
    time,
    movie.runtime
  );

  const [showModal, setShowModal] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (showModal) {
      const colors = ['#f5c518', '#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
      const pieces = Array.from({ length: 120 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.8;
        const duration = 1.5 + Math.random() * 2.5;
        const size = 6 + Math.random() * 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() > 0.5 ? '50%' : '2px';
        return {
          id: i,
          style: {
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: shape,
            transform: `rotate(${Math.random() * 360}deg)`,
          }
        };
      });
      setConfettiPieces(pieces);
    } else {
      setConfettiPieces([]);
    }
  }, [showModal]);

  const ticketNumber = `BMS${Date.now()
    .toString()
    .slice(-8)}`;

  const handleProceed = () => {
    setShowModal(true);
  };

  return (
    <div className="payment-page">

      {/* HEADER */}
      <div className="payment-header">
        <h1 className="payment-header__title">
          Booking Summary
        </h1>
      </div>

      {/* MOVIE INFO */}
      <div className="payment-card">
        <div className="payment-movie">

          <img
            src={movie.poster}
            alt={movie.title}
            className="payment-movie__poster"
          />

          <div className="payment-movie__details">
            <h2 className="payment-movie__title">
              {movie.title}
            </h2>

            <p className="payment-movie__meta">
              {movie.rating} • {movie.language}
            </p>

            <p className="payment-movie__datetime">
              {date}
            </p>

            <p className="payment-movie__datetime">
              {time}
              {endTime && ` - ${endTime}`}
            </p>

            <p className="payment-movie__theatre">
              📍 {city}
            </p>

            <p className="payment-movie__theatre">
              🎭 {theatre}
            </p>
          </div>
        </div>
      </div>

      {/* SEATS */}
      <div className="payment-card">
        <p className="payment-section-label">
          SEAT DETAILS
        </p>

        {Object.entries(seatSections).map(
          ([section, seats]) => (
            <div
              key={section}
              className="payment-seat-group"
            >
              <h4>{section}</h4>

              <div className="payment-seat-chips">
                {seats.map((seat) => (
                  <span
                    key={seat}
                    className="payment-seat-chip"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* SNACKS & BEVERAGES */}
      <div className="payment-card">
        <p className="payment-section-label">
          🍕 Add Snacks & Beverages
        </p>
        <div className="payment-food-list">
          {foodItems.map((item) => (
            <div key={item.id} className="payment-food-item">
              <span className="payment-food-icon">{item.icon}</span>
              <div className="payment-food-details">
                <span className="payment-food-name">{item.name}</span>
                <span className="payment-food-price">₹{item.price}</span>
              </div>
              <div className="payment-food-counter">
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => handleRemoveFood(item.id)}
                  disabled={foodQuantities[item.id] === 0}
                >
                  -
                </button>
                <span className="counter-value">{foodQuantities[item.id]}</span>
                <button
                  type="button"
                  className="counter-btn"
                  onClick={() => handleAddFood(item.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXCLUSIVE OFFERS */}
      <div className="payment-card">
        <p className="payment-section-label">
          🎟️ Exclusive Offers & Promos
        </p>
        
        {/* Horizontal promo scroll */}
        <div className="promo-chips-scroll">
          <button
            type="button"
            className={`promo-chip ${activeCode === 'WELCOME100' ? 'active' : ''}`}
            onClick={() => applyPromoCode('WELCOME100')}
          >
            <strong>WELCOME100</strong>
            <span>Save ₹100</span>
          </button>
          <button
            type="button"
            className={`promo-chip ${activeCode === 'CINE50' ? 'active' : ''}`}
            onClick={() => applyPromoCode('CINE50')}
          >
            <strong>CINE50</strong>
            <span>Save ₹50</span>
          </button>
          <button
            type="button"
            className={`promo-chip ${activeCode === 'BOGO' ? 'active' : ''}`}
            onClick={() => applyPromoCode('BOGO')}
          >
            <strong>BOGO</strong>
            <span>Buy 1 Get 1</span>
          </button>
          <button
            type="button"
            className={`promo-chip ${activeCode === 'FREEFOOD' ? 'active' : ''}`}
            onClick={() => applyPromoCode('FREEFOOD')}
          >
            <strong>FREEFOOD</strong>
            <span>₹150 off Food</span>
          </button>
        </div>

        {/* Custom promo input form */}
        <form onSubmit={handleApplyPromo} className="promo-form">
          <input
            type="text"
            placeholder="Enter coupon code..."
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            disabled={!!activeCode}
          />
          {activeCode ? (
            <button type="button" className="promo-remove-btn" onClick={handleRemovePromo}>
              Remove
            </button>
          ) : (
            <button type="submit" className="promo-apply-btn">
              Apply
            </button>
          )}
        </form>

        {promoError && <p className="promo-error-msg">⚠️ {promoError}</p>}
        {promoSuccessMsg && <p className="promo-success-msg">✅ {promoSuccessMsg}</p>}
      </div>

      {/* TICKET SUMMARY */}
      <div className="payment-card">
        <p className="payment-section-label">
          TICKET SUMMARY
        </p>

        <div className="payment-price-row">
          <span>Tickets Price ({ticketCount} seat(s))</span>
          <span>₹{ticketPrice.toFixed(2)}</span>
        </div>

        {foodTotal > 0 && (
          <div className="payment-price-row">
            <span>Snacks & Beverages</span>
            <span>₹{foodTotal.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="payment-price-row payment-discount-row">
            <span>Discount ({activeCode})</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="payment-price-row">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        <div className="payment-divider" />

        <div className="payment-price-row payment-price-row--grand">
          <strong>Grand Total</strong>
          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>
      </div>

      {/* PAY BUTTON */}
      <button
        className="payment-proceed-btn"
        onClick={handleProceed}
      >
        Pay ₹{grandTotal.toFixed(2)}
      </button>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div
          className="payment-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="payment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confetti Blast Container */}
            <div className="payment-confetti">
              {confettiPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="payment-confetti__piece"
                  style={piece.style}
                />
              ))}
            </div>

            {/* Checkmark SVG */}
            <div className="payment-modal__check">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="rgba(34, 197, 94, 0.15)"
                  stroke="#22c55e"
                  strokeWidth="4"
                />
                <path
                  className="payment-modal__check-path"
                  d="M20 32 L28 40 L44 22"
                  stroke="#22c55e"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="payment-modal__title">
              🎉 Booking Confirmed!
            </h2>

            <p className="payment-modal__ticket-label">
              Ticket Number
            </p>
            <h3 className="payment-modal__ticket-number">
              {ticketNumber}
            </h3>

            <div className="payment-modal__info">
              <p>
                🎬 <strong>{movie.title}</strong>
              </p>
              <p>📍 {city}</p>
              <p>🎭 {theatre}</p>
              <p>📅 {date}</p>
              <p>🕒 {time}</p>
              <p>
                🎟 <strong>Seats:</strong>{' '}
                {selectedSeats
                  .map((seat) => seat.label)
                  .join(', ')}
              </p>
              {foodTotal > 0 && (
                <p>
                  🍿 <strong>Snacks:</strong>{' '}
                  {Object.entries(foodQuantities)
                    .filter(([_, qty]) => qty > 0)
                    .map(([id, qty]) => {
                      const item = foodItems.find(f => f.id === id);
                      return `${item.icon} ${item.name} (x${qty})`;
                    })
                    .join(', ')}
                </p>
              )}
              {discount > 0 && (
                <p className="payment-discount-msg">
                  🏷️ <strong>Promo Offer applied:</strong> {activeCode} (Saved ₹{discount.toFixed(2)})
                </p>
              )}
              <p className="payment-modal__amount">
                💰 <strong>Amount Paid:</strong> ₹
                {grandTotal.toFixed(2)}
              </p>
            </div>

            <button
              className="payment-modal__close"
              onClick={() => setShowModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}