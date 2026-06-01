import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import properties from '../../data/properties';
import { slugify } from '../../utils/slugify';

export default function FeaturedProperties() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Function to get random unique properties
    const getRandomProperties = (count = 3) => {
      // Shallow copy the array
      const shuffled = [...properties];
      
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Return first 'count' items
      return shuffled.slice(0, count);
    };

    setFeatured(getRandomProperties(3));
  }, []); // Re-runs on page refresh

  const formatPrice = (priceNum, priceStr) => {
    if (priceNum) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(priceNum);
    }
    return priceStr || 'Price on request';
  };

  // Loading state (optional)
  if (featured.length === 0) {
    return (
      <section className="featured-properties">
        <div className="featured-container">
          <h2 className="section-title">Featured Properties</h2>
          <p className="section-subtitle">Loading amazing properties...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-properties">
      <div className="featured-container">
        <h2 className="section-title">Featured Properties</h2>
        <p className="section-subtitle">Handpicked properties just for you</p>
        <div className="featured-grid">
          {featured.map((prop) => (
            <div key={prop.id} className="property-card">
              <img src={prop.image} alt={prop.title} className="property-img" />
              {prop.badge && <span className="property-badge">{prop.badge}</span>}
              <div className="property-info">
                <h3 className="property-title">{prop.title}</h3>
                <p className="property-location">{prop.location}</p>
                <p className="property-price">{formatPrice(prop.priceNum, prop.price)}</p>
                <div className="property-meta">
                  <span>{prop.bhk} BHK</span>
                  {prop.area && <span>• {prop.area} sqft</span>}
                  <span>• {prop.type === 'rent' ? 'For Rent' : 'For Sale'}</span>
                </div>
                <Link to={`/properties/${slugify(prop.title)}`} className="view-link">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/properties" className="view-all-btn">View All Properties</Link>
        </div>
      </div>
    </section>
  );
}
