const Product = require('../models/Product');

// GET /products - Public: Fetch localized product list
exports.getProducts = async (req, res) => {
  const lang = req.language || 'en';
  try {
    const products = await Product.find();

    // Replace description with localized text
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
