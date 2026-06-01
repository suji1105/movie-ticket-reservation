import { useState } from 'react';
import './ExperiencePage.css';

const reviews = [
  { name: 'Sanjay K.', city: 'Chennai', rating: 5, text: 'Best movie booking app ever! The seat selection is so smooth and I love the EPIQ screen experience.', date: 'May 2026' },
  { name: 'Ananya R.', city: 'Mumbai', rating: 5, text: 'CineVault Stream is a game changer. 4K quality at home with Dolby Atmos. Cancelled my other OTT subscriptions!', date: 'April 2026' },
  { name: 'Vikram S.', city: 'Bengaluru', rating: 4, text: 'Very user-friendly interface. The city-based recommendations are spot on. Would love to see more indie films.', date: 'May 2026' },
  { name: 'Meera P.', city: 'Delhi', rating: 5, text: 'The refund process was seamless when my show got cancelled. Customer support responded within minutes!', date: 'March 2026' },
  { name: 'Ravi T.', city: 'Hyderabad', rating: 4, text: 'Great collection of Telugu movies. The F&B pre-ordering feature saves so much time at the theatre.', date: 'May 2026' },
  { name: 'Divya M.', city: 'Kolkata', rating: 5, text: 'I book all my family movie outings through CineVault. The group booking discount is fantastic!', date: 'April 2026' },
];

export default function ExperiencePage() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', rating: 5, message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="experience-page">
      <div className="experience-hero">
        <h1>⭐ Customer Experience</h1>
        <p>See what our movie lovers say about CineVault</p>
      </div>

      <div className="experience-content container">
        {/* Ratings Summary */}
        <div className="ratings-summary glass animate-fadeInUp">
          <div className="rating-big">
            <span className="rating-number">4.8</span>
            <span className="rating-stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-count">Based on 2.5M+ reviews</span>
          </div>
          <div className="rating-bars">
            {[
              { stars: 5, pct: 78 },
              { stars: 4, pct: 15 },
              { stars: 3, pct: 5 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 1 },
            ].map(r => (
              <div key={r.stars} className="rating-bar-row">
                <span className="bar-label">{r.stars}★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="bar-pct">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <h2 className="section-title" style={{ marginTop: '2rem' }}>💬 What Our Users Say</h2>
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div key={i} className="review-card glass animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="review-header">
                <div className="review-avatar">{review.name[0]}</div>
                <div>
                  <h4>{review.name}</h4>
                  <span className="review-city">📍 {review.city}</span>
                </div>
                <span className="review-stars">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="review-text">"{review.text}"</p>
              <span className="review-date">{review.date}</span>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <section className="feedback-section glass animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <h2>📝 Share Your Experience</h2>
          {feedbackSubmitted ? (
            <div className="feedback-success">
              <span className="success-icon">✅</span>
              <h3>Thank you for your feedback!</h3>
              <p>Your review helps us improve CineVault for everyone.</p>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Great</option>
                  <option value={3}>⭐⭐⭐ Good</option>
                  <option value={2}>⭐⭐ Fair</option>
                  <option value={1}>⭐ Poor</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Review</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us about your experience..." value={formData.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary feedback-btn">Submit Review</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
