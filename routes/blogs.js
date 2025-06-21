const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// GET /blogs - Public
router.get('/', blogController.getBlogs);

// POST /blogs - Protected
router.post('/', auth, blogController.createBlog);

module.exports = router;
