// seeds.js
const categories = require('./init/categories');

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
    category: category
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

// Generate listings for all categories
const listings = categories.data.flatMap(cat => {
  const catName = cat.name;
  const data = categoryDataMap[catName];
  return generateListings(catName, data.baseTitle, data.baseDesc, data.baseUrl, data.basePrice, data.location, data.country);
});

module.exports = listings;
