require('dotenv').config();
const mongoose = require('mongoose');
const seedBooks = require('./seed-books');

async function runSeed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await seedBooks();
        console.log('✅ Seed complete');
        process.exit();
    } catch (err) {
        console.error(' Seed error:', err);
        process.exit(1);
    }
}

runSeed();
