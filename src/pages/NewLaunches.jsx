// src/pages/NewLaunches.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import projectsData from '../data/projects.json';

// Google Apps Script URL (same as CTA.jsx)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfUjjzesY9GgcONjMCwTVOEN-QaYjm4qbKv3e9mEC2khUR6cWMz4xdyV8bgWb1J7Q3/exec';

// Validation helpers (same as CTA.jsx)
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
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    location: '',
    propertyType: '',
    priceRange: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projects = projectsData.projects;

  // Price ranges
  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: '1.5cr-3cr', label: '₹1.5 Cr - ₹3 Cr', min: 15000000, max: 30000000 },
    { id: '3cr-5cr', label: '₹3 Cr - ₹5 Cr', min: 30000000, max: 50000000 },
    { id: '5cr-7cr', label: '₹5 Cr - ₹7 Cr', min: 50000000, max: 70000000 },
    { id: '7cr-10cr', label: '₹7 Cr - ₹10 Cr', min: 70000000, max: 100000000 },
    { id: '10cr-15cr', label: '₹10 Cr - ₹15 Cr', min: 100000000, max: 150000000 },
    { id: '15cr+', label: '₹15 Cr+', min: 150000000, max: Infinity }
  ];

  // Property types
  const propertyTypes = [
    { id: 'all', label: 'All Properties' },
    { id: 'residential', label: '🏠 Residential' },
    { id: 'commercial', label: '🏢 Commercial' }
  ];

  // Apply filters
  useEffect(() => {
    let filtered = [...projects];

    // Filter by price range
    if (priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === priceRange);
      if (range) {
        filtered = filtered.filter(project => 
          project.priceNum >= range.min && project.priceNum <= range.max
        );
      }
    }

    // Filter by property type
    if (propertyType !== 'all') {
      filtered = filtered.filter(project => project.category === propertyType);
    }

    // Filter by search term
    if (searchTerm && !showForm) {
      filtered = filtered.filter(project =>
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [priceRange, propertyType, searchTerm, projects, showForm]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0 && !showForm) {
      const filtered = projects.filter(project =>
        project.location.toLowerCase().includes(value.toLowerCase()) ||
        project.name.toLowerCase().includes(value.toLowerCase()) ||
        project.sector.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setSearchTerm(`${project.name} - ${project.location}`);
    setSuggestions([]);
    setFormData({
      ...formData,
      project: project.name,
      location: project.location,
      propertyType: project.category || 'residential',
      priceRange: project.price
    });
    setShowForm(true);
    setShowThankYou(false);
    setError('');
  };

  // Submit to Google Sheet (same as CTA.jsx)
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
      if (result.status !== 'success') {
        console.error('Server error:', result.message);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation (same as CTA.jsx)
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
      message: `New Launch Enquiry for ${selectedProject?.name} - ${selectedProject?.location}`,
      property: selectedProject?.name || 'New Launch Project',
      propertyId: selectedProject?.id || '',
      source: 'New Launches Page',
      projectLocation: selectedProject?.location || '',
      projectPrice: selectedProject?.price || '',
      propertyCategory: selectedProject?.category || ''
    });
    
    setShowThankYou(true);
    setShowForm(false);
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleReset = () => {
    setShowForm(false);
    setShowThankYou(false);
    setSelectedProject(null);
    setSearchTerm('');
    setPriceRange('all');
    setPropertyType('all');
    setFormData({
      name: '',
      email: '',
      phone: '',
      project: '',
      location: '',
      propertyType: '',
      priceRange: ''
    });
    setError('');
  };

  // Get unique locations
  const locations = [...new Set(projects.map(p => p.location))];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        <BackButton />
        
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.25rem' }}>
          🏗️ New Launch Projects
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Explore upcoming and recently launched projects in Gurugram
        </p>

        {/* Thank You Page */}
        {showThankYou && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginTop: '1rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
              Thank You, {formData.name}!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '0.5rem' }}>
              We have received your request for <strong>{selectedProject?.name}</strong>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              Our real estate expert will contact you shortly.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#9ca3af' }}>
              Redirecting to home page...
            </p>
          </div>
        )}

        {/* Filters and Search - Show only if no thank you page */}
        {!showThankYou && (
          <>
            {/* Filter Section - Compact */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '0.75rem',
                alignItems: 'end'
              }}>
                {/* Property Type Filter */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.8rem', color: '#374151' }}>
                    Looking for
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    disabled={showForm}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      backgroundColor: showForm ? '#f3f4f6' : 'white',
                      cursor: showForm ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {propertyTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.8rem', color: '#374151' }}>
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    disabled={showForm}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      backgroundColor: showForm ? '#f3f4f6' : 'white',
                      cursor: showForm ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>{range.label}</option>
                    ))}
                  </select>
                </div>

                {/* Search Input */}
                <div style={{ position: 'relative' }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500', fontSize: '0.8rem', color: '#374151' }}>
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="🔍 Sector or Project..."
                    value={searchTerm}
                    onChange={handleSearch}
                    disabled={showForm}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      border: `1px solid ${showForm ? '#d1d5db' : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      outline: 'none',
                      backgroundColor: showForm ? '#f3f4f6' : 'white',
                      cursor: showForm ? 'not-allowed' : 'text'
                    }}
                  />
                  
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && !showForm && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      marginTop: '0.25rem',
                      maxHeight: '250px',
                      overflowY: 'auto',
                      zIndex: 10,
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}>
                      {suggestions.map(project => (
                        <div
                          key={project.id}
                          onClick={() => handleProjectSelect(project)}
                          style={{
                            padding: '0.75rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f3f4f6',
                            fontSize: '0.85rem',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                          <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{project.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            📍 {project.location} | 💰 {project.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Projects Grid - Compact */}
            {!showForm && (
              <>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    Showing <strong>{filteredProjects.length}</strong> projects
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {filteredProjects.map(project => (
                    <div
                      key={project.id}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleProjectSelect(project)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                        onError={(e) => e.target.src = '/placeholder.jpg'}
                      />
                      <div style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>{project.name}</h3>
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            backgroundColor: '#f97316',
                            color: 'white',
                            borderRadius: '0.75rem',
                            fontSize: '0.65rem',
                            fontWeight: 'bold'
                          }}>
                            {project.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>📍 {project.location}</p>
                        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>{project.price}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ padding: '0.2rem 0.4rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', fontSize: '0.7rem' }}>
                            {project.type}
                          </span>
                          <span style={{ padding: '0.2rem 0.4rem', backgroundColor: '#f3f4f6', borderRadius: '0.25rem', fontSize: '0.7rem' }}>
                            {project.category === 'commercial' ? '🏢 Commercial' : '🏠 Residential'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem'
                  }}>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>No projects found matching your criteria.</p>
                  </div>
                )}

                {/* Popular Locations Section - Compact */}
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Popular Locations</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {locations.slice(0, 8).map(location => (
                      <button
                        key={location}
                        onClick={() => {
                          setSearchTerm(location);
                          setPropertyType('all');
                          setPriceRange('all');
                        }}
                        style={{
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          backgroundColor: '#e5e7eb',
                          border: 'none',
                          borderRadius: '1rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1e3a8a';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                          e.currentTarget.style.color = 'black';
                        }}
                      >
                        📍 {location}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Lead Capture Form - Compact */}
            {showForm && selectedProject && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginTop: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1e3a8a' }}>
                    Get Details for {selectedProject.name}
                  </h2>
                  <button
                    onClick={handleReset}
                    style={{
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.8rem',
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
                
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>🏢 Project</label>
                      <input
                        type="text"
                        value={`${formData.project}`}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          fontSize: '0.8rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          backgroundColor: '#f9fafb',
                          color: '#374151'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>📍 Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          fontSize: '0.8rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          backgroundColor: '#f9fafb',
                          color: '#374151'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Type</label>
                      <input
                        type="text"
                        value={formData.propertyType === 'commercial' ? '🏢 Commercial' : '🏠 Residential'}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          fontSize: '0.8rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          backgroundColor: '#f9fafb',
                          color: '#374151'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Price</label>
                      <input
                        type="text"
                        value={selectedProject.price}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          fontSize: '0.8rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          backgroundColor: '#f9fafb',
                          color: '#374151'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>👤 Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '0.8rem',
                        border: `1px solid ${error && !formData.name ? '#ef4444' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>📧 Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '0.8rem',
                        border: `1px solid ${error && !formData.email ? '#ef4444' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>📱 Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '0.8rem',
                        border: `1px solid ${error && !formData.phone ? '#ef4444' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {error && <p style={{ color: '#ef4444', fontSize: '0.7rem', marginBottom: '0.75rem' }}>{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      backgroundColor: '#1e3a8a',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: 'all 0.6s'
                    }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#f97316')}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#1e3a8a')}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Project Details →'}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
