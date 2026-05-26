// src/components/detail/LeadPanel.jsx
import { useState } from 'react';
import siteConfig from '../../data/siteConfig';


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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----- Enquiry Submission (no redirect, just thank you) -----
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // Here you could send data to an API or EmailJS, but for now just show thank you.
    console.log('Enquiry submitted:', { property: propertyTitle, ...form });
    setEnquirySubmitted(true);
  };

  // ----- Schedule Visit – validate and show calendar -----
  const handleScheduleClick = () => {
    if (!form.name || !form.email || !form.phone) {
      setScheduleError('Please fill in your Name, Email, and Phone before scheduling a visit.');
      return;
    }
    setScheduleError('');
    setShowCalendar(true);
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    if (!visitDate || !visitTime) {
      alert('Please select both date and time.');
      return;
    }
    console.log('Visit scheduled:', { property: propertyTitle, name: form.name, email: form.email, phone: form.phone, date: visitDate, time: visitTime });
    setVisitSubmitted(true);
    setShowCalendar(false);
  };

  // ----- Thank You component for enquiry -----
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
        <button className="back-btn" onClick={() => window.location.reload()}>Submit Another Enquiry</button>
      </div>
    );
  }

  // ----- Thank You component for scheduled visit -----
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
        <button className="back-btn" onClick={() => window.location.reload()}>Back to Property</button>
      </div>
    );
  }

  // ----- Main lead panel (form + schedule button) -----
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
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          required
          value={form.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          rows="3"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send Enquiry</button>
      </form>

      <button className="schedule-btn" onClick={handleScheduleClick}>
        Schedule a Visit
      </button>

      {/* Inline date/time picker */}
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
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
                required
              />
            </label>
            <div className="calendar-actions">
              <button type="submit">Confirm Visit</button>
              <button type="button" onClick={() => setShowCalendar(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}