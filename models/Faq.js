const mongoose = require('mongoose');

// Schema for multilingual FAQs
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
