import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import siteConfig from '../../data/siteConfig';

// Plain SVG icons for social media (no external dependency)
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <h2>Get in Touch</h2>
      <div className="info-item">
        <Phone size={18} />
        <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
      </div>
      <div className="info-item">
        <Mail size={18} />
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </div>
      <div className="info-item">
        <MapPin size={18} />
        <span>{siteConfig.address}</span>
      </div>
      <div className="info-item">
        <Clock size={18} />
        <span>{siteConfig.hours}</span>
      </div>
      <div className="social-links">
        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer"><InstagramIcon /></a>
        <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer"><FacebookIcon /></a>
        <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer"><YoutubeIcon /></a>
        <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer"><TwitterIcon /></a>
      </div>
      <div className="map-wrapper">
        <iframe
          title="Office Location"
          src={siteConfig.mapEmbedUrl}
          width="100%"
          height="200"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}