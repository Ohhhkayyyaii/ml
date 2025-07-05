const express = require('express');
const router = express.Router();
const RSVP = require('../models/RSVP');

// Get all RSVPs
router.get('/', async (req, res) => {
  try {
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new RSVP
router.post('/', async (req, res) => {
  const rsvp = new RSVP(req.body);
  
  try {
    const newRSVP = await rsvp.save();
    res.status(201).json(newRSVP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get RSVP by ID
router.get('/:id', async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id);
    if (rsvp) {
      res.json(rsvp);
    } else {
      res.status(404).json({ message: 'RSVP not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update RSVP
router.put('/:id', async (req, res) => {
  try {
    const rsvp = await RSVP.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (rsvp) {
      res.json(rsvp);
    } else {
      res.status(404).json({ message: 'RSVP not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete RSVP
router.delete('/:id', async (req, res) => {
  try {
    const rsvp = await RSVP.findByIdAndDelete(req.params.id);
    if (rsvp) {
      res.json({ message: 'RSVP deleted successfully' });
    } else {
      res.status(404).json({ message: 'RSVP not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get RSVP statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalRSVPs = await RSVP.countDocuments();
    const confirmedRSVPs = await RSVP.countDocuments({ status: 'confirmed' });
    const pendingRSVPs = await RSVP.countDocuments({ status: 'pending' });
    const cancelledRSVPs = await RSVP.countDocuments({ status: 'cancelled' });
    
    const totalGuests = await RSVP.aggregate([
      { $group: { _id: null, total: { $sum: '$numberOfGuests' } } }
    ]);
    
    res.json({
      totalRSVPs,
      confirmedRSVPs,
      pendingRSVPs,
      cancelledRSVPs,
      totalGuests: totalGuests[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 