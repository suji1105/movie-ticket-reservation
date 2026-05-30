import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieSlider.css';

export default function MovieSlider({ movies }) {
  const [current, setCurrent] = useState(0);
  const featured = movies.filter(m => m.is_featured).slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!featured.length) return null;
  const movie = featured[current];

  return (
    <section className="hero-slider">
      <div className="slider-bg" style={{ backgroundImage: `url(${movie.banner || movie.poster})` }} />
      <div className="slider-overlay" />

      <div className="slider-content container">
        <div className="slider-info animate-fadeInUp" key={current}>
          <span className="slider-badge">{movie.format_type}</span>
          <h1 className="slider-title">{movie.title}</h1>
          <div className="slider-meta">
            <span className="meta-item">⏱ {movie.runtime}</span>
            <span className="meta-dot">•</span>
            <span className="meta-item">🎭 {movie.genres?.replace(/,/g, ' • ')}</span>
            <span className="meta-dot">•</span>
            <span className="meta-item">🗣 {movie.language}</span>
            <span className="meta-dot">•</span>
            <span className="meta-item">⭐ {movie.rating}</span>
          </div>
          <p className="slider-desc">{movie.description}</p>
          <div className="slider-actions">
            <Link to={`/movie/${movie.id}`} className="btn-gold">🎫 Book Now</Link>
            <Link to={`/movie/${movie.id}`} className="btn-outline">View Details</Link>
          </div>
        </div>

        <div className="slider-poster animate-slideInRight" key={`poster-${current}`}>
          <img src={movie.poster} alt={movie.title} />
          <div className="poster-glow" />
        </div>
      </div>

      <div className="slider-dots">
        {featured.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <button className="slider-arrow slider-prev" onClick={() => setCurrent((current - 1 + featured.length) % featured.length)}>‹</button>
      <button className="slider-arrow slider-next" onClick={() => setCurrent((current + 1) % featured.length)}>›</button>
    </section>
  );
}
