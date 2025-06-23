const Product = require('../models/Product');
const User = require('../models/User');
const Blog = require('../models/Blog');

// GET /dashboard - Protected: Returns platform statistics
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // Total registered users
    const totalProducts = await Product.countDocuments(); // Total products available
    const contributors = await Blog.distinct('author').then(arr => arr.length); // Unique blog authors

    res.json({ totalUsers, totalProducts, contributors });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
