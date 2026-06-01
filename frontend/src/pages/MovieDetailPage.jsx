import { useParams, useNavigate } from 'react-router-dom';
import { movies } from '../data/mockData';
import './MovieDetailPage.css';
export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id, 10));

  if (!movie) {
    return <div className="loading">Movie not found.</div>;
  }

  const handleBookNow = () => {
    navigate(`/movie/${id}/showtimes`);
  };


  const castList = movie.cast ? movie.cast.split(',') : [];
  const genreList = movie.genres ? movie.genres.split(',') : [];

  return (
    <div className="movie-detail-page">

      {/* Hero Banner */}
      <div
        className="detail-banner"
        style={{
          backgroundImage: `url(${movie.banner || movie.poster})`,
        }}
      >
        <div className="detail-banner-overlay" />

        <div className="detail-banner-content container">
          <div className="detail-poster-wrap">
            <img
              src={movie.poster}
              alt={movie.title}
              className="detail-poster"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <div className="detail-info">
            <h1>{movie.title}</h1>

            <div className="detail-badges">
              <span className="badge-rating">
                {movie.rating}
              </span>

              {genreList.map((genre, index) => (
                <span
                  key={index}
                  className="badge-genre"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            <div className="detail-meta-row">
              <span>🗣 {movie.language}</span>
              <span>⏱ {movie.runtime}</span>
              <span>📅 {movie.release_date}</span>
              <span>🎬 {movie.format_type}</span>
            </div>

            <p className="detail-description">
              {movie.description || movie.decription || ''}
            </p>

            <div className="detail-actions">
              <button
                className="btn-book-now"
                onClick={handleBookNow}
              >
                🎫 Book Tickets
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {castList.length > 0 && (
        <section className="detail-section container">
          <h2>🎭 Cast</h2>

          <div className="cast-grid">
            {castList.map((actor, index) => (
              <div
                key={index}
                className="cast-card glass"
              >
                <div className="cast-avatar">
                  {actor.trim()[0]}
                </div>

                <span className="cast-name">
                  {actor.trim()}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Director Section */}
      {movie.director && (
        <section className="detail-section container">
          <h2>🎬 Director</h2>

          <div className="director-card glass">
            <div className="cast-avatar">
              {movie.director[0]}
            </div>

            <span className="cast-name">
              {movie.director}
            </span>
          </div>
        </section>
      )}



    </div>
  );
}