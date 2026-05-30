import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { movies } from '../data/mockData';
import './PaymentPage.css';

export default function PaymentPage() {

  const { id } = useParams();
  const location = useLocation();

  const movie = movies.find(
    (m) => m.id === parseInt(id)
  );

  // Selected Seats
  const selectedSeats =
    location.state?.seats || [];

  const subtotal =
    location.state?.totalAmount || 0;

  const ticketCount =
    selectedSeats.length;

  // Charges
  const convenienceFee = 40;

  const gst =
    Math.round(subtotal * 0.18);

  const totalAmount =
    subtotal + convenienceFee + gst;

  // Payment
  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

  const [selectedMethod, setSelectedMethod] =
    useState('');

  const handlePayment = () => {

    if (!selectedMethod) {
      alert('Please Select Payment Method');
      return;
    }

    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1000);

  };

  return (

    <div className="checkout-page">

      {/* LEFT SIDE */}
      <div className="checkout-left">

        <h1>Checkout</h1>

        <p className="subtitle">
          All fields are required
        </p>

        <div className="policy-text">
          No refunds. By continuing to payment,
          you agree to the Terms of Use,
          Refund Policy and Privacy Policy.
        </div>

        <h2 className="payment-title">
          Payment Methods
        </h2>

        {/* Card */}
        <div
          className={`payment-method ${
            selectedMethod === 'card'
              ? 'active-method'
              : ''
          }`}
          onClick={() =>
            setSelectedMethod('card')
          }
        >

          <div className="method-left">
            💳 Card
          </div>

          <div>›</div>

        </div>

        {/* UPI */}
        <div
          className={`payment-method ${
            selectedMethod === 'upi'
              ? 'active-method'
              : ''
          }`}
          onClick={() =>
            setSelectedMethod('upi')
          }
        >

          <div className="method-left">
            📱 UPI
          </div>

          <div>›</div>

        </div>

        {/* Net Banking */}
        <div
          className={`payment-method ${
            selectedMethod === 'netbanking'
              ? 'active-method'
              : ''
          }`}
          onClick={() =>
            setSelectedMethod('netbanking')
          }
        >

          <div className="method-left">
            🏦 Net Banking
          </div>

          <div>›</div>

        </div>

        {/* Pay Button */}
        {!paymentSuccess ? (

          <button
            className="pay-button"
            onClick={handlePayment}
          >
            Pay Now ₹{totalAmount}
          </button>

        ) : (

          <div className="success-box">

            ✅ Payment Successful!
            <br />
            Enjoy Your Movie

          </div>

        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">

        <div className="summary-card">

          <div className="movie-info">

            <img
              src={movie?.poster}
              alt={movie?.title}
              className="movie-image"
            />

            <div>

              <h3>{movie?.title}</h3>

              <p>
                {movie?.genres}
              </p>

              <p>
                {movie?.language}
              </p>

            </div>

          </div>

          <hr />

          <div className="summary-row">

            <span>Seats</span>

            <span>
              {selectedSeats.join(', ')}
            </span>

          </div>

          <div className="summary-row">

            <span>Ticket Count</span>

            <span>{ticketCount}</span>

          </div>

          <div className="summary-row">

            <span>Ticket Price</span>

            <span>₹{subtotal}</span>

          </div>

          <div className="summary-row">

            <span>Convenience Fee</span>

            <span>₹{convenienceFee}</span>

          </div>

          <div className="summary-row">

            <span>GST (18%)</span>

            <span>₹{gst}</span>

          </div>

          <hr />

          <div className="total-section">

            <span>Total Amount</span>

            <span>₹{totalAmount}</span>

          </div>

        </div>

      </div>

    </div>
  );
}