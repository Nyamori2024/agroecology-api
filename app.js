const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // ✅ Import helmet
require('dotenv').config();

const i18nMiddleware = require('./middleware/i18n');

const app = express();

// ✅ Use Helmet for basic security
app.use(helmet());

// Enable CORS for all origins
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use i18next middleware for multi-language support
app.use(i18nMiddleware);

// Route setup
app.use('/products', require('./routes/products'));
app.use('/outlets', require('./routes/outlets'));
app.use('/faqs', require('./routes/faqs'));
app.use('/blogs', require('./routes/blogs'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/ingest', require('./routes/ingest'));
app.use('/users', require('./routes/users'));

module.exports = app;
