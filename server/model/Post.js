const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    detail: { type: String, required: true },
    title: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);