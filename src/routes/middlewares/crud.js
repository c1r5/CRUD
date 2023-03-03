// USER HANDLER FUNCTIONS
var path = require("path");
var debug = require("debug")("app:crud"); // DEBUG LINE
var {gen_id, findUser, jwt_utils} = require('./utils');
var messages = require("./messages.json");

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
    login: function (req, res) {
        var formdata = req.body

        findUser(formdata).then(userdata => {
            if (userdata) {
                delete userdata['password']
                delete userdata['_id']
                debug ( userdata )
                jwt_utils.genToken(userdata).then(token => {
                    res.status(200).json({access_token: token})
                })
            } else {
                res.status(401).json({message: 'invalid_credentials'})
            }
        }).catch(err => res.status(500).json({message: messages[500]}))
    },
    update: function (req, res) {},
    delete: function (req, res) {},
    info: function (req, res) {},
}