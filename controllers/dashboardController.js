const Product = require('../models/Product');
const User = require('../models/User');
const Blog = require('../models/Blog');

// GET /dashboard - Protected: Returns system stats
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const contributors = await Blog.distinct('author').then(arr => arr.length);

    res.json({ totalUsers, totalProducts, contributors });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
