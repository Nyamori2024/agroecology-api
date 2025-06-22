const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outletController');

// GET /outlets - Public route to retrieve outlet locations and categories
router.get('/', outletController.getOutlets);

module.exports = router;
