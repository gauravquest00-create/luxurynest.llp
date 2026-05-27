// src/components/home/CTA.jsx
import { useState } from 'react';
import siteConfig from '../../data/siteConfig';

// Google Apps Script URL (same as LeadPanel)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfUjjzesY9GgcONjMCwTVOEN-QaYjm4qbKv3e9mEC2khUR6cWMz4xdyV8bgWb1J7Q3/exec';

// Validation helpers (same as LeadPanel)
const isValidMobile = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidName = (name) => name.trim().length >= 2;

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Submit to Google Sheet
  const submitToSheet = async (payload) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });
      const result = await response.json();
      console.log('CTA lead submitted:', result);
      if (result.status !== 'success') {
        console.error('Server error:', result.message);
      }
    } catch (error) {
      console.error('Error submitting CTA lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!isValidName(formData.name)) {
      setError('Name must be at least 2 letters');
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError('Enter a valid email address');
      return;
    }
    if (!isValidMobile(formData.phone)) {
      setError('Mobile must be 10 digits & start with 6,7,8,9');
      return;
    }

    await submitToSheet({
      type: 'enquiry',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      message: 'CTA request from Home Page',
      property: 'General Inquiry',
      propertyId: '',
      source: 'CTA Section',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="cta-section thank-you">
        <div className="cta-container">
          <div className="thank-you-icon">✅</div>
          <h2>Thank You, {formData.name}!</h2>
          <p>We have received your details and will get back to you shortly.</p>
          <div className="thank-you-details">
            <p><strong>📧 Email:</strong> {formData.email}</p>
            <p><strong>📞 Phone:</strong> {formData.phone}</p>
          </div>
          <p>Our team will contact you within 24 hours.</p>
          <button className="cta-reset" onClick={() => window.location.reload()}>Submit Another Request</button>
        </div>
      </section>
    );
  }

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2>Get Expert Advice</h2>
        <p>Let us help you find the perfect property. Leave your details below.</p>
        <form onSubmit={handleSubmit} className="cta-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {error && <p className="cta-error">{error}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Schedule a Call'}
          </button>
        </form>
        <p className="cta-note">We respect your privacy. No spam, ever.</p>
      </div>
    </section>
  );
}