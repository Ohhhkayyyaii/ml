const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  dietaryRestrictions: {
    type: String,
    trim: true
  },
  additionalNotes: {
    type: String,
    trim: true
  },
  attendanceStatus: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'confirmed',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RSVP', rsvpSchema); 