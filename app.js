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

// Basic error class
class ExpressError extends Error {
  constructor(statusCode = 500, message = "Something went wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Connect to MongoDB
const MONGO_URL =
 process.env.ATLASDB_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Mongo connection error:", err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// basic home route
app.get("/", (req, res) => {
  res.send("Wanderlust API running 🚀");
});

// 404 handler (must be last route before error handler)
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (res.headersSent) return next(err);
  res.status(statusCode).send(err.message || "Something went wrong");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🌍 Server listening on port ${PORT}`);
});

module.exports = app;
