const mongoose = require('mongoose');

// Schema for outlet locations with region, coordinates, and categories
const OutletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  region: { type: String, required: true },
  categories: [{ type: String, required: true }]
});

module.exports = mongoose.model('Outlet', OutletSchema);
