const fs = require('fs');
const Product = require('../models/Product');
const Outlet = require('../models/Outlet');
const Faq = require('../models/Faq');
const Blog = require('../models/Blog');

// POST /ingest/:type - Protected: Accepts and inserts bulk JSON data by type
exports.ingestData = async (req, res) => {
  const { type } = req.params;
  const filePath = req.file?.path;

  if (!filePath) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);

    // Dynamically select model and unique field based on type
    const modelMap = {
      products: { model: Product, uniqueField: 'name' },
      outlets: { model: Outlet, uniqueField: 'name' },
      faqs: { model: Faq, uniqueField: 'question' },
      blogs: { model: Blog, uniqueField: 'title' },
    };

    const config = modelMap[type];
    if (!config) return res.status(400).json({ message: 'Invalid type' });

    const { model: Model, uniqueField } = config;
    let insertedCount = 0;

    // Insert each item only if it doesn't already exist
    for (const item of data) {
      const exists = await Model.findOne({ [uniqueField]: item[uniqueField] });
      if (!exists) {
        await new Model(item).save();
        insertedCount++;
      }
    }

    fs.unlinkSync(filePath); // Clean up uploaded file

    res.status(201).json({ message: `${insertedCount} new ${type} added successfully` });
  } catch (err) {
    console.error('Data ingestion error:', err.message);
    res.status(400).json({ error: 'Invalid data or file' });
  }
};
