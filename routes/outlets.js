const express = require('express');
const router = express.Router();
const outletController = require('../controllers/outletController');

// GET /outlets
router.get('/', outletController.getOutlets);

module.exports = router;
