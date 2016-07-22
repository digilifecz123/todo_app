// ========== 
// MongoDB & Mongoose setup -  tasks
// ========== 
var mongoose = require("mongoose")

var Todo = new  mongoose.Schema({
    title    : String,
});

module.exports = mongoose.model( 'Todo', Todo );

