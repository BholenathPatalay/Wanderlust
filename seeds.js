// seeds.js
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Category = require("../models/Category.js");
const categories = require("./init/categories");

// Environment variable for MongoDB connection
const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wanderlust";

// Function to generate sample listings for a category
function generateListings(category, baseTitle, baseDesc, baseUrl, basePrice, location, country) {
  return Array.from({ length: 10 }).map((_, i) => ({
    title: `${baseTitle} ${i + 1}`,
    description: `${baseDesc} (Sample ${i + 1})`,
    image: {
      filename: `${category.toLowerCase().replace(/\s+/g, '')}${i + 1}`,
      url: `${baseUrl}&sig=${i + 1}`
    },
    price: basePrice + i * 200,
    location: location,
    country: country,
    category: category,
    owner: "67fe32ebd9223f8ab7c8b983" // example owner ID, change if needed
  }));
}

// Mapping of categories to sample data
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

// Function to seed the database
const seedDB = async () => {
  try {
    // Delete existing data
    await Listing.deleteMany({});
    await Category.deleteMany({});

    console.log("Existing data cleared");

    // Insert categories
    await Category.insertMany(categories.data);
    console.log("Categories initialized");

    // Generate listings for all categories
    const listings = categories.data.flatMap(cat => {
      const catName = cat.name;
      const data = categoryDataMap[catName];
      return generateListings(catName, data.baseTitle, data.baseDesc, data.baseUrl, data.basePrice, data.location, data.country);
    });

    // Insert listings
    await Listing.insertMany(listings);
    console.log("Listings initialized");

    console.log("✅ Database seeding complete");
  } catch (err) {
    console.error("❌ Error seeding the database:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to MongoDB and run seeding
const main = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    await seedDB();
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

main();
