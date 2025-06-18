require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error(' MongoDB connection error:', err));

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';
    try {
        let books = await Book.find();
        if (searchQuery) {
            books = books.filter((book) => {
                const title = book.title?.toLowerCase() || '';
                const author = book.author?.toLowerCase() || '';
                const publisher = book.publisher?.toLowerCase() || '';
                return (
                    title.includes(searchQuery) ||
                    author.includes(searchQuery) ||
                    publisher.includes(searchQuery)
                );
            });
        }
        res.render('index', { books, search: req.query.search || '' });
    } catch (err) {
        res.status(500).send('Error fetching books');
    }
});

app.get('/book/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) return res.status(404).send('Book not found');
        res.render('book-detail', { book });
    } catch (err) {
        res.status(500).send('Error retrieving book');
    }
});

app.get('/add-book', (req, res) => {
    res.render('add-book');
});

app.post('/add-book', async (req, res) => {
    const { isbn, title, author } = req.body;
    if (!isbn || !title || !author) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const newBook = new Book({
            isbn,
            title,
            author,
        });

        await newBook.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error adding book');
    }
});

app.post('/delete-book/:isbn', async (req, res) => {
    try {
        await Book.findOneAndDelete({ isbn: req.params.isbn });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting book');
    }
});

app.get('/edit-book/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) return res.status(404).send('Book not found');
        res.render('edit-book', { book });
    } catch (err) {
        res.status(500).send('Error loading edit form');
    }
});

app.post('/edit-book/:isbn', async (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await Book.findOneAndUpdate(
            { isbn: req.params.isbn },
            { title, author }
        );
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error updating book');
    }
});

app.listen(3000, () => console.log(' Server running on http://localhost:3000'));
