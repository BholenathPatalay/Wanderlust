const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const { signup, renderSignup, renderLoginForm, login, logout } = require("../controllers/users");

router
    .route("/signup")
    .get(renderSignup)
    .post(wrapasync(signup))

router
    .route("/login")
    .get(renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", { 
        failureRedirect: '/login',
        failureFlash: true,
    }), 
        login,
    );

router.get("/logout", logout);

module.exports = router;