const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /products - Public route to fetch all localized products
router.get('/', productController.getProducts);

module.exports = router;
