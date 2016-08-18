// ==========
// MongoDB & Mongoose setup - User registration
// ==========


let mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose")

let UserSchema = new mongoose.Schema({
    username: String,
    passport: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
