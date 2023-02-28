// USER HANDLER FUNCTIONS
var path = require("path")
var debug = require("debug")("app:crud") // DEBUG LINE
var {User} = path.resolve(__dirname, 'mongo', 'models.js')
module.exports = {
    register: function (req, res) {
        debug(req.body)
        res.send('ok')
    },
    login: function (req, res) {},
    update: function (req, res) {},
    delete: function (req, res) {},
    info: function (req, res) {},
}