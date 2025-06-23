const app = require('./app');
const connectDB = require('./config/db');
const User = require('./models/User');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Skip actual server start during test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(async () => {
    try {
      await User.syncIndexes();
      console.log('✅ User indexes synced');

      app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });
    } catch (err) {
      console.error('❌ Error syncing indexes:', err);
      process.exit(1);
    }
  });
}
