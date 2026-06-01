// src/pages/NewLaunches.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import projectsData from '../data/projects.json';

export default function NewLaunches() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projects = projectsData.projects;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
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
      location: project.location
    });
    setShowForm(true);
    setShowThankYou(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Save to localStorage
      const leads = JSON.parse(localStorage.getItem('leads') || '[]');
      leads.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('leads', JSON.stringify(leads));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitting(false);
      setShowThankYou(true);
      setShowForm(false);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setShowForm(false);
    setShowThankYou(false);
    setSelectedProject(null);
    setSearchTerm('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      project: '',
      location: ''
    });
    setErrors({});
  };

  // Get unique locations
  const locations = [...new Set(projects.map(p => p.location))];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        <BackButton />
        
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>
          🏗️ New Launch Projects
        </h1>
        <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
          Explore upcoming and recently launched projects in Gurugram
        </p>

        {/* Search Section - Show only if no thank you page */}
        {!showThankYou && (
          <>
            <div style={{ marginBottom: '2rem', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="🔍 Search by location (e.g., Sector 71) or project name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  disabled={showForm}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: `2px solid ${showForm ? '#d1d5db' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    outline: 'none',
                    backgroundColor: showForm ? '#f3f4f6' : 'white',
                    cursor: showForm ? 'not-allowed' : 'text'
                  }}
                />
              </div>

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
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 10,
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                }}>
                  {suggestions.map(project => (
                    <div
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      style={{
                        padding: '1rem',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{project.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        📍 {project.location} | 💰 {project.price} | 🏷️ {project.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lead Capture Form */}
            {showForm && selectedProject && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                marginTop: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
                    Get Details for {selectedProject.name}
                  </h2>
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
                
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>🏢 Project</label>
                    <input
                      type="text"
                      value={`${formData.project} - ${formData.location}`}
                      disabled
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9fafb',
                        color: '#374151'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>👤 Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `1px solid ${errors.name ? '#ef4444' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                    {errors.name && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.name}</p>}
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>📧 Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `1px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                    {errors.email && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</p>}
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>📱 Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: `1px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                        borderRadius: '0.5rem',
                        outline: 'none'
                      }}
                    />
                    {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.phone}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: '#1e3a8a',
                      color: 'white',
                      fontWeight: 'bold',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#f97316')}
                    onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#1e3a8a')}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Project Details →'}
                  </button>
                </form>
              </div>
            )}

            {/* Popular Locations Section - Show only when no form */}
            {!showForm && (
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Popular Locations</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {locations.map(location => (
                    <button
                      key={location}
                      onClick={() => {
                        setSearchTerm(location);
                        handleSearch({ target: { value: location } });
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e5e7eb',
                        border: 'none',
                        borderRadius: '2rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
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
            )}
          </>
        )}

        {/* Thank You Page */}
        {showThankYou && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            marginTop: '2rem'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '1rem' }}>
              Thank You!
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4b5563', marginBottom: '0.5rem' }}>
              We've received your request for <strong>{selectedProject?.name}</strong>
            </p>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Our real estate expert will contact you shortly with all the details.
            </p>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '3px solid #e5e7eb',
              borderTopColor: '#1e3a8a',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }} />
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}>
              Redirecting to home page...
            </p>
          </div>
        )}

        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}
