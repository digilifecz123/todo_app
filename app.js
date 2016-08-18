'use strict';

// ==================================================
// SETUP
// ==================================================

const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const flash = require('connect-flash')
    // this handles req.body
const bodyParser = require("body-parser")
const LocalStrategy = require("passport-local")
const methodOverride = require("method-override")
const User = require("./models/user")
const task = require("./models/todo")
const todoRoutes = require('./routes/todo')
const indexRoutes = require('./routes/index')
const app = express();
const port = process.env.PORT || 3000;


// ==================================================
// DATABASE
// ==================================================
// Setting up mongoose
let url = process.env.DATABASEURL || 'mongodb://localhost/ntodoappnodejs';
mongoose.connect(url);
// We dont have to write .ejs anymore
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Now we can use folder static for js and css
app.use(express.static(`${__dirname}/public`));
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

app.listen(port, () =>
    console.log(`Example app listening on port ${port} !`)
);