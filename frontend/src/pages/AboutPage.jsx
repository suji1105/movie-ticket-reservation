import './AboutPage.css';

export default function AboutPage() {
  const team = [
    { name: 'Arjun Mehta', role: 'CEO & Founder', emoji: '👨‍💼' },
    { name: 'Priya Sharma', role: 'CTO', emoji: '👩‍💻' },
    { name: 'Karthik Rajan', role: 'Head of Design', emoji: '🎨' },
    { name: 'Deepa Nair', role: 'VP of Operations', emoji: '📊' },
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About CineVault</h1>
        <p>Redefining the movie-going experience since 2020</p>
      </div>

      <div className="about-content container">
        <section className="about-section glass animate-fadeInUp">
          <h2>🎯 Our Mission</h2>
          <p>
            At CineVault, we believe every movie deserves to be experienced on the big screen.
            Our mission is to make booking movie tickets effortless, affordable, and delightful
            for millions of movie lovers across India. From blockbuster premieres to indie gems,
            we bring cinema closer to you.
          </p>
        </section>

        <section className="about-section glass animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h2>🚀 Our Story</h2>
          <p>
            Founded in 2020, CineVault started as a small project by a group of movie enthusiasts
            who were frustrated with the complexity of booking movie tickets online. What began as
            a simple booking tool has grown into India's most loved movie ticketing platform,
            serving 50M+ happy viewers across 25+ cities.
          </p>
        </section>

        <div className="about-stats">
          <div className="about-stat glass animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <span className="about-stat-num">25+</span>
            <span className="about-stat-label">Cities</span>
          </div>
          <div className="about-stat glass animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="about-stat-num">500+</span>
            <span className="about-stat-label">Screens</span>
          </div>
          <div className="about-stat glass animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
            <span className="about-stat-num">50M+</span>
            <span className="about-stat-label">Happy Viewers</span>
          </div>
          <div className="about-stat glass animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <span className="about-stat-num">4.8★</span>
            <span className="about-stat-label">App Rating</span>
          </div>
        </div>

        <section className="about-section glass animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h2>💡 Why CineVault?</h2>
          <div className="about-features">
            <div className="about-feature">
              <span className="feature-icon">⚡</span>
              <h4>Lightning Fast</h4>
              <p>Book tickets in under 30 seconds with our streamlined checkout.</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">💰</span>
              <h4>Best Prices</h4>
              <p>Exclusive deals, cashback offers, and the lowest convenience fees.</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">🎭</span>
              <h4>Every Movie</h4>
              <p>From Tamil to English, Hollywood to Kollywood — we cover it all.</p>
            </div>
            <div className="about-feature">
              <span className="feature-icon">🛡️</span>
              <h4>Secure Payments</h4>
              <p>Bank-grade encryption with UPI, cards, and wallets supported.</p>
            </div>
          </div>
        </section>

        <section className="about-section animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <h2>👥 Meet Our Team</h2>
          <div className="about-team">
            {team.map((member, i) => (
              <div key={i} className="team-card glass">
                <span className="team-emoji">{member.emoji}</span>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
