const mongoose = require('mongoose');
const Book = require('../models/Book');

const books = [
    {
        isbn: '9781593279509',
        title: 'Eloquent JavaScript, Third Edition',
        author: 'Marijn Haverbeke',
        published: '2018-12-04T00:00:00.000Z',
        publisher: 'No Starch Press',
        pages: 472,
        description:
            'JavaScript lies at the heart of almost every modern web application...',
        website: 'https://eloquentjavascript.net/',
        coverUrl: 'https://eloquentjavascript.net/img/cover.jpg',
    },
    {
        isbn: '9781491943533',
        title: 'Practical Modern JavaScript',
        author: 'Nicolás Bevacqua',
        published: '2017-07-16T00:00:00.000Z',
        publisher: "O'Reilly Media",
        pages: 334,
        description:
            'To get the most out of modern JavaScript, you need learn the latest features...',
        website: 'https://github.com/mjavascript/practical-modern-javascript',
        coverUrl:
            'https://m.media-amazon.com/images/I/81LpyFBbo8L._SL1500_.jpg',
    },
    {
        isbn: '9781593277574',
        title: 'Understanding ECMAScript 6',
        author: 'Nicholas C. Zakas',
        published: '2016-09-03T00:00:00.000Z',
        publisher: 'No Starch Press',
        pages: 352,
        description:
            'ECMAScript 6 represents the biggest update to the core of JavaScript...',
        website: 'https://leanpub.com/understandinges6/read',
        coverUrl:
            'https://d2sofvawe08yqg.cloudfront.net/understandinges6/s_hero2x?1620418785',
    },
    {
        isbn: '9781449365035',
        title: 'Speaking JavaScript',
        author: 'Axel Rauschmayer',
        published: '2014-04-08T00:00:00.000Z',
        publisher: "O'Reilly Media",
        pages: 460,
        description:
            'JavaScript is everywhere these days — from browser to server to mobile...',
        website: 'https://speakingjs.com/',
        coverUrl: 'https://exploringjs.com/es5/index/speakingjs_cover.jpg',
    },
    {
        isbn: '9781449331818',
        title: 'Learning JavaScript Design Patterns',
        author: 'Addy Osmani',
        published: '2012-08-30T00:00:00.000Z',
        publisher: "O'Reilly Media",
        pages: 254,
        description:
            'Learn how to write beautiful, structured, and maintainable JavaScript...',
        website:
            'https://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
        coverUrl:
            'https://learning.oreilly.com/library/cover/9781484200766/250w/',
    },
    {
        isbn: '9798602477429',
        title: "You Don't Know JS Yet",
        author: 'Kyle Simpson',
        published: '2020-01-28T00:00:00.000Z',
        publisher: 'Independently published',
        pages: 143,
        description:
            'The worldwide bestselling JS book series is back for a 2nd edition...',
        website:
            'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started',
        coverUrl: 'https://m.media-amazon.com/images/I/813hbklwWBL._SY466_.jpg',
    },
    {
        isbn: '9781484200766',
        title: 'Pro Git',
        author: 'Scott Chacon and Ben Straub',
        published: '2014-11-18T00:00:00.000Z',
        publisher: 'Apress; 2nd edition',
        pages: 458,
        description:
            'Pro Git (Second Edition) is your fully-updated guide to Git and its usage...',
        website: 'https://git-scm.com/book/en/v2',
        coverUrl: 'https://git-scm.com/images/progit2.png',
    },
    {
        isbn: '9781484242216',
        title: 'Rethinking Productivity in Software Engineering',
        author: 'Caitlin Sadowski, Thomas Zimmermann',
        published: '2019-05-11T00:00:00.000Z',
        publisher: 'Apress',
        pages: 310,
        description:
            'Improve the productivity of your software teams. This open access book...',
        website: 'https://doi.org/10.1007/978-1-4842-4221-6',
        coverUrl:
            'https://media.springernature.com/w316/springer-static/cover-hires/book/978-1-4842-4221-6?as=webp',
    },
];

async function seedBooks() {
    try {
        for (const book of books) {
            const existing = await Book.findOne({ isbn: book.isbn });
            if (!existing) {
                await Book.create(book);
                console.log(`Added: ${book.title}`);
            } else {
                // Optional: update missing coverUrl
                const needsUpdate = !existing.coverUrl && book.coverUrl;
                if (needsUpdate) {
                    await Book.updateOne(
                        { isbn: book.isbn },
                        { coverUrl: book.coverUrl }
                    );
                    console.log(`Updated cover for: ${book.title}`);
                } else {
                    console.log(`Skipped (already exists): ${book.title}`);
                }
            }
        }
    } catch (err) {
        console.error('Seed error:', err);
        throw err;
    }
}

module.exports = seedBooks;
