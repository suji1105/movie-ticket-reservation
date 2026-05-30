import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card glass">
      <div className="card-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="card-overlay">
          <button className="card-book-btn">🎫 Book Now</button>
        </div>
        <div className="card-format">{movie.format_type}</div>
        <div className="card-rating">{movie.rating}</div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{movie.title}</h3>
        <div className="card-meta">
          <span className="card-runtime">⏱ {movie.runtime}</span>
          <span className="card-lang">🗣 {movie.language}</span>
        </div>
        <div className="card-genres">
          {movie.genres?.split(',').map((g, i) => (
            <span key={i} className="genre-tag">{g.trim()}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
