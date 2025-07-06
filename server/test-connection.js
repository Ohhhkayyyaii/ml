const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

console.log('Testing MongoDB connection...');
console.log('Connection string:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connection successful!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
}); 