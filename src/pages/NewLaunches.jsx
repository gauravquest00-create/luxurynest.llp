// src/pages/NewLaunches.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

// Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfUjjzesY9GgcONjMCwTVOEN-QaYjm4qbKv3e9mEC2khUR6cWMz4xdyV8bgWb1J7Q3/exec';

// Validation helpers
const isValidMobile = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name) => name.trim().length >= 2;

export default function NewLaunches() {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lookingFor: 'residential',
    location: '',
    budget: ''
  });

  // Looking for options
  const lookingForOptions = [
    { id: 'residential', label: '🏠 Residential' },
    { id: 'commercial', label: '🏢 Commercial' },

  ];

  // Budget options
  const budgetOptions = [
    { id: 'under-50lakh', label: 'Under ₹50 Lakhs' },
    { id: '50lakh-1cr', label: '₹50 Lakhs - ₹1 Crore' },
    { id: '1cr-1.5cr', label: '₹1 Crore - ₹1.5 Crore' },
    { id: '1.5cr-2cr', label: '₹1.5 Crore - ₹2 Crore' },
    { id: '2cr-3cr', label: '₹2 Crore - ₹3 Crore' },
    { id: '3cr-5cr', label: '₹3 Crore - ₹5 Crore' },
    { id: '5cr-7cr', label: '₹5 Crore - ₹7 Crore' },
    { id: '7cr-10cr', label: '₹7 Crore - ₹10 Crore' },
    { id: '10cr-15cr', label: '₹10 Crore - ₹15 Crore' },
    { id: '15cr+', label: '₹15 Crore+' }
  ];

  const handleInputChange = (e) => {
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
      console.log('New Launch lead submitted:', result);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
    if (!formData.location) {
      setError('Please enter preferred location');
      return;
    }
    if (!formData.budget) {
      setError('Please select budget range');
      return;
    }

    await submitToSheet({
      type: 'new_launch_enquiry',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      lookingFor: formData.lookingFor,
      location: formData.location,
      budget: formData.budget,
      source: 'New Launches Page',
      timestamp: new Date().toISOString()
    });
    
    setShowThankYou(true);
    
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <BackButton />
        
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.25rem', textAlign: 'center' }}>
          🚀 New Launch Projects
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '0.9rem', textAlign: 'center' }}>
          Get exclusive updates on upcoming and recently launched projects
        </p>

        {/* Thank You Page */}
        {showThankYou && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
              Thank You, {formData.name}!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '0.5rem' }}>
              We have received your requirements.
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              Our real estate expert will contact you shortly with the best new launch options.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#9ca3af' }}>
              Redirecting to home page...
            </p>
          </div>
        )}

        {/* Lead Capture Form */}
        {!showThankYou && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Looking For */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  I am looking for *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                  {lookingForOptions.map(option => (
                    <label
                      key={option.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        border: formData.lookingFor === option.id ? '2px solid #1e3a8a' : '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: formData.lookingFor === option.id ? '#f0f4ff' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="lookingFor"
                        value={option.id}
                        checked={formData.lookingFor === option.id}
                        onChange={handleInputChange}
                      />
                      <span style={{ fontSize: '0.9rem' }}>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Location */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Preferred Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Sector 71, Gurugram, Dwarka Expressway..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    border: `1px solid ${error && !formData.location ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }}
                />
                <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Tell us your preferred sector or locality
                </p>
              </div>

              {/* Budget Range */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    border: `1px solid ${error && !formData.budget ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map(option => (
                    <option key={option.id} value={option.label}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    border: `1px solid ${error && !formData.name ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    border: `1px solid ${error && !formData.email ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    border: `1px solid ${error && !formData.phone ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    outline: 'none'
                  }}
                />
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: '#D4AF37',
                  color: '#1F3556',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#B8962C')}
                onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#D4AF37')}
              >
                {isSubmitting ? 'Submitting...' : 'Get New Launch Updates →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
