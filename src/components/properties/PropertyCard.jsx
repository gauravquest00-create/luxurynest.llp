import { Link } from 'react-router-dom';
import { slugify } from '../../utils/slugify';

export default function PropertyCard({ property }) {
  const formatPrice = () => {
    if (property.priceNum) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(property.priceNum);
    }
    return property.price || 'Price on request';
  };

  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} className="property-card-img" />
      {property.badge && <span className="property-card-badge">{property.badge}</span>}
      <div className="property-card-info">
        <h3 className="property-card-title">{property.title}</h3>
        <p className="property-card-location">{property.location}</p>
        <p className="property-card-price">{formatPrice()}</p>
        <div className="property-card-meta">
          <span>{property.bhk} BHK</span>
          {property.area && <span>• {property.area} sqft</span>}
          <span>• {property.type === 'rent' ? 'Rent' : 'Sale'}</span>
        </div>
        <Link to={`/properties/${slugify(property.title)}`} className="property-card-link">
          View Details →
        </Link>
      </div>
    </div>
  );
}