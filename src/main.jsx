import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Global CSS
import './index.css';

// Home page component CSS
import './styles/components/home/home.css';
import './styles/components/home/hero-banner.css';
import './styles/components/home/why-choose-us.css';
import './styles/components/home/featured-properties.css';
import './styles/components/home/testimonials.css';

// About page component styles
import './styles/components/about/stats-row.css';
import './styles/components/about/owner-profile.css';
import './styles/components/about/rera-badge.css';
import './styles/components/about/about-page.css';
import './styles/components/about/team-members.css';


// Properties components styles
import './styles/components/properties/filter-bar.css';
import './styles/components/properties/property-card.css';
import './styles/components/properties/property-grid.css';
import './styles/components/properties/Properties.css';   // page level CSS



// Detail page styles
import './styles/components/detail/image-gallery.css';
import './styles/components/detail/property-info.css';
import './styles/components/detail/lead-panel.css';
import './styles/components/detail/similar-properties.css';
import './styles/components/detail/map-embed.css';
import './styles/components/detail/PropertyDetail.css';


// Contact page styles
import './styles/components/contact/contact-info.css';
import './styles/components/contact/enquiry-form.css';
import './styles/components/contact/Contact.css';

// Future pages/components CSS will be added here
// import './styles/components/properties/filter-bar.css';
// import './styles/components/properties/property-card.css';
// etc.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);