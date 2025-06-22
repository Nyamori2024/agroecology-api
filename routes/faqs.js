const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// GET /faqs - Public route to retrieve FAQs, supports language localization
router.get('/', faqController.getFaqs);

module.exports = router;
