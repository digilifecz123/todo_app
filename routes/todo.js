'use strict';


var express = require("express");
var router = express.Router();
var User = require("../models/user");
var task = require("../models/todo");
var middleware = require('../middleware/index.js')



router.get("/secret", middleware.isLoggedIn, function(req, res) {
    task.find({}, function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.render("secret", {
                currentUser: req.user,
                tasks: tasks
            });
        }
    });
});

// Devare a taks
router.devare("/secret/:id", function(req, res) {
    task.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/secret");
        } else {
            res.redirect("/secret");
        }
    });
});

// Create a new task
router.post("/secret",middleware.isLoggedIn, function(req, res) {
    // create Todo
    task.create(req.body.task, function(err) {
        if (err) {
            console.log("error");
        } else {
            res.redirect("/secret");
        }
    });
});

// Update a task
router.put("/secret/:id", function(req, res) {
    task.findByIdAndUpdate(req.params.id, req.body.task, function(err) {
        if (err) {
            res.redirect("/secret");
        } else {
            res.redirect("/secret");
        }
    });
});
module.exports = router;