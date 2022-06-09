const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  source: { type: String, required: false },
  author: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  content: { type: String, required: false },
  urlToImage: { type: String, required: false },
  url: { type: String, required: false },
  publishedAt: { type: Date, default: Date.now },
  savedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Article", articleSchema);
