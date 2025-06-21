const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// GET /faqs
router.get('/', faqController.getFaqs);

module.exports = router;
