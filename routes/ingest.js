const express = require('express');
const multer = require('multer');
const router = express.Router();
const ingestController = require('../controllers/ingestController');

const upload = multer({ dest: 'uploads/' });

// POST /ingest/:type - Upload JSON data
router.post('/:type', upload.single('file'), ingestController.ingestData);

module.exports = router;
