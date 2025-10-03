// postDeploySeedSafe.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Category = require("./models/Category.js");
const categories = require("./init/categories");

const MONGO_URL = process.env.ATLASDB_URL;

const categoryDataMap = {
  "Trending": {
    baseTitle: "Trending Stay",
    baseDesc: "Popular listing attracting lots of travelers",
    baseUrl: "https://source.unsplash.com/800x600/?trending,travel",
    basePrice: 4000,
    location: "Goa",
    country: "India"
  },
  "Rooms": {
    baseTitle: "Cozy Room",
    baseDesc: "Comfortable room with modern amenities",
    baseUrl: "https://source.unsplash.com/800x600/?room,interior",
    basePrice: 2500,
    location: "Mumbai",
    country: "India"
  },
  "Iconic Cities": {
    baseTitle: "City Apartment",
    baseDesc: "Stay in the heart of an iconic city",
    baseUrl: "https://source.unsplash.com/800x600/?city,apartment",
    basePrice: 5000,
    location: "Paris",
    country: "France"
  },
  "Mountains": {
    baseTitle: "Mountain Cabin",
    baseDesc: "Peaceful cabin with breathtaking mountain views",
    baseUrl: "https://source.unsplash.com/800x600/?mountain,cabin",
    basePrice: 3500,
    location: "Manali",
    country: "India"
  },
  "Castles": {
    baseTitle: "Royal Castle Room",
    baseDesc: "Experience royalty in a historic castle",
    baseUrl: "https://source.unsplash.com/800x600/?castle,heritage",
    basePrice: 7000,
    location: "Udaipur",
    country: "India"
  },
  "Amazing Pools": {
    baseTitle: "Poolside Villa",
    baseDesc: "Luxury villa with stunning private pool",
    baseUrl: "https://source.unsplash.com/800x600/?pool,villa",
    basePrice: 8000,
    location: "Bali",
    country: "Indonesia"
  },
  "Camping": {
    baseTitle: "Camping Tent",
    baseDesc: "Enjoy nature with comfortable camping",
    baseUrl: "https://source.unsplash.com/800x600/?camping,tent",
    basePrice: 2000,
    location: "Jaisalmer",
    country: "India"
  },
  "Farms": {
    baseTitle: "Farm Stay",
    baseDesc: "Experience farm life with scenic views",
    baseUrl: "https://source.unsplash.com/800x600/?farm,nature",
    basePrice: 1800,
    location: "Kerala",
    country: "India"
  }
};

// Helper to generate listings
function generateListings(categoryId, data) {
  return Array.from({ length: 10 }).map((_, i) => ({
    title: `${data.baseTitle} ${i + 1}`,
    description: `${data.baseDesc} (Sample ${i + 1})`,
    image: {
      filename: `${data.baseUrl.split("?")[1] || 'image'}${i + 1}`,
      url: `${data.baseUrl}&sig=${i + 1}`
    },
    price: data.basePrice + i * 200,
    location: data.location,
    country: data.country,
    category: categoryId,
    owner: "67fe32ebd9223f8ab7c8b983" // make sure this exists
  }));
}

async function safeSeed() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB for safe seeding");

    // Create categories if missing
    for (const cat of categories.data) {
      const existingCat = await Category.findOne({ name: cat.name });
      if (!existingCat) {
        const newCat = await Category.create(cat);
        console.log(`🟢 Category created: ${cat.name}`);
      } else {
        console.log(`⚪ Category exists: ${cat.name}`);
      }
    }

    // Map category names to IDs
    const allCategories = await Category.find({});
    const categoryMap = {};
    allCategories.forEach(cat => (categoryMap[cat.name] = cat._id));

    // Create listings per category if none exist
    for (const cat of categories.data) {
      const existingListings = await Listing.countDocuments({ category: categoryMap[cat.name] });
      if (existingListings === 0) {
        const data = categoryDataMap[cat.name];
        if (!data) {
          console.warn(`⚠️ No listing seed data for category: ${cat.name}`);
          continue;
        }

        const listings = generateListings(categoryMap[cat.name], data);
        await Listing.insertMany(listings);
        console.log(`🟢 Listings seeded for category: ${cat.name}`);
      } else {
        console.log(`⚪ Listings already exist for category: ${cat.name}`);
      }
    }

  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("✅ MongoDB connection closed");
  }
}

// Run if executed directly
if (require.main === module) {
  safeSeed();
}

module.exports = safeSeed;
