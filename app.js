// ==================================================
// SETUP
// ==================================================

var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    User                    = require("./models/user"),
    Todo                    = require("./models/todo"),
    app                     = express();


// ==================================================
// DATABASE
// ==================================================
// Setting up mongoose
mongoose.connect("mongodb://localhost/auth_todo_app");
// We dont have to write .ejs anymore
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
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
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // move to next handler
    next();
});


// ==================================================
// ROUTES
// ==================================================
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
  Todo.find({}, function(err, Todos) {
    if (err) {
      console.log(err);
    } else {
      res.render("secret", {
        currentUser: req.user,
        Todos: Todos
      });
    }
  });
});

// Delete a taks
app.delete("/secret/:id", function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/secret");
    } else {
      res.redirect("/secret");
    }
  });
});

// Create a new task
app.post("/secret", function(req, res) {
  // create Todo
  Todo.create(req.body.Todo, function(err) {
    if (err) {
      console.log("error");
    } else {
      res.redirect("/secret");
    }
  });
});

// Update a task
app.put("/secret/:id", function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.Todo, function(err) {
    if (err) {
      res.redirect("/secret");
    } else {
      res.redirect("/secret");
    }
  });
});

// ==========
// AUTHENTICATING ROUTE
// ==========
// Show register form
app.get("/register", function(req, res) {
  res.render("register");
});

// Handeling user's signing up
app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
  res.render("login");
});

// Login logic
// Middleware
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res) {});

// Logout
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

// ==================================================
// SERVER
// ==================================================
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});