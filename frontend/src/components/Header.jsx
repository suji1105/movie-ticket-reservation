import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cities } from '../data/mockData';
import { useCity } from '../contexts/CityContext';
import './Header.css';

export default function Header() {
  const { selectedCity, setSelectedCity } = useCity();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityDropdown, setCityDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const cityRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleClick = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setCityDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const topCities = cities.filter(c => c.is_top_city);
  const otherCities = cities.filter(c => !c.is_top_city);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">🎬</div>
          <span className="logo-text">Cine<span className="logo-accent">Vault</span></span>
        </Link>

        <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`}>
          <Link to="/movies" className="nav-link" onClick={() => setMobileMenu(false)}>
            <span className="nav-icon"></span> Movies
          </Link>
          <Link to="/theatres" className="nav-link" onClick={() => setMobileMenu(false)}>
            <span className="nav-icon"></span> Theatre
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenu(false)}>
            <span className="nav-icon"></span> About Us
          </Link>
          <Link to="/faq" className="nav-link" onClick={() => setMobileMenu(false)}>
            <span className="nav-icon"></span> FAQ
          </Link>
          <Link to="/helpline" className="nav-link" onClick={() => setMobileMenu(false)}>
            <span className="nav-icon"></span> Helpline
          </Link>
          <Link to="/experience" className="nav-link" onClick={() => setMobileMenu(false)}>
            <span className="nav-icon"></span> Customer Experience
          </Link>
        </nav>

        <div className="header-actions">
          <div className={`search-box ${searchOpen ? 'search-open' : ''}`}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
            </button>
          </div>

          <div className="city-selector" ref={cityRef}>
            <button className="city-btn" onClick={() => setCityDropdown(!cityDropdown)}>
              <span className="city-pin"></span>
              <span className="city-name">{selectedCity?.name || 'Select City'}</span>
              <span className={`city-arrow ${cityDropdown ? 'open' : ''}`}>▾</span>
            </button>

            {cityDropdown && (
              <div className="city-dropdown glass">
                <div className="city-section">
                  <h4>Top Cities</h4>
                  <div className="city-grid">
                    {topCities.map(city => (
                      <button
                        key={city.id}
                        className={`city-option ${selectedCity?.id === city.id ? 'active' : ''}`}
                        onClick={() => { setSelectedCity(city); setCityDropdown(false); }}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="city-divider" />
                <div className="city-section">
                  <h4>Other Cities</h4>
                  <div className="city-grid">
                    {otherCities.map(city => (
                      <button
                        key={city.id}
                        className={`city-option ${selectedCity?.id === city.id ? 'active' : ''}`}
                        onClick={() => { setSelectedCity(city); setCityDropdown(false); }}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
