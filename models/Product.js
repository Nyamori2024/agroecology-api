const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: {
    en: { type: String, required: true },
    fr: { type: String, required: true }
  },
  category: { type: String, required: true },
  certification: { type: String },
  nutritionalBenefits: [{ type: String }],
  image: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);
