if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const Listing = require("./models/listing.js");
const Category = require("./models/Category.js");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// DB connection
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = process.env.ATLASDB_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB connected"))
.catch(err => console.error(" MongoDB connection error:", err));

// Enhanced Auto-seed functionality
if (process.env.RESET_DB === "true") {
  console.log("🔄 RESET_DB=true, seeding database...");
  // Delay seeding to ensure DB connection is stable
  setTimeout(async () => {
    try {
      const seedDB = require("./seeds/seeds.js");
      await seedDB();
      console.log(" Database seeded successfully");
    } catch (error) {
      console.error(" Seeding failed:", error);
    }
  }, 3000);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(express.json());

// Session setup
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Admin seed route (optional - remove in production after use)
app.post("/admin/seed-database", async (req, res) => {
  // Basic protection - remove this route after seeding in production
  if (process.env.NODE_ENV === "production" && !req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  try {
    console.log("🔄 Manual seeding triggered via API...");
    const seedDB = require("./seeds/seeds.js");
    await seedDB();
    res.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error(" Seeding failed:", error);
    res.status(500).json({ error: "Seeding failed: " + error.message });
  }
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let{statusCode=500, message= "something went wrong!"} = err;
  res.status(statusCode).render("error.ejs", {err});
});

app.get("/map", (req, res) => {
  res.render("map"); // Assuming your file is views/map.ejs
});

// Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Server is listening on port ${PORT}`);
  console.log(`To seed database, run: npm run seed`);
  console.log(` Or set RESET_DB=true environment variable`);
});
