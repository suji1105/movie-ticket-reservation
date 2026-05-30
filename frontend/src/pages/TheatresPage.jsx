import { cities } from '../data/mockData';
import './TheatresPage.css';

const mockTheatres = [
  { id: 1, name: 'PVR ICON', city: 'Chennai', screens: 8, formats: ['IMAX', '4DX', 'Dolby Atmos'], address: 'VR Mall, Anna Nagar', rating: 4.5 },
  { id: 2, name: 'INOX Megaplex', city: 'Mumbai', screens: 12, formats: ['IMAX', 'ScreenX', 'Dolby Atmos'], address: 'R-City Mall, Ghatkopar', rating: 4.7 },
  { id: 3, name: 'Cinepolis', city: 'Bengaluru', screens: 6, formats: ['3D', 'Dolby Atmos'], address: 'Orion Mall, Rajajinagar', rating: 4.3 },
  { id: 4, name: 'AGS Cinemas', city: 'Chennai', screens: 5, formats: ['Dolby Atmos', 'EPIQ'], address: 'T. Nagar', rating: 4.6 },
  { id: 5, name: 'PVR Luxe', city: 'Delhi', screens: 10, formats: ['IMAX', 'Gold Class', 'Dolby Atmos'], address: 'Select Citywalk, Saket', rating: 4.8 },
  { id: 6, name: 'Miraj Cinemas', city: 'Hyderabad', screens: 7, formats: ['3D', '4K Laser'], address: 'Next Galleria Mall, Punjagutta', rating: 4.2 },
  { id: 7, name: 'SPI S2 Cinemas', city: 'Chennai', screens: 4, formats: ['EPIQ', 'Dolby 7.1'], address: 'OMR, Thoraipakkam', rating: 4.4 },
  { id: 8, name: 'INOX Leisure', city: 'Kolkata', screens: 6, formats: ['IMAX', 'Dolby Atmos'], address: 'South City Mall, Prince Anwar Shah Rd', rating: 4.5 },
];

export default function TheatresPage() {
  return (
    <div className="theatres-page">
      <div className="theatres-hero">
        <h1>🏛️ Our Theatres</h1>
        <p>Premium movie experiences in {cities.length}+ cities across India</p>
      </div>

      <div className="theatres-stats">
        <div className="stat-card glass">
          <span className="stat-num">{cities.length}+</span>
          <span className="stat-label">Cities</span>
        </div>
        <div className="stat-card glass">
          <span className="stat-num">{mockTheatres.length * 12}+</span>
          <span className="stat-label">Theatres</span>
        </div>
        <div className="stat-card glass">
          <span className="stat-num">500+</span>
          <span className="stat-label">Screens</span>
        </div>
        <div className="stat-card glass">
          <span className="stat-num">50M+</span>
          <span className="stat-label">Happy Viewers</span>
        </div>
      </div>

      <div className="theatres-content container">
        <h2 className="section-title">Featured Theatres</h2>
        <div className="theatres-grid">
          {mockTheatres.map((theatre, i) => (
            <div key={theatre.id} className="theatre-card glass animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="theatre-card-header">
                <h3>{theatre.name}</h3>
                <span className="theatre-rating">⭐ {theatre.rating}</span>
              </div>
              <p className="theatre-address">📍 {theatre.address}, {theatre.city}</p>
              <div className="theatre-meta">
                <span className="theatre-screens">🖥️ {theatre.screens} Screens</span>
              </div>
              <div className="theatre-formats">
                {theatre.formats.map((fmt, j) => (
                  <span key={j} className="format-tag">{fmt}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
