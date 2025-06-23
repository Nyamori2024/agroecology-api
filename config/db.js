const mongoose = require('mongoose');

// Connects to MongoDB using correct URI depending on environment
const connectDB = async () => {
  try {
    const dbURI =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI;

    if (!dbURI) throw new Error('❌ Mongo URI not set');

    await mongoose.connect(dbURI);
    console.log(`✅ MongoDB connected (${process.env.NODE_ENV === 'test' ? 'Test DB' : 'Main DB'})`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
