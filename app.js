'use strict';

// ==================================================
// SETUP
// ==================================================

var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash    = require('connect-flash'),
    // this handles req.body
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    task = require("./models/todo"),
    todoRoutes = require('./routes/todo'),
    indexRoutes = require('./routes/index'),
    app = express();


// ==================================================
// DATABASE
// ==================================================
// Setting up mongoose
mongoose.connect("mongodb://localhost/auth_todo_app");
// We dont have to write .ejs anymore
app.set("view engine", "ejs");

app.use(flash());

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Now we can use folder static for js and css
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    // this sentence is for decode and encode sessions
    secret: "TodoBakers is the best todo app ever.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this line is for sharing req.user for all routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    // move to next handler
    next();
});
app.use(todoRoutes)
app.use(indexRoutes)

// ==================================================
// SERVER
// ==================================================

app.listen(3000, () =>
    console.log('Example app listening on port 3000!')
);