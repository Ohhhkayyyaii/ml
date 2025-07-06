import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FIELD_LABELS = {
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  numberOfGuests: 'Number of Guests',
  dietaryRestrictions: 'Dietary Restrictions',
  additionalNotes: 'Additional Notes',
  willJoin: 'Will you join?',
};

export default function DynamicRSVPForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    axios.get(`${API_BASE_URL}/api/events/${eventId}`)
      .then(res => {
        setEvent(res.data);
        const initial = {};
        res.data.fields.forEach(f => initial[f] = '');
        setForm(initial);
      })
      .catch(() => setError('Event not found'))
      .finally(() => setLoading(false));
  }, [eventId]);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      await axios.post(`${API_BASE_URL}/api/rsvp`, {
        eventId,
        responses: form
      });
      setSuccess('RSVP submitted!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting RSVP');
    }
  };

  if (loading) return <div className="text-center py-8">Loading event...</div>;
  if (error) return <div className="alert-danger">{error}</div>;
  if (!event) return null;

  return (
    <div className="max-w-xl mx-auto card mt-8">
      <h2 className="text-2xl font-bold mb-4">RSVP for {event.name}</h2>
      {success && <div className="alert-success">{success}</div>}
      {error && <div className="alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {event.fields.map(field => (
          <div key={field}>
            <label className="block font-medium mb-1">{FIELD_LABELS[field] || field} *</label>
            {field === 'numberOfGuests' ? (
              <select
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            ) : field === 'willJoin' ? (
              <div className="flex space-x-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="willJoin"
                    value="yes"
                    checked={form.willJoin === 'yes'}
                    onChange={handleChange}
                    required
                    className="form-radio text-primary-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="willJoin"
                    value="no"
                    checked={form.willJoin === 'no'}
                    onChange={handleChange}
                    required
                    className="form-radio text-primary-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            ) : field === 'dietaryRestrictions' ? (
              <select
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Dairy-Free">Dairy-Free</option>
                <option value="Other">Other</option>
              </select>
            ) : field === 'additionalNotes' ? (
              <textarea
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="input-field"
                rows={3}
                placeholder="Any additional information or special requests..."
                required
              />
            ) : (
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="input-field"
                placeholder={FIELD_LABELS[field]}
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn-primary">Submit RSVP</button>
      </form>
    </div>
  );
} 