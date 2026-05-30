import './FilterSidebar.css';
import { languages, genres, formats } from '../data/mockData';

export default function FilterSidebar({ filters, onFilterChange }) {
  const toggleFilter = (type, value) => {
    const current = filters[type] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [type]: updated });
  };

  const clearAll = () => {
    onFilterChange({ languages: [], genres: [], formats: [] });
  };

  const hasFilters = filters.languages?.length || filters.genres?.length || filters.formats?.length;

  return (
    <aside className="filter-sidebar glass">
      <div className="filter-header">
        <h3>🎛️ Filters</h3>
        {hasFilters > 0 && (
          <button className="clear-btn" onClick={clearAll}>Clear All</button>
        )}
      </div>

      <div className="filter-group">
        <h4>🗣 Language</h4>
        <div className="filter-options">
          {languages.map(lang => (
            <button
              key={lang}
              className={`filter-chip ${filters.languages?.includes(lang) ? 'active' : ''}`}
              onClick={() => toggleFilter('languages', lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>🎭 Genres</h4>
        <div className="filter-options">
          {genres.map(genre => (
            <button
              key={genre}
              className={`filter-chip ${filters.genres?.includes(genre) ? 'active' : ''}`}
              onClick={() => toggleFilter('genres', genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>📽️ Format</h4>
        <div className="filter-options">
          {formats.map(fmt => (
            <button
              key={fmt}
              className={`filter-chip ${filters.formats?.includes(fmt) ? 'active' : ''}`}
              onClick={() => toggleFilter('formats', fmt)}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
