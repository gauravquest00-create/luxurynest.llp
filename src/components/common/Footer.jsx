import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import siteConfig from "../../data/siteConfig";
import "./Footer.css";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Properties", path: "/properties" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const propertyLinks = [
  { label: "Flats for Sale", path: "/properties?type=sale" },
  { label: "Flats for Rent", path: "/properties?type=rent" },
  { label: "Plot", path: "/properties?type=plot" },
  { label: "Builder Floor", path: "/properties?type=builder" },
 
  
];

// SVG icons for social media
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1 – Brand */}
          <div className="footer-brand">
            <div className="brand-logo-wrapper">
              {siteConfig.logo ? (
                <img src={siteConfig.logo} alt={siteConfig.businessName} className="brand-logo-img" />
              ) : (
                <div className="brand-logo">GA</div>
              )}
              <p className="brand-name">{siteConfig.businessName}</p>
            </div>
            <p className="brand-description">{siteConfig.description}</p>
            <div className="social-icons">
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="social-icon">
                <InstagramIcon />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="social-icon">
                <FacebookIcon />
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="social-icon">
                <YoutubeIcon />
              </a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" className="social-icon">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="footer-links-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">→ {link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Properties */}
          <div className="footer-links-col">
            <h3 className="footer-heading">Properties</h3>
            <ul className="footer-links">
              {propertyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer-link">→ {link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Contact */}
          <div className="footer-contact-col">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <MapPin size={15} className="contact-icon" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="contact-item">
                <Phone size={15} className="contact-icon" />
                <a href={`tel:${siteConfig.phone}`} className="contact-link">{siteConfig.phoneDisplay}</a>
              </li>
              <li className="contact-item">
                <Mail size={15} className="contact-icon" />
                <a href={`mailto:${siteConfig.email}`} className="contact-link">{siteConfig.email}</a>
              </li>
              <li className="contact-item">
                <Clock size={15} className="contact-icon" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">© {currentYear} {siteConfig.businessName}. All rights reserved.</p>
          <p className="made-by">Made by Gaurav</p>
          <p className="rera-text">RERA Reg:</p>
        </div>
      </div>
    </footer>
  );
}
