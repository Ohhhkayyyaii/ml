import React, { useState } from 'react';

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    additionalNotes: '',
    attendanceStatus: 'confirmed'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Enhanced validation with better error messages
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          dietaryRestrictions: '',
          additionalNotes: '',
          attendanceStatus: 'confirmed'
        });
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Submission error:', errorData);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="card card-hover">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-gradient text-2xl font-bold mb-2">RSVP Form</h3>
          <p className="text-gray-600">Please fill out the form below to confirm your attendance</p>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="alert-success mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">RSVP submitted successfully!</span>
            </div>
            <p className="mt-2 text-sm">Thank you for confirming your attendance. We look forward to seeing you!</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert-danger mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Submission failed</span>
            </div>
            <p className="mt-2 text-sm">Please try again or contact us if the problem persists.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <fieldset className="fieldset-modern">
            <legend className="legend-modern">Personal Information</legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input-field ${errors.name ? 'input-field-error' : ''}`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field ${errors.email ? 'input-field-error' : ''}`}
                  placeholder="Enter your email address"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`input-field ${errors.phone ? 'input-field-error' : ''}`}
                placeholder="Enter your phone number (optional)"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>
          </fieldset>

          {/* Attendance Status Section */}
          <fieldset className="fieldset-modern">
            <legend className="legend-modern">Attendance Status</legend>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="confirmed"
                  name="attendanceStatus"
                  value="confirmed"
                  checked={formData.attendanceStatus === 'confirmed'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <label htmlFor="confirmed" className="ml-3 text-sm font-medium text-gray-700">
                  <span className="status-badge status-confirmed mr-2">Confirmed</span>
                  I will attend the session
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="pending"
                  name="attendanceStatus"
                  value="pending"
                  checked={formData.attendanceStatus === 'pending'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <label htmlFor="pending" className="ml-3 text-sm font-medium text-gray-700">
                  <span className="status-badge status-pending mr-2">Pending</span>
                  I might attend (will confirm later)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="cancelled"
                  name="attendanceStatus"
                  value="cancelled"
                  checked={formData.attendanceStatus === 'cancelled'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <label htmlFor="cancelled" className="ml-3 text-sm font-medium text-gray-700">
                  <span className="status-badge status-cancelled mr-2">Cancelled</span>
                  I cannot attend
                </label>
              </div>
            </div>
          </fieldset>

          {/* Additional Information Section */}
          <fieldset className="fieldset-modern">
            <legend className="legend-modern">Additional Information</legend>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-gray-700 mb-2">
                  Dietary Restrictions
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  rows="3"
                  className="input-field"
                  placeholder="Any dietary restrictions or preferences (optional)"
                />
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows="4"
                  className="input-field"
                  placeholder="Any additional information or special requests (optional)"
                />
              </div>
            </div>
          </fieldset>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary flex-1 ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner mr-3"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit RSVP
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  dietaryRestrictions: '',
                  additionalNotes: '',
                  attendanceStatus: 'confirmed'
                });
                setErrors({});
                setSubmitStatus(null);
              }}
              className="btn-secondary"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVPForm; 