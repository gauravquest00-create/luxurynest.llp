import { useParams, useNavigate } from 'react-router-dom';
import allProperties from '../data/properties';
import ImageGallery from '../components/detail/ImageGallery';
import PropertyInfo from '../components/detail/PropertyInfo';
import LeadPanel from '../components/detail/LeadPanel';
import SimilarProperties from '../components/detail/SimilarProperties';
import MapEmbed from '../components/detail/MapEmbed';
import BackButton from '../components/common/BackButton';
import { slugify } from '../utils/slugify';

export default function PropertyDetail() {
  const { title: slugParam } = useParams();
  const navigate = useNavigate();

  // Remove the invalid guard – just check existence
  if (!slugParam) {
    return (
      <div className="not-found">
        <h2>Property link missing</h2>
        <button onClick={() => navigate('/properties')}>Back to Properties</button>
      </div>
    );
  }

  // Normalize to alphanumeric only for loose match
  const normalizeAlnum = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

  // 1) Exact slug match
  let property = allProperties.find(p => slugify(p.title) === slugParam);

  // 2) Loose alnum match (ignores all special chars, spaces, hyphens)
  if (!property) {
    const targetAlnum = normalizeAlnum(slugParam);
    property = allProperties.find(p => normalizeAlnum(p.title) === targetAlnum);
  }

  // 3) ID fallback
  if (!property && !isNaN(slugParam)) {
    property = allProperties.find(p => p.id === parseInt(slugParam));
  }

  if (!property) {
    // Optional debug log
    console.warn('Property not found for slug:', slugParam);
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
          <BackButton />
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