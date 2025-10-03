// seeds.js

function generateListings(category, baseTitle, baseDesc, baseUrl, basePrice, location, country) {
  return Array.from({ length: 15 }).map((_, i) => ({
    title: `${baseTitle} ${i + 1}`,
    description: `${baseDesc} (Sample ${i + 1})`,
    image: {
      filename: `${category.toLowerCase()}${i + 1}`,
      url: `${baseUrl}&sig=${i + 1}`
    },
    price: basePrice + (i * 300),
    location: location,
    country: country,
    category: category
  }));
}

module.exports = [
  ...generateListings("Villa", "Cozy Beachfront Villa", "A peaceful villa with sea view and private beach access", "https://source.unsplash.com/800x600/?beach,villa", 4500, "Goa", "India"),
  ...generateListings("Cabin", "Mountain Retreat", "Cabin surrounded by pine forests with a stunning mountain view", "https://source.unsplash.com/800x600/?mountain,cabin", 3500, "Manali", "India"),
  ...generateListings("Camping", "Desert Safari Camp", "Luxury tent with cultural shows and camel rides in the desert", "https://source.unsplash.com/800x600/?desert,tent", 2800, "Jaisalmer", "India"),
  ...generateListings("Apartment", "City Apartment", "Modern apartment in the heart of the city with skyline views", "https://source.unsplash.com/800x600/?apartment,city", 5200, "Mumbai", "India"),
  ...generateListings("Houseboat", "Houseboat Stay", "Traditional houseboat in the backwaters with authentic cuisine", "https://source.unsplash.com/800x600/?houseboat,kerala", 4000, "Alleppey", "India"),
  ...generateListings("Castle", "Royal Palace Room", "Live like royalty in a heritage palace with traditional decor", "https://source.unsplash.com/800x600/?palace,heritage", 7000, "Udaipur", "India"),
  ...generateListings("Treehouse", "Forest Treehouse", "Unique stay in a treehouse surrounded by lush greenery", "https://source.unsplash.com/800x600/?treehouse,forest", 3200, "Wayanad", "India"),
  ...generateListings("Homestay", "Himalayan Homestay", "Experience village life with breathtaking views of the Himalayas", "https://source.unsplash.com/800x600/?himalaya,homestay", 2600, "Leh", "India"),
  ...generateListings("Hut", "Beach Hut", "Simple yet charming hut right by the sea for budget travelers", "https://source.unsplash.com/800x600/?beach,hut", 1500, "Gokarna", "India"),
  ...generateListings("Penthouse", "Luxury Penthouse", "Top-floor penthouse with private pool and rooftop garden", "https://source.unsplash.com/800x600/?penthouse,luxury", 15000, "Dubai", "UAE"),
  ...generateListings("Cabin", "Snow Cabin", "Warm cabin in the snowy Alps with fireplace and ski access", "https://source.unsplash.com/800x600/?snow,cabin", 9000, "Swiss Alps", "Switzerland"),
  ...generateListings("Capsule", "Tokyo Capsule Stay", "Futuristic capsule hotel in downtown Tokyo", "https://source.unsplash.com/800x600/?capsule,hotel", 3000, "Tokyo", "Japan"),
  ...generateListings("Cave House", "Santorini Cave House", "Traditional white cave house with blue dome views", "https://source.unsplash.com/800x600/?santorini,house", 12000, "Santorini", "Greece"),
  ...generateListings("Loft", "New York Loft", "Trendy loft in Manhattan with brick walls and modern decor", "https://source.unsplash.com/800x600/?loft,newyork", 18000, "New York", "USA"),
  ...generateListings("Apartment", "Parisian Apartment", "Charming apartment with Eiffel Tower view", "https://source.unsplash.com/800x600/?paris,apartment", 16000, "Paris", "France")
];
