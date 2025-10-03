if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const Listing = require("../models/listing.js");
const Category = require("../models/Category.js");
const User = require("../models/user.js");

// MongoDB connection
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = process.env.ATLASDB_URL;

// Enhanced sample data with realistic content
const categoryDataMap = {
  "Trending": {
    titles: ["Luxury Apartment", "Designer Studio", "Premium Suite", "Boutique Stay", "Executive Loft"],
    descriptions: [
      "Highly sought-after property with excellent reviews",
      "Popular choice among travelers for its amazing amenities",
      "Trending destination with stunning views and modern comforts"
    ],
    locations: ["Goa", "Mumbai", "Bangalore", "Delhi"],
    countries: ["India"],
    priceRange: { min: 4000, max: 8000 }
  },
  "Rooms": {
    titles: ["Cozy Private Room", "Comfortable Guest Room", "Spacious Bedroom", "Luxury Hotel Room"],
    descriptions: [
      "Perfect private room with all essential amenities",
      "Comfortable and clean room in a great location",
      "Well-appointed room with modern facilities"
    ],
    locations: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    countries: ["India"],
    priceRange: { min: 1500, max: 4000 }
  },
  "Iconic Cities": {
    titles: ["City Center Apartment", "Downtown Loft", "Urban Studio", "Metropolitan Suite"],
    descriptions: [
      "Located in the heart of the city with easy access to attractions",
      "Modern urban living with stunning city views",
      "Perfect base for exploring the city's iconic landmarks"
    ],
    locations: ["Paris", "New York", "London", "Tokyo", "Dubai"],
    countries: ["France", "USA", "UK", "Japan", "UAE"],
    priceRange: { min: 5000, max: 12000 }
  },
  "Mountains": {
    titles: ["Mountain View Cabin", "Alpine Retreat", "Hill Station Bungalow", "Mountain Lodge"],
    descriptions: [
      "Breathtaking mountain views from every window",
      "Peaceful retreat surrounded by nature",
      "Perfect getaway for mountain lovers and adventurers"
    ],
    locations: ["Manali", "Shimla", "Darjeeling", "Mussoorie"],
    countries: ["India"],
    priceRange: { min: 3000, max: 6000 }
  },
  "Castles": {
    titles: ["Royal Castle Suite", "Heritage Palace Room", "Historic Fort Stay", "Palace Chambers"],
    descriptions: [
      "Experience royal living in this historic property",
      "Luxurious accommodations in a magnificent castle",
      "Step back in time with modern comforts in a heritage property"
    ],
    locations: ["Udaipur", "Jaipur", "Jodhpur", "Mysore"],
    countries: ["India"],
    priceRange: { min: 7000, max: 15000 }
  },
  "Amazing Pools": {
    titles: ["Infinity Pool Villa", "Luxury Pool House", "Resort with Pool", "Private Pool Villa"],
    descriptions: [
      "Stunning infinity pool with panoramic views",
      "Luxury villa featuring a beautiful private pool",
      "Resort-style accommodation with amazing pool facilities"
    ],
    locations: ["Bali", "Phuket", "Goa", "Maldives"],
    countries: ["Indonesia", "Thailand", "India", "Maldives"],
    priceRange: { min: 8000, max: 20000 }
  },
  "Camping": {
    titles: ["Luxury Camp Tent", "Glamping Experience", "Nature Camp", "Adventure Camping"],
    descriptions: [
      "Comfortable camping experience with modern amenities",
      "Luxury glamping in the heart of nature",
      "Adventure camping with all necessary facilities"
    ],
    locations: ["Jaisalmer", "Rishikesh", "Ladakh", "Coorg"],
    countries: ["India"],
    priceRange: { min: 1500, max: 4000 }
  },
  "Farms": {
    titles: ["Organic Farm Stay", "Countryside Farmhouse", "Village Farm Experience", "Eco Farm Retreat"],
    descriptions: [
      "Authentic farm experience with organic produce",
      "Peaceful countryside living on a working farm",
      "Eco-friendly farm stay with sustainable practices"
    ],
    locations: ["Kerala", "Punjab", "Himachal", "Karnataka"],
    countries: ["India"],
    priceRange: { min: 1200, max: 3500 }
  }
};

// Generate realistic image URLs for each category
const generateImageUrl = (category, index) => {
  const imageMap = {
    "Trending": "luxury,apartment,modern",
    "Rooms": "hotel,bedroom,interior",
    "Iconic Cities": "city,urban,skyline",
    "Mountains": "mountain,cabin,nature",
    "Castles": "castle,palace,historic",
    "Amazing Pools": "pool,villa,luxury",
    "Camping": "camping,tent,nature",
    "Farms": "farm,countryside,rural"
  };
  
  const tags = imageMap[category] || "travel";
  return {
    filename: `listing_${category.toLowerCase()}_${index}`,
    url: `https://source.unsplash.com/800x600/?${tags}&sig=${index}`
  };
};

async function seedDB() {
  try {
    console.log("🌱 Starting database seeding...");
    
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Listing.deleteMany({});
    await Category.deleteMany({});
    console.log("✅ Existing data cleared");

    // Insert categories
    const categories = [
      { name: "Trending" },
      { name: "Rooms" },
      { name: "Iconic Cities" },
      { name: "Mountains" },
      { name: "Castles" },
      { name: "Amazing Pools" },
      { name: "Camping" },
      { name: "Farms" }
    ];
    
    const insertedCategories = await Category.insertMany(categories);
    console.log("✅ Categories initialized");

    // Find or create a default user for listings
    let defaultUser;
    try {
      defaultUser = await User.findOne({ username: "demoowner" });
      if (!defaultUser) {
        defaultUser = new User({
          username: "demoowner",
          email: "owner@airbnbclone.com"
        });
        await User.register(defaultUser, "demo123");
        console.log("✅ Default user created");
      }
    } catch (error) {
      console.log("⚠️ Using hardcoded owner ID");
      defaultUser = { _id: "67fe32ebd9223f8ab7c8b983" };
    }

    // Generate listings for each category
    const allListings = [];
    
    insertedCategories.forEach(category => {
      const categoryData = categoryDataMap[category.name];
      
      // Generate 6-8 listings per category
      const listingCount = Math.floor(Math.random() * 3) + 6;
      
      for (let i = 0; i < listingCount; i++) {
        const title = faker.helpers.arrayElement(categoryData.titles) + ` ${i + 1}`;
        const description = faker.helpers.arrayElement(categoryData.descriptions);
        const location = faker.helpers.arrayElement(categoryData.locations);
        const country = faker.helpers.arrayElement(categoryData.countries);
        const price = faker.number.int(categoryData.priceRange);
        
        const listing = {
          title: title,
          description: `${description}. ${faker.lorem.sentence()}`,
          image: generateImageUrl(category.name, i),
          price: price,
          location: location,
          country: country,
          category: category.name,
          owner: defaultUser._id,
          reviews: []
        };
        
        allListings.push(listing);
      }
    });

    // Insert all listings
    await Listing.insertMany(allListings);
    console.log(`✅ ${allListings.length} listings seeded successfully`);

    // Show summary
    const categoryCounts = await Listing.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📊 Seeding Summary:');
    categoryCounts.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} listings`);
    });

  } catch (err) {
    console.error("❌ Seeding error:", err);
    throw err;
  } finally {
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  }
}

// Only run if executed directly
if (require.main === module) {
  seedDB()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = seedDB;