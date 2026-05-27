import { Link } from 'react-router-dom';
import properties from '../../data/properties';
import { slugify } from '../../utils/slugify';
// import './FeaturedProperties.css';

export default function FeaturedProperties() {
  // Take first 3 properties as featured
  const featured = properties.slice(0, 3);

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

  return (
    <section className="featured-properties">
      <div className="featured-container">
        <h2 className="section-title">Featured Properties</h2>
        <p className="section-subtitle">Handpicked properties just for you</p>
        <div className="featured-grid">
          {featured.map((prop) => (   // ✅ changed from 'property' to 'prop' to avoid confusion
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