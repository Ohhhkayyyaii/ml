import { useState } from 'react';
import axios from 'axios';

const FIELD_OPTIONS = [
  { value: 'name', label: 'Full Name' },
  { value: 'email', label: 'Email Address' },
  { value: 'phone', label: 'Phone Number' },
  { value: 'numberOfGuests', label: 'Number of Guests' },
  { value: 'dietaryRestrictions', label: 'Dietary Restrictions' },
  { value: 'additionalNotes', label: 'Additional Notes' },
  { value: 'willJoin', label: 'Will you join?' },
];

export default function EventCreate() {
  const [form, setForm] = useState({
    name: '',
    date: '',
    description: '',
    fields: ['name', 'email']
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFieldToggle = value => {
    setForm(f => ({
      ...f,
      fields: f.fields.includes(value)
        ? f.fields.filter(v => v !== value)
        : [...f.fields, value]
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_BASE_URL}/api/events`, form);
      setSuccess('Event created successfully!');
      setForm({ name: '', date: '', description: '', fields: ['name', 'email'] });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto card mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      {success && <div className="alert-success">{success}</div>}
      {error && <div className="alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Event Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Event name"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Event Date *</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="input-field"
            placeholder="Event description (optional)"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Fields to Collect *</label>
          <div className="flex flex-wrap gap-4">
            {FIELD_OPTIONS.map(opt => (
              <label key={opt.value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={form.fields.includes(opt.value)}
                  onChange={() => handleFieldToggle(opt.value)}
                  className="form-checkbox text-primary-600"
                />
                <span className="ml-2">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
} 