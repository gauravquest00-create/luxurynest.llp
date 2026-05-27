// src/components/detail/LeadPanel.jsx
import { useState } from 'react';
import siteConfig from '../../data/siteConfig';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfUjjzesY9GgcONjMCwTVOEN-QaYjm4qbKv3e9mEC2khUR6cWMz4xdyV8bgWb1J7Q3/exec';

const isValidMobile = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name) => name.trim().length >= 2;

export default function LeadPanel({ propertyTitle, propertyId }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${propertyTitle}`,
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [scheduleError, setScheduleError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: undefined });
  };

  // ----- Submit to Google Sheet -----
  const submitToSheet = async (payload, type) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ ...payload, type }).toString(),
      });
      const result = await response.json();
      console.log(`${type} submitted to sheet:`, result);
      if (result.status !== 'success') {
        console.error('Server error:', result.message);
      }
    } catch (error) {
      console.error(`Error submitting ${type}:`, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----- Enquiry Submission -----
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!isValidName(form.name)) errors.name = 'Name must be at least 2 letters';
    if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address';
    if (!isValidMobile(form.phone)) errors.phone = 'Mobile must be 10 digits & start with 6,7,8,9';
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }

    await submitToSheet(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ''),
        message: form.message,
        property: propertyTitle,
        propertyId,
      },
      'enquiry'
    );
    setEnquirySubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----- Schedule Visit Flow -----
  const handleScheduleClick = () => {
    if (!form.name || !form.email || !form.phone) {
      setScheduleError('Please fill in Name, Email, and Phone before scheduling a visit.');
      return;
    }
    setScheduleError('');
    setShowCalendar(true);
  };

  const handleVisitSubmit = async (e) => {
    e.preventDefault();
    if (!visitDate || !visitTime) {
      alert('Please select both date and time.');
      return;
    }
    setIsSubmitting(true);
    await submitToSheet(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ''),
        property: propertyTitle,
        propertyId,
        visitDate,
        visitTime,
      },
      'visit'
    );
    setVisitSubmitted(true);
    setShowCalendar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSubmitting(false);
  };

  const getWhatsAppMessage = () => {
    const leadData = {
      property: propertyTitle,
      name: form.name.trim(),
      phone: form.phone.replace(/\D/g, ''),
      email: form.email.trim(),
      message: form.message,
      ...(visitSubmitted && { visitDate, visitTime }),
    };
    const text = `*New Lead*\n\n🏠 *Property:* ${leadData.property}\n👤 *Name:* ${leadData.name}\n📞 *Phone:* ${leadData.phone}\n📧 *Email:* ${leadData.email}\n💬 *Message:* ${leadData.message}\n${visitSubmitted ? `📅 *Visit Date:* ${visitDate}\n⏰ *Time:* ${visitTime}` : ''}`;
    return encodeURIComponent(text);
  };

  // ----- Thank You Screens (unchanged) -----
  if (enquirySubmitted) {
    return (
      <div className="thank-you-panel">
        <div className="thank-you-icon">✅</div>
        <h3>Thank You, {form.name}!</h3>
        <p>We have received your enquiry for <strong>{propertyTitle}</strong>.</p>
        <div className="details-box">
          <p><strong>Your details:</strong></p>
          <p>📞 Phone: {form.phone}</p>
          <p>📧 Email: {form.email}</p>
          <p>💬 Message: {form.message}</p>
        </div>
        <p>Our team will contact you within <strong>30 minutes</strong>.</p>
        <p>In the meantime, you can explore more properties or call us directly at <strong>{siteConfig.phoneDisplay}</strong>.</p>
        <button
          className="whatsapp-msg-btn"
          onClick={() => window.open(`https://wa.me/${siteConfig.whatsapp}?text=${getWhatsAppMessage()}`, '_blank')}
        >
          💬 Send Lead via WhatsApp
        </button>
        <button className="back-btn" onClick={() => window.location.reload()}>Submit Another Enquiry</button>
      </div>
    );
  }

  if (visitSubmitted) {
    return (
      <div className="thank-you-panel">
        <div className="thank-you-icon">📅</div>
        <h3>Visit Scheduled, {form.name}!</h3>
        <p>Your site visit for <strong>{propertyTitle}</strong> has been scheduled.</p>
        <div className="details-box">
          <p><strong>📆 Date:</strong> {visitDate}</p>
          <p><strong>⏰ Time:</strong> {visitTime}</p>
          <p><strong>👤 Name:</strong> {form.name}</p>
          <p><strong>📞 Phone:</strong> {form.phone}</p>
          <p><strong>📧 Email:</strong> {form.email}</p>
        </div>
        <p>We will send a reminder via WhatsApp/Email. You can also call us at {siteConfig.phoneDisplay} for any changes.</p>
        <button
          className="whatsapp-msg-btn"
          onClick={() => window.open(`https://wa.me/${siteConfig.whatsapp}?text=${getWhatsAppMessage()}`, '_blank')}
        >
          💬 Send Lead via WhatsApp
        </button>
        <button className="back-btn" onClick={() => window.location.reload()}>Back to Property</button>
      </div>
    );
  }

  // ----- Main Form -----
  return (
    <div className="lead-panel">
      <h3>Interested in this property?</h3>
      <p>Fill the form – we'll get back to you within 30 minutes.</p>

      {scheduleError && <div className="error-message">{scheduleError}</div>}

      <form onSubmit={handleEnquirySubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          required
          value={form.name}
          onChange={handleChange}
          className={validationErrors.name ? 'input-error' : ''}
        />
        {validationErrors.name && <span className="validation-error">{validationErrors.name}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={handleChange}
          className={validationErrors.email ? 'input-error' : ''}
        />
        {validationErrors.email && <span className="validation-error">{validationErrors.email}</span>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          required
          value={form.phone}
          onChange={handleChange}
          className={validationErrors.phone ? 'input-error' : ''}
        />
        {validationErrors.phone && <span className="validation-error">{validationErrors.phone}</span>}

        <textarea name="message" rows="3" value={form.message} onChange={handleChange} />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
        </button>
      </form>

      <button
        className="schedule-btn"
        onClick={handleScheduleClick}
        disabled={isSubmitting}
      >
        Schedule a Visit
      </button>

      {showCalendar && (
        <div className="calendar-popup">
          <h4>Select your preferred visit time</h4>
          <form onSubmit={handleVisitSubmit}>
            <label>
              Date:
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </label>
            <div className="calendar-actions">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Confirming...' : 'Confirm Visit'}
              </button>
              <button type="button" onClick={() => setShowCalendar(false)} disabled={isSubmitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}