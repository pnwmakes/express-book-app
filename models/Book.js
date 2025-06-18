const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    published: { type: Date, default: Date.now },
    publisher: { type: String, default: 'Unknown' },
    pages: { type: Number, default: 0 },
    description: { type: String, default: '' },
    website: { type: String, default: '' },
});

module.exports = mongoose.model('Book', bookSchema);
