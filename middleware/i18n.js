const i18next = require('i18next');
const middleware = require('i18next-http-middleware');

// Initialize i18next with language detection and supported languages
i18next.use(middleware.LanguageDetector).init({
  fallbackLng: 'en',       // Default language if none detected
  preload: ['en', 'fr'],   // Preload English and French
});

// Export middleware to handle language detection per request
module.exports = middleware.handle(i18next);
