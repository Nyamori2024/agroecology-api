const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User'); // Import the User model
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
connectDB().then(async () => {
  try {
    await User.syncIndexes(); // Ensure MongoDB applies 'unique' constraints correctly
    console.log('✅ User indexes synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error syncing indexes:', err);
    process.exit(1);
  }
});
