const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("./models/listing.js");
const Category = require("./models/Category.js");

const initCategoryData = require('./categories.js');


const MONGO_URL = process.env.MONGO_URI;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await initDB(); // run seeding after connection
    mongoose.connection.close(); // close after done
  } catch (err) {
    console.error(err);
  }
}
main();

const initDB = async () => {
  try {
    // Wipe existing data
    await Listing.deleteMany({});
    await Category.deleteMany({});

    // Insert categories
    await Category.insertMany(initCategoryData.data);
    console.log("Categories initialized");

    // Add owner to listings
    const listingsWithOwner = initData.data.map(obj => ({
      ...obj,
      owner: "67fe32ebd9223f8ab7c8b983"
    }));

    // Insert listings
    await Listing.insertMany(listingsWithOwner);
    console.log("Listings initialized");

    console.log("✅ Database seeding complete");
  } catch (err) {
    console.error("❌ Error seeding the database:", err);
  }
};


initDB();

