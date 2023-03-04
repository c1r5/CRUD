var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    user_id: String,
    createdAt: String
});

mongoose.model('users', userSchema);

var User = mongoose.model('users');

module.exports = {
    User
}