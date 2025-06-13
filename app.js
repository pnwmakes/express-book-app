const express = require('express');
const path = require('path');
const app = express();
const books = require('./book-data').books;

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';

    const filteredBooks = books.filter((book) => {
        const title = book.title?.toLowerCase() || '';
        const author = book.author?.toLowerCase() || '';
        const publisher = book.publisher?.toLowerCase() || '';
        return (
            title.includes(searchQuery) ||
            author.includes(searchQuery) ||
            publisher.includes(searchQuery)
        );
    });

    res.render('index', {
        books: filteredBooks,
        search: req.query.search || '',
    });
});

app.get('/book/:isbn', (req, res) => {
    const book = books.find((b) => b.isbn === req.params.isbn);
    if (!book) return res.status(404).send('Book not found');
    res.render('book-detail', { book });
});

app.get('/add-book', (req, res) => {
    res.render('add-book');
});

app.post('/add-book', (req, res) => {
    const { isbn, title, author } = req.body;
    if (!isbn || !title || !author) {
        return res.status(400).send('Missing required fields');
    }
    books.push({
        isbn,
        title,
        author,
        published: new Date().toISOString(),
        publisher: 'Unknown',
        pages: 0,
        description: '',
        website: '',
    });
    res.redirect('/');
});

app.post('/delete-book/:isbn', (req, res) => {
    const index = books.findIndex((book) => book.isbn === req.params.isbn);
    if (index !== -1) {
        books.splice(index, 1);
    }
    res.redirect('/');
});

app.get('/edit-book/:isbn', (req, res) => {
    const book = books.find((b) => b.isbn === req.params.isbn);
    if (!book) return res.status(404).send('Book not found');
    res.render('edit-book', { book });
});

app.post('/edit-book/:isbn', (req, res) => {
    const index = books.findIndex((b) => b.isbn === req.params.isbn);
    if (index === -1) return res.status(404).send('Book not found');

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).send('Missing required fields');
    }

    books[index].title = title;
    books[index].author = author;

    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));
