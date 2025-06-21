const mongoose = require('mongoose');
const FaqSchema = new mongoose.Schema({
  question: {
    en: { type: String, required: true },
    fr: { type: String, required: true }
  },
  answer: {
    en: { type: String, required: true },
    fr: { type: String, required: true }
  }
});
module.exports = mongoose.model('Faq', FaqSchema);