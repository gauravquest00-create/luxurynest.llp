import { useState } from 'react';

// ✅ Define a fallback image (place 'fallback.jpg' in your public folder)
const FALLBACK_IMAGE = '/fallback.jpg';   // local fallback – ensure this file exists in public/

// Helper to convert path to a usable URL
function normalizeImagePath(path) {
  if (!path || typeof path !== 'string') return FALLBACK_IMAGE;
  // If path starts with 'public/', remove it and prepend '/'
  if (path.startsWith('public/')) {
    return '/' + path.slice(7);
  }
  // If path doesn't start with '/', assume it's relative to root – prepend '/'
  if (!path.startsWith('/') && !path.startsWith('http')) {
    return '/' + path;
  }
  return path;
}

export default function ImageGallery({ images, title }) {
  const [selected, setSelected] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  // Convert each image path
  let validImages = Array.isArray(images)
    ? images.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];

  // ✅ Always have at least one image (fallback)
  if (validImages.length === 0) {
    validImages = [FALLBACK_IMAGE];
  }

  // Normalize all paths
  const normalizedImages = validImages.map(normalizeImagePath);

  const handleError = (index) => {
    setImgErrors(prev => ({ ...prev, [index]: true }));
  };

  const getSrc = (src, idx) => {
    if (imgErrors[idx]) return FALLBACK_IMAGE;
    return src;
  };

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img
          src={getSrc(normalizedImages[selected], selected)}
          alt={title}
          onError={() => handleError(selected)}
          style={{ width: '100%', height: '400px', objectFit: 'cover', backgroundColor: '#f5f5f5' }}
        />
      </div>

      {normalizedImages.length > 1 && (
        <div className="thumbnails" style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          {normalizedImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={selected === idx ? 'active' : ''}
              style={{
                border: selected === idx ? '2px solid #D4AF37' : '2px solid transparent',
                borderRadius: '6px',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={getSrc(img, idx)}
                alt={`Thumb ${idx + 1}`}
                onError={() => handleError(idx)}
                style={{ width: '70px', height: '50px', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}