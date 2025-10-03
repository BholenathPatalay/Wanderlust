if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Category = require("./models/Category.js");
const categories = require("./init/categories");

// MongoDB connection
const MONGO_URL = process.env.ATLASDB_URL;

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB for seeding");

    // Clear existing data
    await Listing.deleteMany({});
    await Category.deleteMany({});
    console.log("Existing data cleared");

    // Insert categories
    const insertedCategories = await Category.insertMany(categories.data);
    console.log("Categories initialized");

    // Map category name -> ObjectId
    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Sample data per category
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

    // Function to generate listings
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
        owner: "67fe32ebd9223f8ab7c8b983"
      }));
    }

    // Generate listings for all categories
    const listings = categories.data.flatMap(cat => {
      const catName = cat.name;
      const data = categoryDataMap[catName];
      return generateListings(categoryMap[catName], data);
    });

    await Listing.insertMany(listings);
    console.log(" Listings seeded successfully");

  } catch (err) {
    console.error(" Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Only run if executed directly
if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
