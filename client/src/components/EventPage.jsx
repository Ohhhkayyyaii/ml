import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    additionalNotes: '',
    attendanceStatus: 'confirmed'
  });
  const [formStatus, setFormStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEvent();
    fetchAttendees();
    // eslint-disable-next-line
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/event/${id}`);
      if (!res.ok) throw new Error('Event not found');
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendees = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/rsvp');
      if (!res.ok) throw new Error('Failed to fetch attendees');
      const data = await res.json();
      setAttendees(data.filter(a => a.event === id));
    } catch (err) {
      setError('Failed to load attendees');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    setFormStatus(null);
    try {
      const res = await fetch('http://localhost:5000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, event: id }),
      });
      if (!res.ok) throw new Error('Failed to submit RSVP');
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        dietaryRestrictions: '',
        additionalNotes: '',
        attendanceStatus: 'confirmed'
      });
      fetchAttendees();
    } catch (err) {
      setFormStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex-center py-12"><div className="loading-spinner"></div></div>;
  if (error) return <div className="alert-danger">{error}</div>;
  if (!event) return null;

  return (
    <div className="container-max section-padding animate-fade-in">
      {/* Hero/Banner */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-3xl font-extrabold mb-1">{event.name}</h2>
              <div className="text-indigo-100 text-lg">{new Date(event.date).toLocaleDateString()}</div>
              {event.description && <div className="text-indigo-200 mt-2">{event.description}</div>}
            </div>
          </div>
          <NavLink to="/events" className="btn-secondary mt-6 md:mt-0">← Back to Events</NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* RSVP Form */}
        <div className="card card-hover">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            RSVP for this Event
          </h3>
          {formStatus === 'success' && <div className="alert-success mb-4">RSVP submitted!</div>}
          {formStatus === 'error' && <div className="alert-danger mb-4">Submission failed. Try again.</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`input-field ${formErrors.name ? 'input-field-error' : ''}`} required />
              {formErrors.name && <div className="text-red-600 text-sm mt-1">{formErrors.name}</div>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`input-field ${formErrors.email ? 'input-field-error' : ''}`} required />
              {formErrors.email && <div className="text-red-600 text-sm mt-1">{formErrors.email}</div>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Restrictions</label>
              <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleInputChange} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleInputChange} className="input-field" rows={3} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Attendance Status</label>
              <select name="attendanceStatus" value={formData.attendanceStatus} onChange={handleInputChange} className="input-field">
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit RSVP'}</button>
          </form>
        </div>
        {/* Attendee List */}
        <div className="card card-hover">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Attendees
          </h3>
          {attendees.length === 0 ? (
            <div className="flex flex-col items-center py-8">
              <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <div className="text-gray-500 text-lg">No RSVPs yet for this event.</div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {attendees.map(a => (
                <li key={a._id} className="py-3">
                  <div className="font-semibold text-gray-900">{a.name}</div>
                  <div className="text-gray-600 text-sm">{a.email}</div>
                  <div className="text-gray-500 text-xs">{a.attendanceStatus}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage; 