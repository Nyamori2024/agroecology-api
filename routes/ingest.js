const express = require('express');
const multer = require('multer');
const router = express.Router();
const ingestController = require('../controllers/ingestController');

// Configure multer to upload JSON files to 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

// POST /ingest/:type - Ingest JSON data for products, faqs, outlets, or blogs
router.post('/:type', upload.single('file'), ingestController.ingestData);

module.exports = router;
