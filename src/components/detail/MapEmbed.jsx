import siteConfig from '../../data/siteConfig';

export default function MapEmbed({ address }) {
  return (
    <div className="map-embed">
      <h3>Location</h3>
      <iframe
        title="Property Location"
        src={siteConfig.mapEmbedUrl}
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen
        loading="lazy"
      />
      <p>{address}</p>
    </div>
  );
}