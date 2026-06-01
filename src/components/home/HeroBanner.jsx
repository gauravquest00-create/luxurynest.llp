// src/components/home/HeroBanner.jsx
import { useNavigate } from 'react-router-dom';
import siteConfig from '../../data/siteConfig';

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <div className="hero-container">
        <h1 className="hero-title">{siteConfig.tagline}</h1>
        <p className="hero-description">
          LuxuryNest is Gurugram's trusted real estate agency, helping families and investors find their perfect property with verified listings and expert guidance
        </p>
        
        <div className="hero-buttons">
          <button 
            className="hero-btn primary"
            onClick={() => navigate('/properties')}
          >
            {siteConfig.cta?.primary || "Explore Properties"}
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
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">{siteConfig.experience}</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-value">{siteConfig.familiesServed}</span>
            <span className="stat-label">Happy Families</span>
          </div>
          <div className="stat">
            <span className="stat-value">{siteConfig.propertiesListed}</span>
            <span className="stat-label">Properties Listed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
