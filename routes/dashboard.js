const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET /dashboard - Returns metrics: total users, products, and blog contributors
router.get('/', dashboardController.getDashboard);

module.exports = router;
