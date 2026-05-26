import { Link } from 'react-router-dom';
import properties from '../../data/properties';

export default function FeaturedProperties() {
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
          {featured.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.image} alt={property.title} className="property-img" />
              {property.badge && <span className="property-badge">{property.badge}</span>}
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-price">{formatPrice(property.priceNum, property.price)}</p>
                <div className="property-meta">
                  <span>{property.bhk} BHK</span>
                  {property.area && <span>• {property.area} sqft</span>}
                  <span>• {property.type === 'rent' ? 'For Rent' : 'For Sale'}</span>
                </div>
                <Link to={`/properties/${property.id}`} className="view-link">View Details →</Link>
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