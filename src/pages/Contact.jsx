import ContactInfo from '../components/contact/ContactInfo';
import EnquiryForm from '../components/contact/EnquiryForm';


export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">We'd love to hear from you. Reach out anytime.</p>
        <div className="contact-grid">
          <ContactInfo />
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}