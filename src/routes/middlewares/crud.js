// USER HANDLER FUNCTIONS
var path = require("path");
var debug = require("debug")("app:crud"); // DEBUG LINE
var {User} = require(path.resolve(__dirname, '..', '..', 'mongo', 'models'))
var {gen_id} = require('./utils');
var messages = require("./messages.json")


module.exports = {
    register: function (req, res) {
        try {
            var jsondata = req.body
            jsondata.user_id = gen_id(jsondata.username)
            User.create(jsondata)
            res.status(201).json({message: messages[201]})
        } catch (error) {
            res.status(500).json({message: messages[500]})
        }
    },
    login: function (req, res) {},
    update: function (req, res) {},
    delete: function (req, res) {},
    info: function (req, res) {},
}