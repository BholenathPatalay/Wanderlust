if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const Listing = require("./models/listing");
const Category = require("./models/Category");

// Error class
class ExpressError extends Error {
  constructor(statusCode = 500, message = "Something went wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// MongoDB connection
mongoose.connect(process.env.ATLASDB_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

// View engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session config
const store = MongoStore.create({ mongoUrl: process.env.ATLASDB_URL });
const sessionConfig = {
  secret: process.env.SECRET || "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  store,
  cookie: { httpOnly: true, expires: Date.now() + 1000*60*60*24*7, maxAge: 1000*60*60*24*7 }
};
app.use(session(sessionConfig));
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & user middleware
app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ========================
// ROUTES
// ========================

// Home / Listings page with filters + search + pagination
app.get("/", async (req,res)=>{
  try {
    const { category, search, minPrice, maxPrice, page=1 } = req.query;
    const limit = 12;
    let query = {};

    if(category){
      const cat = await Category.findOne({ name: category });
      if(cat) query.category = cat._id;
    }

    if(search){
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    if(minPrice || maxPrice){
      query.price = {};
      if(minPrice) query.price.$gte = Number(minPrice);
      if(maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page-1)*limit;
    const total = await Listing.countDocuments(query);
    const totalPages = Math.ceil(total/limit);

    const allListings = await Listing.find(query).populate("category").skip(skip).limit(limit);
    const categories = await Category.find({});

    res.render("listings", { allListings, categories, selectedCategory: category||null, search: search||"", minPrice: minPrice||"", maxPrice: maxPrice||"", page: Number(page), totalPages });
  } catch(err){
    console.error(err);
    res.status(500).send("Failed to fetch listings");
  }
});

// Listing detail page
app.get("/listings/:id", async (req,res)=>{
  try{
    const listing = await Listing.findById(req.params.id).populate("category");
    if(!listing) throw new ExpressError(404,"Listing not found");
    res.render("listingDetail",{ listing });
  }catch(err){
    console.error(err);
    res.status(err.statusCode || 500).send(err.message || "Something went wrong");
  }
});

// Login/Register routes (example)
app.get("/login",(req,res)=>{ res.render("auth/login") });
app.get("/register",(req,res)=>{ res.render("auth/register") });

// 404 handler
app.use((req,res,next)=>next(new ExpressError(404,"Page Not Found")));

// Error handler
app.use((err,req,res,next)=>{
  const { statusCode=500 } = err;
  if(res.headersSent) return next(err);
  res.status(statusCode).send(err.message || "Something went wrong");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`🌍 Wanderlust API running on port ${PORT}`));

module.exports = app;
