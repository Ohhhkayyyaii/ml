import React, { useState, useEffect } from 'react';

const RSVPList = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/rsvp`);
      
      if (response.ok) {
        const data = await response.json();
        setAttendees(data);
      } else {
        throw new Error('Failed to fetch attendees');
      }
    } catch (error) {
      setError('Failed to load attendees. Please try again.');
      console.error('Error fetching attendees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this RSVP?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/rsvp/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAttendees(attendees.filter(attendee => attendee._id !== id));
      } else {
        throw new Error('Failed to delete RSVP');
      }
    } catch (error) {
      setError('Failed to delete RSVP. Please try again.');
      console.error('Error deleting RSVP:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/rsvp/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendanceStatus: newStatus }),
      });

      if (response.ok) {
        setAttendees(attendees.map(attendee => 
          attendee._id === id 
            ? { ...attendee, attendanceStatus: newStatus }
            : attendee
        ));
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      setError('Failed to update status. Please try again.');
      console.error('Error updating status:', error);
    }
  };

  const filteredAttendees = attendees.filter(attendee => {
    const matchesStatus = filterStatus === 'all' || attendee.attendanceStatus === filterStatus;
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusCount = (status) => {
    return attendees.filter(attendee => attendee.attendanceStatus === status).length;
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="card">
          <div className="flex-center py-12">
            <div className="loading-spinner mr-4"></div>
            <span className="text-gray-600 font-medium">Loading attendees...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card card-hover">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{attendees.length}</p>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">{getStatusCount('confirmed')}</p>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{getStatusCount('pending')}</p>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">{getStatusCount('cancelled')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filterStatus === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({attendees.length})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filterStatus === 'confirmed'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmed ({getStatusCount('confirmed')})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filterStatus === 'pending'
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({getStatusCount('pending')})
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filterStatus === 'cancelled'
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelled ({getStatusCount('cancelled')})
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-64"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert-danger mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        </div>
      )}

      {/* Attendees Table */}
      <div className="card">
        {filteredAttendees.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No attendees found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No RSVPs have been submitted yet.'
              }
            </p>
          </div>
        ) : (
          <div className="table-container scrollbar-modern">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Name</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Phone</th>
                  <th className="table-header-cell">Status</th>
                  <th className="table-header-cell">Dietary Restrictions</th>
                  <th className="table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredAttendees.map((attendee) => (
                  <tr key={attendee._id} className="table-row">
                    <td className="table-cell">
                      <div>
                        <div className="font-semibold text-gray-900">{attendee.name}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(attendee.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <a href={`mailto:${attendee.email}`} className="text-blue-600 hover:text-blue-700">
                        {attendee.email}
                      </a>
                    </td>
                    <td className="table-cell">
                      {attendee.phone ? (
                        <a href={`tel:${attendee.phone}`} className="text-blue-600 hover:text-blue-700">
                          {attendee.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <select
                        value={attendee.attendanceStatus}
                        onChange={(e) => handleStatusUpdate(attendee._id, e.target.value)}
                        className="status-badge border-0 text-white font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        style={{
                          backgroundColor: attendee.attendanceStatus === 'confirmed' 
                            ? 'linear-gradient(to right, #10B981, #059669)'
                            : attendee.attendanceStatus === 'pending'
                            ? 'linear-gradient(to right, #F59E0B, #D97706)'
                            : 'linear-gradient(to right, #EF4444, #DC2626)'
                        }}
                      >
                        <option value="confirmed" className="bg-green-600">Confirmed</option>
                        <option value="pending" className="bg-yellow-600">Pending</option>
                        <option value="cancelled" className="bg-red-600">Cancelled</option>
                      </select>
                    </td>
                    <td className="table-cell">
                      {attendee.dietaryRestrictions ? (
                        <span className="text-sm text-gray-700">{attendee.dietaryRestrictions}</span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDelete(attendee._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete RSVP"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={fetchAttendees}
          className="btn-secondary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh List
        </button>
      </div>
    </div>
  );
};

export default RSVPList; 