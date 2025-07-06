const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/rsvp', require('./routes/rsvp'));
app.use('/api/event', require('./routes/event'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'RSVP System API is running!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 