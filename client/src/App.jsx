import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import RSVPForm from './components/RSVPForm';
import RSVPList from './components/RSVPList';
import EventList from './components/EventList';
import EventPage from './components/EventPage';

function App() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/event')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const handleAddEvent = () => {
    navigate('/events', { state: { openForm: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="header-modern sticky top-0 z-50">
        <div className="container-max section-padding">
          <div className="flex-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-gradient text-2xl font-bold">RSVP Manager</h1>
            </div>
            {/* Modern Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                }
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/events" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`
                }
              >
                Events
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-max section-padding">
        <Routes>
          <Route path="/" element={
            <div className="animate-fade-in">
              {/* Hero Section */}
              <div className="flex flex-col items-center justify-center mb-12">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex-center shadow-2xl mb-6">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-gradient text-4xl font-extrabold mb-2">Welcome to RSVP Manager</h2>
                <p className="text-gray-600 text-lg max-w-2xl text-center mb-8">
                  Effortlessly manage your event attendees. Collect RSVPs, track attendance, and keep your sessions organized—all in one beautiful app.
                </p>
                <button
                  className="btn-primary text-lg px-8 py-4 shadow-xl scale-hover lift-hover mb-8"
                  onClick={handleAddEvent}
                >
                  + Add New Event
                </button>
              </div>
              {/* Upcoming Events Preview */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-center text-gradient">Upcoming Events</h3>
                {loading ? (
                  <div className="flex-center py-8"><div className="loading-spinner"></div></div>
                ) : events.length === 0 ? (
                  <div className="text-center text-gray-500">No events yet. Be the first to <span className='underline cursor-pointer text-blue-600' onClick={handleAddEvent}>add one</span>!</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {events.slice(0, 3).map(event => (
                      <div key={event._id} className="card card-hover flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex-center shadow-lg mb-4">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="font-bold text-lg text-gray-900 mb-1">{event.name}</div>
                        <div className="text-gray-500 text-sm mb-2">{new Date(event.date).toLocaleDateString()}</div>
                        {event.description && <div className="text-gray-600 text-sm mb-2 text-center">{event.description}</div>}
                        <NavLink className="btn-secondary mt-2" to={`/event/${event._id}`}>View & RSVP</NavLink>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          } />
          <Route path="/events" element={<EventList />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 