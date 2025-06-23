const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

/**
 * Prevent server from starting during automated tests
 * This allows test files to control DB setup/teardown independently
 */
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(async () => {
    try {
      // Ensure indexes (e.g., unique constraints) are applied to User schema
      await User.syncIndexes();
      console.log('✅ User indexes synced');

      // Start the Express server
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('❌ Error syncing indexes:', err);
      process.exit(1); // Exit process if DB index sync fails
    }
  });
}
