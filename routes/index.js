'use strict';

let express = require("express");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let User = require("../models/user");
let middleware = require('../middleware/index.js')
let router = express.Router();

// ==========
// AUTHENTICATING ROUTE
// ==========

router.get("/", function(req, res) {
    res.render("home");
});



// Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// Handeling user's signing up
router.post("/register", function(req, res) {
    req.body.username;
    req.body.password;
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err.message);
            req.flash('error', err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash('success', 'Welcome to Todo ' + user.username + '. ');
            res.redirect("/secret");
        });
    });
});

// Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// Login logic
// Middleware
router.post("/login", passport.authenticate("local", {

    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {});

// Logout
router.get("/logout", function(req, res) {
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect("/")
});

router.get("*", (req, res) =>
    res.send("404")
);


module.exports = router;