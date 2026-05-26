import { useState } from 'react';
import siteConfig from '../../data/siteConfig';

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success">
        <p>Thank you for contacting us!</p>
        <p>We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="enquiry-form">
      <h2>Send us a Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="name" placeholder="Your Name *" required value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email Address *" required value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="tel" name="phone" placeholder="Phone Number *" required value={form.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
        </div>
        <div className="form-group">
          <textarea name="message" rows="4" placeholder="Your Message *" required value={form.message} onChange={handleChange} />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}