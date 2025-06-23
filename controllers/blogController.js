const Blog = require('../models/Blog');

// GET /blogs - Public: Fetch all blog posts, sorted from newest to oldest
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /blogs - Protected: Create a new blog post using the authenticated user's username
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      ...req.body,
      author: req.user.username // Automatically assigned from decoded JWT
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(400).json({ error: 'Invalid blog data' });
  }
};
