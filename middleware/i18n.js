const i18next = require('i18next');
const middleware = require('i18next-http-middleware');

i18next.use(middleware.LanguageDetector).init({
  fallbackLng: 'en',
  preload: ['en', 'fr'],
});

module.exports = middleware.handle(i18next);