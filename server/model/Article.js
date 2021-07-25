const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  source: { type: String, required: true },
  author: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now },
  savedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Article', articleSchema);