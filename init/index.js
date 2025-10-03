/**
 * Seed script: connects to MongoDB, seeds categories and listings.
 * Usage: NODE_ENV=seed node init/index.js
 * Requires process.env.MONGO_URI (Atlas connection string).
 */

const mongoose = require('mongoose');
const Listing = require('../models/listing');
const Category = require('../models/Category');
const User = require('../models/user');
const initCategoryData = require('./categories');
const initListings = require('./data');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/wanderlust_dev';

async function initDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Category.deleteMany({});
    await Listing.deleteMany({});
    await User.deleteMany({});
    console.log('Existing collections cleared');

    // Insert categories
    const categories = await Category.insertMany(initCategoryData.data);
    console.log(`Inserted ${categories.length} categories`);

    // helper to find category _id by name (case-insensitive)
    const findCategoryId = (name) => {
      if (!name) return null;
      const found = categories.find(c => c.name.toLowerCase() === String(name).toLowerCase());
      return found ? found._id : null;
    };

    // Create a dummy user as owner for listings
    const owner = new User({ username: 'seeduser', email: 'seed@example.com' });
    await User.register(owner, 'password123');
    console.log('Created seed user');

    // Prepare listings
    const listingsPrepared = initListings.map(item => {
      const catId =
        findCategoryId(item.category) ||
        findCategoryId(item.category?.replace(/s$/i, '')) ||
        null;

      return {
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        location: item.location,
        country: item.country,
        category: catId,
        owner: owner._id
      };
    });

    await Listing.insertMany(listingsPrepared);
    console.log(`Inserted ${listingsPrepared.length} listings`);

    console.log('🎉 Seeding finished');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

initDB();
