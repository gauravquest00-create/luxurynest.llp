// src/components/home/HeroBanner.jsx
import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <div className="hero-container">

        {/* 🔥 HEADLINE */}
        <h1 className="hero-title">
          Find Your Perfect Property in Gurugram — Without the Hassle
        </h1>

        {/* 🧠 SUBTEXT */}
        <p className="hero-description">
          Discover verified homes with expert guidance so you don’t waste time on fake listings or wrong deals.
        </p>

        {/* 👉 MICRO HOOK */}
        <p className="hero-hook">
          👉 Start exploring properties that actually match your needs
        </p>

        {/* 🎯 CTA BUTTONS */}
        <div className="hero-buttons">
          <button 
            className="hero-btn primary"
            onClick={() => navigate('/properties')}
          >
            🔥 Explore Properties
          </button>

          <button 
            className="hero-btn secondary"
            onClick={() => navigate('/new-launches')}
          >
            🚀 New Launches
          </button>

          <button 
            className="hero-btn secondary"
            onClick={() => navigate('/construction')}
          >
            🏗️ Construction
          </button>
        </div>

        {/* ✅ TRUST LINE */}
        <div className="hero-trust">
          <span>✔ Verified Listings</span>
          <span>✔ Expert Guidance</span>
          <span>✔ No Time Waste</span>
        </div>

        {/* 📊 STATS */}
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">5+</span>
            <span className="stat-label">Years in Gurugram</span>
          </div>
          <div className="stat">
            <span className="stat-value">500+</span>
            <span className="stat-label">Families Settled</span>
          </div>
          <div className="stat">
            <span className="stat-value">100+</span>
            <span className="stat-label">Verified Properties</span>
          </div>
        </div>

      </div>
    </section>
  );
}
