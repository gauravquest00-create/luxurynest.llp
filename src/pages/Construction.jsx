// src/pages/Construction.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

// Google Apps Script URL (same as other forms)
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

export default function Construction() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    plotSize: '',
    plotUnit: 'sqyd',
    floors: '2',
    materialType: 'primary',
    location: '',
    message: ''
  });

  // Construction Services
  const constructionServices = [
    {
      id: 1,
      name: "Basic Civil Construction",
      icon: "🏗️",
      shortDesc: "Structure with plaster - Complete civil work",
      description: "Complete civil work including foundation, walls, beams, columns, and plastering. This is the basic structure of your building ready for further finishing.",
      includes: ["Foundation", "Wall Construction", "Beams & Columns", "Roof Casting", "Plastering", "Basic Flooring"],
      excludes: ["Interior Design", "Modular Kitchen", "False Ceiling", "Woodwork", "Painting"],
      priceNote: "Price includes only civil structure with plaster. Interior and finishing work will be charged separately."
    },
    {
      id: 2,
      name: "Turnkey Construction",
      icon: "🔑",
      shortDesc: "Ready to move construction with interior",
      description: "Complete home from foundation to finishing - just bring your luggage and move in! Everything is included from structure to interior.",
      includes: ["Civil Structure", "Plumbing", "Electrical","modular kitchen","Facade", "Interior Design", "Modular Kitchen", "False Ceiling", "Woodwork", "Well Paints", "Bathroom Fittings"],
      excludes: ["Interior Depends on Requirement"],
      priceNote: "⚠️ NOTE: The estimated price is for Basic Civil Construction. Interior cost depends on your specific requirements, design choices, and material preferences. Final interior cost will be shared after detailed discussion."
    },
    {
      id: 3,
      name: "Raw Construction",
      icon: "🏠",
      shortDesc: "Upgrade from civil - Basic structure ready",
      description: "Basic structure is ready with plaster. You need finishing work including flooring, painting, bathroom fittings, and interiors.",
      includes: ["Basic Structure Ready", "Plaster Done", "Flooring", "Well Paint", "Bathroom Fitting"],
      excludes: ["Furniture", "ACs", "Appliances", "Electronics"],
      priceNote: "Upgrade cost depends on the finishing quality and materials you choose."
    }
  ];

  // Material types
  const materialTypes = [
    { 
      id: 'primary', 
      name: 'Primary Material', 
      priceMin: 1600, 
      priceMax: 1700,
      description: 'Premium quality materials with branded products',
      features: ['Premium Cement', 'Branded Tiles', 'High-Grade Steel', 'Designer Fittings']
    },
    { 
      id: 'secondary', 
      name: 'Secondary Material', 
      priceMin: 1300, 
      priceMax: 1400,
      description: 'Good quality materials at affordable price',
      features: ['Standard Cement', 'Local Tiles', 'Standard Steel', 'Regular Fittings']
    }
  ];

  // Calculate price estimate
  const calculateEstimate = () => {
    let areaSqft = parseFloat(formData.plotSize);
    if (formData.plotUnit === 'sqyd') {
      areaSqft = areaSqft * 9;
    }
    
    const floors = parseInt(formData.floors);
    const totalArea = (floors + 1) * areaSqft;
    
    const material = materialTypes.find(m => m.id === formData.materialType);
    const minPrice = totalArea * material.priceMin;
    const maxPrice = totalArea * material.priceMax;
    
    setPriceEstimate({
      areaSqft: areaSqft,
      totalArea: totalArea,
      floors: floors,
      minPrice: minPrice,
      maxPrice: maxPrice,
      materialName: material.name,
      priceMinPerSqft: material.priceMin,
      priceMaxPerSqft: material.priceMax,
      materialType: formData.materialType
    });
    
    setShowEstimate(true);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, serviceType: service.name });
    setShowForm(true);
    setShowThankYou(false);
    setShowEstimate(false);
    setError('');
    setPriceEstimate(null);
  };

  const handleBackToServices = () => {
    setShowForm(false);
    setSelectedService(null);
    setShowEstimate(false);
    setPriceEstimate(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      plotSize: '',
      plotUnit: 'sqyd',
      floors: '2',
      materialType: 'primary',
      location: '',
      message: ''
    });
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setShowEstimate(false);
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
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
      console.log('Construction lead submitted:', result);
    } catch (error) {
      console.error('Error submitting construction lead:', error);
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
    if (!formData.plotSize || parseFloat(formData.plotSize) <= 0) {
      setError('Please enter valid plot size');
      return;
    }
    if (!priceEstimate) {
      setError('Please calculate price estimate first');
      return;
    }

    await submitToSheet({
      type: 'construction_enquiry',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      serviceType: formData.serviceType,
      plotSize: `${formData.plotSize} ${formData.plotUnit}`,
      plotSizeSqft: priceEstimate.areaSqft,
      floors: formData.floors,
      totalArea: priceEstimate.totalArea,
      materialType: formData.materialType,
      priceEstimateMin: priceEstimate.minPrice,
      priceEstimateMax: priceEstimate.maxPrice,
      location: formData.location,
      message: formData.message,
      source: 'Construction Page',
      timestamp: new Date().toISOString()
    });

    setShowThankYou(true);
    setShowForm(false);

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleReset = () => {
    setShowForm(false);
    setShowThankYou(false);
    setShowEstimate(false);
    setSelectedService(null);
    setPriceEstimate(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      plotSize: '',
      plotUnit: 'sqyd',
      floors: '2',
      materialType: 'primary',
      location: '',
      message: ''
    });
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        <BackButton />

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
          🏗️ Construction Services
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1rem' }}>
          Build your dream space with LuxuryNest Construction
        </p>

        {/* Thank You Page */}
        {showThankYou && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
              Thank You, {formData.name}!
            </h2>
            <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
              We have received your construction requirement for {selectedService?.name}.
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Our construction expert will contact you within 24 hours with a detailed quote.
            </p>
          </div>
        )}

        {/* Service Selection - Show only if no form */}
        {!showForm && !showThankYou && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {constructionServices.map(service => (
              <div
                key={service.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{service.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>{service.shortDesc}</p>
                
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  style={{
                    color: '#1e3a8a',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '1rem',
                    padding: 0
                  }}
                >
                  {expandedCard === service.id ? '▲ Show Less' : '▼ Show More'}
                </button>

                {/* Expanded Content */}
                {expandedCard === service.id && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
                      {service.description}
                    </p>
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.5rem' }}>✓ Includes:</p>
                      <ul style={{ fontSize: '0.8rem', color: '#4b5563', listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
                        {service.includes.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '0.25rem' }}>✓ {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.5rem' }}>✗ Excludes:</p>
                      <ul style={{ fontSize: '0.8rem', color: '#6b7280', listStyle: 'none', padding: 0 }}>
                        {service.excludes.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '0.25rem' }}>✗ {item}</li>
                        ))}
                      </ul>
                    </div>
                    {service.priceNote && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#fef3c7',
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        color: '#92400e'
                      }}>
                        💡 {service.priceNote}
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleServiceSelect(service)}
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#1e3a8a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1e3a8a'}
                >
                  {service.name} - Get Quote →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Lead Capture Form */}
        {showForm && !showThankYou && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <button
                  onClick={handleBackToServices}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    marginRight: '1rem'
                  }}
                >
                  ← Back to Services
                </button>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e3a8a', display: 'inline-block' }}>
                  {selectedService?.name} - Get Quote
                </h2>
              </div>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                ✕ Cancel
              </button>
            </div>

            {/* Turnkey Construction Note */}
            {selectedService?.id === 2 && (
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>⚠️ Important Note:</p>
                <p style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  The estimated price below is for Basic Civil Construction only. Interior design and finishing costs will depend on your specific requirements, design choices, and material preferences. Our team will provide a detailed interior quote after understanding your needs.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Plot Details */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Plot Area *</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="number"
                    name="plotSize"
                    value={formData.plotSize}
                    onChange={handleInputChange}
                    placeholder="Enter plot size"
                    style={{
                      flex: 2,
                      padding: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <select
                    name="plotUnit"
                    value={formData.plotUnit}
                    onChange={handleInputChange}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <option value="sqyd">SqYd</option>
                    <option value="sqft">SqFt</option>
                  </select>
                </div>
                <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Tip: 1 SqYd = 9 SqFt
                </p>
              </div>

              {/* Number of Floors */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Number of Floors *</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[2, 3, 4].map(floor => (
                    <label key={floor} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        name="floors"
                        value={floor}
                        checked={formData.floors === floor.toString()}
                        onChange={handleInputChange}
                      />
                      {floor} Floors
                    </label>
                  ))}
                </div>
                <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Formula: Total Area = (Floors + 1) × Plot Area
                </p>
              </div>

              {/* Material Type */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Material Type *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {materialTypes.map(material => (
                    <label
                      key={material.id}
                      style={{
                        padding: '0.75rem',
                        border: formData.materialType === material.id ? '2px solid #1e3a8a' : '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: formData.materialType === material.id ? '#f0f4ff' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="materialType"
                        value={material.id}
                        checked={formData.materialType === material.id}
                        onChange={handleInputChange}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <div>
                        <strong>{material.name}</strong>
                        <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0', color: '#6b7280' }}>
                          ₹{material.priceMin} - ₹{material.priceMax}/sqft
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="button"
                onClick={calculateEstimate}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#f97316',
                  color: 'white',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem',
                  cursor: 'pointer'
                }}
              >
                Calculate Price Estimate →
              </button>

              {/* Price Estimate Display */}
              {showEstimate && priceEstimate && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>💰 Price Estimate</h3>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    <p>📐 Plot Area: <strong>{formData.plotSize} {formData.plotUnit}</strong> = <strong>{priceEstimate.areaSqft.toFixed(0)} sqft</strong></p>
                    <p>🏗️ Floors: <strong>{formData.floors}</strong> + Ground Floor = <strong>{priceEstimate.floors + 1}</strong> levels</p>
                    <p>📏 Total Construction Area: <strong>{formData.floors} + 1</strong> × {priceEstimate.areaSqft.toFixed(0)} = <strong>{priceEstimate.totalArea.toFixed(0)} sqft</strong></p>
                    <p>🔨 Material: <strong>{priceEstimate.materialName}</strong> @ ₹{priceEstimate.priceMinPerSqft} - ₹{priceEstimate.priceMaxPerSqft}/sqft</p>
                    <p style={{ fontSize: '1rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #bbf7d0' }}>
                      <strong>Estimated Cost:</strong><br />
                      <span style={{ fontSize: '1.25rem', color: '#166534' }}>
                        ₹{priceEstimate.minPrice.toLocaleString('en-IN')} - ₹{priceEstimate.maxPrice.toLocaleString('en-IN')}
                      </span>
                    </p>
                    {selectedService?.id === 2 && (
                      <p style={{ fontSize: '0.75rem', color: '#92400e', marginTop: '0.5rem', backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '0.25rem' }}>
                        ⚠️ This is estimated civil construction cost. Interior cost will be calculated separately based on your requirements.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Details */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Location / Sector</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Sector 71, Gurugram"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Additional Requirements</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Any specific requirements..."
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1e3a8a',
                  color: 'white',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Construction Request →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
