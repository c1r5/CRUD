var mongoose = require('mongoose')


 // CREATE NEW USER CREDENTIALS SCHEMA

 var usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    user_id: String,
    createdAt: Number
});

 // CREATE NEW USERS DATABASE MODEL

var userModel = mongoose.model('users', usersSchema);

module.exports = {userModel}