const Product = require('../models/Product');

// GET /products - Public: Returns localized product list based on Accept-Language
exports.getProducts = async (req, res) => {
  const lang = req.language || 'en';
  try {
    const products = await Product.find();

    // Map and override description with localized version
    const localized = products.map(prod => ({
      ...prod.toObject(),
      description: prod.description[lang] || prod.description['en'],
    }));

    res.json(localized);
  } catch (err) {
    console.error('Products error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
