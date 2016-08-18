// ==========
// MongoDB & Mongoose setup -  tasks
// ==========
let mongoose = require("mongoose")

let Todo = new mongoose.Schema({
    user_id: String,
    title: String,
    updated_at: Date
});



module.exports = mongoose.model('Todo', Todo);