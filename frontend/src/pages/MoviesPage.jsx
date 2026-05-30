import { useState, useMemo } from 'react';
import { movies as mockMovies } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import FilterSidebar from '../components/FilterSidebar';
import './MoviesPage.css';

export default function MoviesPage() {
  const [filters, setFilters] = useState({ languages: [], genres: [], formats: [] });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(() => {
    return mockMovies.filter(m => {
      if (searchQuery && !m.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.languages.length && !filters.languages.includes(m.language)) return false;
      if (filters.genres.length && !filters.genres.some(g => m.genres.includes(g))) return false;
      if (filters.formats.length && !filters.formats.includes(m.format_type)) return false;
      return true;
    });
  }, [filters, searchQuery]);

  return (
    <div className="movies-page">
      <div className="movies-hero">
        <h1>🎬 All Movies</h1>
        <p>Explore our complete collection of movies now showing</p>
        <div className="movies-search-bar">
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="movies-content container">
        <div className="movies-layout">
          <aside className="movies-sidebar">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </aside>
          <div className="movies-grid-area">
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
                <p>Try adjusting your filters or search query</p>
              </div>
            )}
            <div className="movies-count">
              Showing {filteredMovies.length} of {mockMovies.length} movies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
