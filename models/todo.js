// ==========
// MongoDB & Mongoose setup -  tasks
// ==========
var mongoose = require("mongoose")

var Todo = new mongoose.Schema({
    user_id: String,
    title: String,
    updated_at: Date
});



module.exports = mongoose.model('Todo', Todo);