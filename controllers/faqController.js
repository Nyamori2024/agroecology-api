const Faq = require('../models/Faq');

// GET /faqs
exports.getFaqs = async (req, res) => {
  const lang = req.language || 'en';
  try {
    const faqs = await Faq.find();
    const localized = faqs.map(faq => ({
      question: faq.question[lang] || faq.question['en'],
      answer: faq.answer[lang] || faq.answer['en'],
    }));
    res.json(localized);
  } catch (err) {
    console.error('FAQ error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
