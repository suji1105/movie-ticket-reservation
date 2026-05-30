import { movies as mockMovies } from '../data/mockData';
import './StreamPage.css';

const streamCategories = [
  { title: '🔥 Trending Now', movies: mockMovies.filter(m => m.is_featured) },
  { title: '🎭 Tamil Movies', movies: mockMovies.filter(m => m.language === 'Tamil') },
  { title: '🌍 English Movies', movies: mockMovies.filter(m => m.language === 'English') },
  { title: '🎬 Telugu & Hindi', movies: mockMovies.filter(m => ['Telugu', 'Hindi'].includes(m.language)) },
  { title: '🌟 All Languages', movies: mockMovies },
];

export default function StreamPage() {
  return (
    <div className="stream-page">
      <div className="stream-hero">
        <div className="stream-hero-content">
          <h1>CineVault Stream</h1>
          <p>Watch your favorite movies anytime, anywhere</p>
          <div className="stream-badges">
            <span className="stream-badge">4K Ultra HD</span>
            <span className="stream-badge">Dolby Atmos</span>
            <span className="stream-badge">Ad-Free</span>
          </div>
          <button className="btn-primary stream-cta">Start Free Trial — 30 Days Free</button>
        </div>
      </div>

      <div className="stream-content container">
        {streamCategories.map((cat, idx) => (
          <section key={idx} className="stream-row">
            <h2 className="stream-row-title">{cat.title}</h2>
            <div className="stream-row-scroll">
              {cat.movies.map((movie) => (
                <div key={movie.id} className="stream-card glass">
                  <img src={movie.poster} alt={movie.title} loading="lazy" />
                  <div className="stream-card-overlay">
                    <span className="stream-play">▶</span>
                  </div>
                  <div className="stream-card-info">
                    <h4>{movie.title}</h4>
                    <span>{movie.runtime} • {movie.language}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
