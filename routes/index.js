'use strict';

var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var router = express.Router();

// ==========
// AUTHENTICATING ROUTE
// ==========

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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
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
    req.logout()
    res.redirect("/")
});

router.get("*", (req, res) =>
    res.send("404")
);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = router;