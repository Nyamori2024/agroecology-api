const Outlet = require('../models/Outlet');

// GET /outlets - Public: Fetch all outlet locations with details
exports.getOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.json(outlets);
  } catch (err) {
    console.error('Outlets error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
