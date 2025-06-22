const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /users/register - Public route for new user registration
router.post('/register', userController.register);

// POST /users/login - Public route for logging in a user
router.post('/login', userController.login);

module.exports = router;
