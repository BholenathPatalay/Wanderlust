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

// Basic error class
class ExpressError extends Error {
  constructor(statusCode = 500, message = "Something went wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Connect to MongoDB
const MONGO_URL = process.env.ATLASDB_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// View engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session config
const sessionConfig = {
  secret: process.env.SECRET || "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  cookie: { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 7, maxAge: 1000 * 60 * 60 * 24 * 7 },
};
app.use(session(sessionConfig));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Root route with optional category filter
app.get("/", async (req, res) => {
  try {
    const categoryFilter = req.query.category || null;
    let query = {};
    if (categoryFilter) {
      const category = await Category.findOne({ name: categoryFilter });
      if (category) query.category = category._id;
    }

    const listings = await Listing.find(query).populate("category");
    const categories = await Category.find({});
    res.render("listings", { listings, categories, selectedCategory: categoryFilter });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch listings");
  }
});

// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (res.headersSent) return next(err);
  res.status(statusCode).send(err.message || "Something went wrong");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🌍 Wanderlust API running on port ${PORT}`));

module.exports = app;
