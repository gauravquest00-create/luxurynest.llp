import { Link } from 'react-router-dom';
import allProperties from '../../data/properties';
import { slugify } from '../../utils/slugify';export default function SimilarProperties({ currentProperty }) {
  const similar = allProperties
    .filter(p => p.id !== currentProperty.id && (p.location === currentProperty.location || p.bhk === currentProperty.bhk))
    .slice(0, 3);
  if (similar.length === 0) return null;

  return (
    <div className="similar-properties">
      <h3>Similar Properties</h3>
      <div className="similar-grid">
        {similar.map(p => (
          <Link to={`/properties/${slugify(p.title)}`} key={p.id} className="similar-card">
            <img src={p.image} alt={p.title} />
            <div className="similar-info">
              <h4>{p.title}</h4>
              <p>{p.location}</p>
              <span className="similar-price">{p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}