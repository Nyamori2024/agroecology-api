const mongoose = require('mongoose');

// Schema for blog posts
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  tags: [{ type: String, lowercase: true }],
  image: { type: String },
  author: { type: String, required: true }, // Username from JWT
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
