import { useState } from 'react';
import './HelplinePage.css';

export default function HelplinePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="helpline-page container">
      <div className="helpline-header">
        <h1>📞 Customer Helpline</h1>
        <p>Need assistance with your booking or have a query? We are here to help!</p>
      </div>

      <div className="helpline-content">
        <div className="contact-info glass">
          <h3>Contact Information</h3>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <strong>Phone Support</strong>
              <p>1800-123-4567</p>
              <small>Available 24/7</small>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">✉️</span>
            <div>
              <strong>Email Support</strong>
              <p>support@cinevault.com</p>
              <small>Reply within 2 hours</small>
            </div>
          </div>
        </div>

        <div className="query-form-wrapper glass">
          <h3>Submit a Query</h3>
          {submitted ? (
            <div className="success-message">
              ✅ Thank you! Your query has been submitted successfully. Our team will contact you shortly.
            </div>
          ) : (
            <form className="query-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your email address" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} required>
                  <option value="">Select a topic</option>
                  <option value="Booking Issue">Booking Issue</option>
                  <option value="Refund">Refund / Cancellation</option>
                  <option value="Payment Failed">Payment Failed</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Describe your issue in detail..."></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit Query</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
