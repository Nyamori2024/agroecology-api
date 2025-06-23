const mongoose = require('mongoose');

/**
 * Product Schema for agroecology-related products.
 * Supports multilingual descriptions (English and French).
 * Designed for use in a public API to display localized product information.
 */
const ProductSchema = new mongoose.Schema({
  // Name of the product (e.g., "Compost", "Organic Fertilizer")
  name: { type: String, required: true, trim: true },

  // Description in English and French (i18n-ready field)
  description: {
    en: { type: String, required: true }, // English version
    fr: { type: String, required: true }  // French version
  },

  // Category of the product (e.g., "fertilizer", "seed", etc.)
  category: { type: String, required: true },

  // Optional field: Certification (e.g., "KEBS", "Organic Certified")
  certification: { type: String },

  // Optional field: List of nutritional or environmental benefits
  nutritionalBenefits: [{ type: String }],

  // Optional field: Path or URL to the product image
  image: { type: String }
});

// Export the model to be used in routes/controllers
module.exports = mongoose.model('Product', ProductSchema);
