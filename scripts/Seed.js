require('dotenv').config();
const mongoose = require('mongoose');
const seedBooks = require('./seed-books');

async function runSeed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await seedBooks();
        console.log('✅ Seed complete');
    } catch (err) {
        console.error('❌ Seed error:', err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

runSeed();
