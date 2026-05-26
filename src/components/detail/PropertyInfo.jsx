
export default function PropertyInfo({ property }) {
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
    <div className="property-info">
      <h1 className="property-title">{property.title}</h1>
      <p className="property-society">{property.society || '–'}</p>
      <p className="property-location">{property.location}</p>
      <p className="property-price">{formatPrice(property.priceNum, property.price)}</p>

      <div className="info-grid">
        <div><strong>Type:</strong> {property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
        <div><strong>BHK:</strong> {property.bhk}</div>
        <div><strong>Bathrooms:</strong> {property.baths || 'N/A'}</div>
        <div><strong>Area:</strong> {property.area ? `${property.area} sqft` : 'N/A'}</div>
        <div><strong>Floor:</strong> {property.floor || 'N/A'}</div>
        <div><strong>Facing:</strong> {property.facing || 'N/A'}</div>
        <div><strong>Parking:</strong> {property.parking ? 'Yes' : 'No'}</div>
        <div><strong>Age:</strong> {property.age || 'N/A'}</div>
        <div><strong>Furnishing:</strong> {property.furnishing || 'Unfurnished'}</div>
      </div>

      {property.description && (
        <>
          <h3>Description</h3>
          <p className="description">{property.description}</p>
        </>
      )}

      {property.amenities?.length > 0 && (
        <>
          <h3>Society Amenities</h3>
          <ul className="amenities-list">
            {property.amenities.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </>
      )}

      {property.propertyFeatures?.length > 0 && (
        <>
          <h3>Property Features</h3>
          <ul className="features-list">
            {property.propertyFeatures.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </>
      )}

      {property.nearby && (
        <>
          <h3>Nearby Connectivity</h3>
          <ul className="nearby-list">
            {property.nearby.metro && <li>🚇 Metro: {property.nearby.metro}</li>}
            {property.nearby.school && <li>🏫 School: {property.nearby.school}</li>}
            {property.nearby.hospital && <li>🏥 Hospital: {property.nearby.hospital}</li>}
          </ul>
        </>
      )}
    </div>
  );
}