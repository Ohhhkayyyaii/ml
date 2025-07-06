const mongoose = require('mongoose');
const RSVP = require('./models/RSVP');
require('dotenv').config({ path: './config.env' });

const sampleRSVPs = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "555-0123",
    sessionName: "React Fundamentals Workshop",
    sessionDate: new Date('2024-07-15T14:00:00Z'),
    willAttend: "yes",
    additionalNotes: "Looking forward to learning React!"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-0456",
    sessionName: "Node.js Backend Development",
    sessionDate: new Date('2024-07-20T10:00:00Z'),
    willAttend: "yes",
    additionalNotes: ""
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "555-0789",
    sessionName: "Database Design Principles",
    sessionDate: new Date('2024-07-25T16:00:00Z'),
    willAttend: "no",
    additionalNotes: "Sorry, have a conflict that day"
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "555-0321",
    sessionName: "UI/UX Design Workshop",
    sessionDate: new Date('2024-08-01T13:00:00Z'),
    willAttend: "yes",
    additionalNotes: "Excited to learn about design principles"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await RSVP.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample RSVPs
    await RSVP.insertMany(sampleRSVPs);
    console.log(`Inserted ${sampleRSVPs.length} RSVPs`);

    console.log('Database seeded successfully!');
    console.log('\nSample data created:');
    console.log('- 4 RSVPs for different sessions/workshops');
    console.log('- Mix of attendees and non-attendees');
    console.log('\nYou can now start the application and see the data in action!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase(); 