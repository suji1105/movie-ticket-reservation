import { useState, useMemo } from 'react';
import MovieSlider from '../components/MovieSlider';
import MovieCard from '../components/MovieCard';
import FilterSidebar from '../components/FilterSidebar';
import { movies as mockMovies, cities } from '../data/mockData';
import { useCity } from '../contexts/CityContext';
import './HomePage.css';

export default function HomePage() {
  const { selectedCity } = useCity();

  const [filters, setFilters] = useState({ languages: [], genres: [], formats: [] });

  const filteredMovies = useMemo(() => {
    return mockMovies.filter(m => {
      if (filters.languages.length && !filters.languages.includes(m.language)) return false;
      if (filters.genres.length && !filters.genres.some(g => m.genres.includes(g))) return false;
      if (filters.formats.length && !filters.formats.includes(m.format_type)) return false;
      return true;
    });
  }, [filters]);

  const topCities = cities.filter(c => c.is_top_city);

  const cityMovies = useMemo(() => {
    if (selectedCity) {
      return mockMovies.slice(0, 6);
    }
    return [];
  }, [selectedCity]);

  return (
    <div className="home-page">
      <MovieSlider movies={mockMovies} />

      {/* Trending Now - 5 Cards */}
      <section className="section trending-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title"> Trending Now</h2>
            <p className="section-sub">The hottest movies everyone is watching</p>
          </div>
          <div className="trending-grid">
            {mockMovies.filter(m => m.is_featured).slice(0, 5).map((movie, i) => (
              <div key={movie.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + City Movies */}
      <section className="section browse-section">
        <div className="container">
          <h2 className="section-title">🎬 Browse Movies</h2>
          <div className="browse-layout">
            <div className="browse-left">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
            <div className="browse-right">
              {selectedCity && (
                <div className="city-movies-header">
                  <h3>📍 Now Showing in <span className="city-highlight">{selectedCity.name}</span></h3>
                </div>
              )}

              {filteredMovies.length > 0 ? (
                <div className="movies-grid">
                  {filteredMovies.map((movie, i) => (
                    <div key={movie.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <span className="no-results-icon">🎭</span>
                  <h3>No movies found</h3>
                  <p>Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Top Cities */}
      <section className="section cities-section">
        <div className="container">
          <h2 className="section-title">🏙️ Movies by City</h2>
          <p className="section-sub">Explore top cities and what's playing near you</p>
          <div className="cities-grid">
            {topCities.map((city, i) => {
              const cityMovieList = mockMovies.slice(i % 3, (i % 3) + 4);
              return (
                <div key={city.id} className="city-card glass animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="city-card-header">
                    <span className="city-card-icon">📍</span>
                    <div>
                      <h4>{city.name}</h4>
                      <span className="city-state">{city.state}</span>
                    </div>
                  </div>
                  <div className="city-movie-posters">
                    {cityMovieList.map(m => (
                      <img key={m.id} src={m.poster} alt={m.title} title={m.title} />
                    ))}
                  </div>
                  <div className="city-movie-count">{cityMovieList.length}+ movies showing</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
