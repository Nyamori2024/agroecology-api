const Faq = require('../models/Faq');

// GET /faqs - Public: Returns localized FAQ content
exports.getFaqs = async (req, res) => {
  const lang = req.language || 'en'; // Default language fallback
  try {
    const faqs = await Faq.find();

    // Localize each question/answer per requested language
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
