const User = require("../models/user");
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            req.flash("error", "All fields are required");
            return res.redirect("/signup");
        }
  
        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            req.flash("error", "Username or email already exists");
            return res.redirect("/signup");
        }
  
        // Create and register new user
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        
        // Auto-login after registration
        req.login(registeredUser, (err) => {
            if (err) {
                req.flash("error", "Auto-login failed, please login manually");
                return res.redirect("/login");
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (err) {
        console.error("Registration error:", err);
        req.flash("error", "Registration failed - please try again");
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};