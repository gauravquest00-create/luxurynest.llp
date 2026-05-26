import { useState } from 'react';

export default function ImageGallery({ images, title }) {
  const [selected, setSelected] = useState(0);
  const galleryImages = images?.length ? images : ['https://via.placeholder.com/800x500'];

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={galleryImages[selected]} alt={title} />
      </div>
      {galleryImages.length > 1 && (
        <div className="thumbnails">
          {galleryImages.map((img, idx) => (
            <button key={idx} onClick={() => setSelected(idx)} className={selected === idx ? 'active' : ''}>
              <img src={img} alt={`thumb ${idx}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}