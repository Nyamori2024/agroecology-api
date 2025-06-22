const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// GET /blogs - Public route to fetch all blog posts
router.get('/', blogController.getBlogs);

// POST /blogs - Protected route to create a blog post, requires JWT token
router.post('/', auth, blogController.createBlog);

module.exports = router;
