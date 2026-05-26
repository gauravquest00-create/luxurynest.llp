import PropertyCard from './PropertyCard';

export default function PropertyGrid({ properties }) {
  if (properties.length === 0) {
    return <div className="no-results">No properties match your criteria.</div>;
  }

  return (
    <div className="property-grid">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}