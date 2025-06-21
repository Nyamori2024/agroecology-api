const express = require('express');
const cors = require('cors');
require('dotenv').config();

const i18nMiddleware = require('./middleware/i18n');

const app = express();
app.use(cors());
app.use(express.json());
app.use(i18nMiddleware);

// Routes
app.use('/products', require('./routes/products'));
app.use('/outlets', require('./routes/outlets'));
app.use('/faqs', require('./routes/faqs'));
app.use('/blogs', require('./routes/blogs'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/ingest', require('./routes/ingest'));
app.use('/users', require('./routes/users'));

module.exports = app;
