import { useParams, useNavigate } from 'react-router-dom';
import allProperties from '../data/properties';
import ImageGallery from '../components/detail/ImageGallery';
import PropertyInfo from '../components/detail/PropertyInfo';
import LeadPanel from '../components/detail/LeadPanel';
import SimilarProperties from '../components/detail/SimilarProperties';
import MapEmbed from '../components/detail/MapEmbed';


export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = allProperties.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="not-found">
        <h2>Property not found</h2>
        <button onClick={() => navigate('/properties')}>Back to Properties</button>
      </div>
    );
  }

  return (
    <div className="property-detail-page">
      <div className="detail-container">
        <div className="detail-main">
          <ImageGallery images={property.images || [property.image]} title={property.title} />
          <PropertyInfo property={property} />
          <MapEmbed address={property.location} />
          <SimilarProperties currentProperty={property} />
        </div>
        <div className="detail-sidebar">
          <LeadPanel propertyTitle={property.title} />
        </div>
      </div>
    </div>
  );
}