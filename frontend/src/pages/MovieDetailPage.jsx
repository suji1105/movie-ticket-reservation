import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { movies } from '../data/mockData';
import './MovieDetailPage.css';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const found = movies.find((m) => m.id === parseInt(id, 10));
    setMovie(found || null);
  }, [id]);

  if (!movie) return <div className="loading">Loading movie details...</div>;

  const handleBookNow = () => {
    // Navigate to seat selection page for this movie
    navigate(`/movie/${id}/seat`);
  };

  return (
    <section className="movie-detail glass">
      <div className="detail-header">
        <img src={movie.poster} alt={movie.title} className="detail-poster" />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p className="detail-genres">{movie.genres}</p>
          <p className="detail-description">{movie.description}</p>
        </div>
      </div>
      {/* Placeholder for showtimes, booking button, etc. */}
      <div className="detail-actions">
        <button className="btn-primary" onClick={handleBookNow}>Book Now</button>
      </div>
    </section>
  );
}
