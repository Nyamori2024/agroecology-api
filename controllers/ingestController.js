const fs = require('fs');
const Product = require('../models/Product');
const Outlet = require('../models/Outlet');
const Faq = require('../models/Faq');
const Blog = require('../models/Blog');

// POST /ingest/:type
exports.ingestData = async (req, res) => {
  const { type } = req.params;
  const filePath = req.file?.path;

  if (!filePath) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    const modelMap = {
      products: Product,
      outlets: Outlet,
      faqs: Faq,
      blogs: Blog,
    };

    const Model = modelMap[type];
    if (!Model) return res.status(400).json({ message: 'Invalid type' });

    await Model.insertMany(data);
    fs.unlinkSync(filePath); // cleanup

    res.json({ message: `${type} data ingested successfully` });
  } catch (err) {
    console.error('Data ingestion error:', err);
    res.status(400).json({ error: 'Invalid data or file' });
  }
};
