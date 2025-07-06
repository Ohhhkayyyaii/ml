import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const EventList = ({ onSelect }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', description: '' });
  const [creating, setCreating] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/event`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create event');
      setForm({ name: '', date: '', description: '' });
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      setError('Failed to create event');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="card card-hover mb-8">
      <div className="flex-between mb-4">
        <h3 className="text-xl font-bold text-gradient">Events</h3>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Event'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Event Name"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Description (optional)"
          />
          <button type="submit" className="btn-success md:col-span-3" disabled={creating}>
            {creating ? 'Creating...' : 'Create'}
          </button>
        </form>
      )}
      {error && <div className="alert-danger mb-4">{error}</div>}
      {loading ? (
        <div className="flex-center py-8"><div className="loading-spinner"></div></div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map(event => (
            <li key={event._id} className="py-4 flex-between">
              <div>
                <div className="font-semibold text-lg text-gray-900">{event.name}</div>
                <div className="text-gray-500 text-sm">{new Date(event.date).toLocaleDateString()}</div>
                {event.description && <div className="text-gray-600 text-sm mt-1">{event.description}</div>}
              </div>
              <NavLink className="btn-primary" to={`/event/${event._id}`}>View & RSVP</NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList; 