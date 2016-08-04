'use strict';

var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("../models/user");
var middleware = require('../middleware/index.js')
var router = express.Router();

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