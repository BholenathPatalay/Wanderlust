const sampleListings = [
  {
    "title": "Cozy Beachfront Cottage",
    "description": "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1500,
    "location": "Malibu",
    "country": "United States",
    "category": "Beachfront"
  },
  {
    "title": "Modern Loft in Downtown",
    "description": "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1200,
    "location": "New York City",
    "country": "United States",
    "category": "Urban"
  },
  {
    "title": "Mountain Retreat",
    "description": "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1000,
    "location": "Aspen",
    "country": "United States",
    "category": "Mountain"
  },
  {
    "title": "Historic Villa in Tuscany",
    "description": "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 2500,
    "location": "Florence",
    "country": "Italy",
    "category": "Historic"
  },
  {
    "title": "Secluded Treehouse Getaway",
    "description": "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 800,
    "location": "Portland",
    "country": "United States",
    "category": "Nature"
  },
  {
    "title": "Beachfront Paradise",
    "description": "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 2000,
    "location": "Cancun",
    "country": "Mexico",
    "category": "Beachfront"
  },
  {
    "title": "Rustic Cabin by the Lake",
    "description": "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 900,
    "location": "Lake Tahoe",
    "country": "United States",
    "category": "Lakefront"
  },
  {
    "title": "Luxury Penthouse with City Views",
    "description": "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 3500,
    "location": "Los Angeles",
    "country": "United States",
    "category": "Luxury"
  },
  {
    "title": "Ski-In/Ski-Out Chalet",
    "description": "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 3000,
    "location": "Verbier",
    "country": "Switzerland",
    "category": "Ski"
  },
  {
    "title": "Safari Lodge in the Serengeti",
    "description": "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    },
    "price": 4000,
    "location": "Serengeti National Park",
    "country": "Tanzania",
    "category": "Safari"
  },
  {
    "title": "Historic Canal House",
    "description": "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 1800,
    "location": "Amsterdam",
    "country": "Netherlands",
    "category": "Historic"
  },
  {
    "title": "Private Island Retreat",
    "description": "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    },
    "price": 10000,
    "location": "Maldives",
    "country": "Maldives",
    "category": "Luxury"
  },
    {
    title: "Modern Beach House in Malibu",
    description: "Oceanfront property with floor-to-ceiling windows",
    image: {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      filename: "malibu-beach-house.jpg"
    },
    price: 650,
    location: "Malibu",
    country: "USA",
    category: "Amazing Pools"
  },
  {
    title: "Charming Cottage in Cotswolds",
    description: "Quintessential English countryside retreat",
    image: {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      filename: "cotswolds-cottage.jpg"
    },
    price: 210,
    location: "Cotswolds",
    country: "UK",
    category: "Farms"
  },
  {
    title: "Luxury Apartment in Singapore",
    description: "High-rise living with panoramic city views",
    image: {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      filename: "singapore-apartment.jpg"
    },
    price: 290,
    location: "Singapore",
    country: "Singapore",
    category: "Iconic Cities"
  },
  {
    title: "Mountain View Chalet in Austria",
    description: "Traditional alpine chalet with modern comforts",
    image: {
      url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      filename: "austria-chalet.jpg"
    },
    price: 230,
    location: "Innsbruck",
    country: "Austria",
    category: "Mountains"
  },
  {
    title: "Historic Tower in Tuscany",
    description: "Converted medieval tower with rustic charm",
    image: {
      url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
      filename: "tuscany-tower.jpg"
    },
    price: 310,
    location: "Siena",
    country: "Italy",
    category: "Castles"
  },
  {
    title: "Desert Retreat in Arizona",
    description: "Minimalist home with stunning desert landscape",
    image: {
      url: "https://images.unsplash.com/photo-1600566752227-8f2324faf530",
      filename: "arizona-retreat.jpg"
    },
    price: 195,
    location: "Sedona",
    country: "USA",
    category: "Trending"
  },
  {
    title: "Houseboat in Amsterdam",
    description: "Unique floating home on the canals",
    image: {
      url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      filename: "amsterdam-houseboat.jpg"
    },
    price: 175,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Iconic Cities"
  },
  {
    title: "Cliffside Retreat in Big Sur",
    description: "Dramatic ocean views from every room",
    image: {
      url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
      filename: "big-sur-retreat.jpg"
    },
    price: 420,
    location: "Big Sur",
    country: "USA",
    category: "Trending"
  },
  {
    title: "Traditional Ryokan in Kyoto",
    description: "Authentic Japanese inn with onsen baths",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      filename: "kyoto-ryokan.jpg"
    },
    price: 240,
    location: "Kyoto",
    country: "Japan",
    category: "Rooms"
  },
  {
    title: "Luxury Villa in St. Barts",
    description: "Private villa with Caribbean sea views",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      filename: "st-barts-villa.jpg"
    },
    price: 850,
    location: "Gustavia",
    country: "St. Barts",
    category: "Amazing Pools"
  },
  {
    title: "Treehouse in the Amazon",
    description: "Eco-lodge deep in the rainforest",
    image: {
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      filename: "amazon-treehouse.jpg"
    },
    price: 160,
    location: "Manaus",
    country: "Brazil",
    category: "Camping"
  },
  {
    title: "Chateau in the Loire Valley",
    description: "Renaissance-era castle with vineyards",
    image: {
      url: "https://images.unsplash.com/photo-1589998059171-988d887df646",
      filename: "loire-chateau.jpg"
    },
    price: 520,
    location: "Loire Valley",
    country: "France",
    category: "Castles"
  },
  {
    title: "Modern Farmhouse in Australia",
    description: "Sleek design meets rural charm",
    image: {
      url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
      filename: "australia-farmhouse.jpg"
    },
    price: 220,
    location: "Byron Bay",
    country: "Australia",
    category: "Farms"
  },
  {
    title: "Ice Hotel in Sweden",
    description: "Unique accommodation carved from ice",
    image: {
      url: "https://images.unsplash.com/photo-1517825738774-7de9363ef735",
      filename: "sweden-ice-hotel.jpg"
    },
    price: 380,
    location: "Jukkasjärvi",
    country: "Sweden",
    category: "Trending"
  },
  {
    title: "Penthouse in Hong Kong",
    description: "Sky-high living with harbor views",
    image: {
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      filename: "hong-kong-penthouse.jpg"
    },
    price: 480,
    location: "Hong Kong",
    country: "China",
    category: "Iconic Cities"
  },
  {
    title: "Cave House in Santorini",
    description: "Traditional carved cave dwelling",
    image: {
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
      filename: "santorini-cave.jpg"
    },
    price: 270,
    location: "Oia",
    country: "Greece",
    category: "Trending"
  },
  {
    title: "Ski Chalet in Whistler",
    description: "Slope-side luxury with hot tub",
    image: {
      url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5",
      filename: "whistler-chalet.jpg"
    },
    price: 390,
    location: "Whistler",
    country: "Canada",
    category: "Mountains"
  },
  {
    title: "Floating Cabin in Norway",
    description: "Minimalist cabin on the fjords",
    image: {
      url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
      filename: "norway-cabin.jpg"
    },
    price: 230,
    location: "Bergen",
    country: "Norway",
    category: "Trending"
  },
  {
    title: "Lighthouse Keepers Cottage",
    description: "Historic coastal retreat",
    image: {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      filename: "lighthouse-cottage.jpg"
    },
    price: 180,
    location: "Maine",
    country: "USA",
    category: "Trending"
  },
  {
    title: "Villa in Provence",
    description: "Lavender fields surround this country home",
    image: {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      filename: "provence-villa.jpg"
    },
    price: 260,
    location: "Provence",
    country: "France",
    category: "Farms"
  },
  {
    title: "Modern Treehouse in Costa Rica",
    description: "Architectural marvel in the jungle",
    image: {
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
      filename: "costa-rica-modern-treehouse.jpg"
    },
    price: 320,
    location: "Manuel Antonio",
    country: "Costa Rica",
    category: "Trending"
  },
  {
    title: "Boutique Hotel Room in Marrakech",
    description: "Luxurious riad in the medina",
    image: {
      url: "https://images.unsplash.com/photo-1517825738774-7de9363ef735",
      filename: "marrakech-riad.jpg"
    },
    price: 150,
    location: "Marrakech",
    country: "Morocco",
    category: "Rooms"
  },
  {
    title: "Waterfront Cottage in New Zealand",
    description: "Secluded retreat with lake access",
    image: {
      url: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
      filename: "nz-cottage.jpg"
    },
    price: 190,
    location: "Queenstown",
    country: "New Zealand",
    category: "Mountains"
  },
  {
    title: "Historic Palace in Rajasthan",
    description: "Former royal residence with pool",
    image: {
      url: "https://images.unsplash.com/photo-1589998059171-988d887df646",
      filename: "rajasthan-palace.jpg"
    },
    price: 410,
    location: "Udaipur",
    country: "India",
    category: "Castles"
  },
  {
    title: "Glass Cabin in Finland",
    description: "Aurora viewing from your bed",
    image: {
      url: "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
      filename: "finland-glass-cabin.jpg"
    },
    price: 340,
    location: "Rovaniemi",
    country: "Finland",
    category: "Trending"
  },
  {
    title: "Surf Shack in Portugal",
    description: "Steps from the best surf breaks",
    image: {
      url: "https://images.unsplash.com/photo-1600566752227-8f2324faf530",
      filename: "portugal-surf-shack.jpg"
    },
    price: 120,
    location: "Peniche",
    country: "Portugal",
    category: "Trending"
  },
  {
    title: "Luxury Tent in Joshua Tree",
    description: "Stargazing in the desert",
    image: {
      url: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77",
      filename: "joshua-tree-tent.jpg"
    },
    price: 210,
    location: "Joshua Tree",
    country: "USA",
    category: "Camping"
  },
  {
    title: "Artist's Loft in Berlin",
    description: "Industrial-chic creative space",
    image: {
      url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
      filename: "berlin-loft.jpg"
    },
    price: 135,
    location: "Berlin",
    country: "Germany",
    category: "Rooms"
  },
  {
    title: "Villa with Infinity Pool in Mykonos",
    description: "Whitewashed luxury with Aegean views",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      filename: "mykonos-villa.jpg"
    },
    price: 580,
    location: "Mykonos",
    country: "Greece",
    category: "Amazing Pools"
  },
  {
    title: "Converted Barn in Vermont",
    description: "Rustic charm with modern amenities",
    image: {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      filename: "vermont-barn.jpg"
    },
    price: 175,
    location: "Burlington",
    country: "USA",
    category: "Farms"
  }
];



module.exports = { data: sampleListings};