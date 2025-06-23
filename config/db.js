const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the correct connection string
 * Automatically selects the URI based on the environment (test vs. production)
 */
const connectDB = async () => {
  try {
    // Use test DB URI if in test environment; otherwise, use main URI
    const dbURI =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI;

    // Ensure URI is defined
    if (!dbURI) throw new Error('❌ Mongo URI not set');

    // Attempt to connect to MongoDB
    await mongoose.connect(dbURI);

    console.log(
      `✅ MongoDB connected (${process.env.NODE_ENV === 'test' ? 'Test DB' : 'Main DB'})`
    );
  } catch (err) {
    // Log connection error and exit process to prevent unstable state
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
