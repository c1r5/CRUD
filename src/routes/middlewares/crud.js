// USER HANDLER FUNCTIONS
var path = require("path");
var debug = require("debug")("src:routes:middlewares:crud"); // DEBUG LINE
var {gen_id, checkCreds, jwt_utils, User} = require('./utils');
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

        checkCreds(formdata).then(userdata => {
            if (userdata) {                
                jwt_utils.genToken(userdata).then(token => {
                    res.status(200).json({access_token: token})
                })
            } else {
                res.status(401).json({message: 'invalid_credentials'})
            }
        }).catch(err => res.status(500).json({message: messages[500]}))
    },
    update: function (req, res) {
        var payload = req.headers.authorization.split('.')[1]
        var decoded_pl = new Buffer.from(payload, 'base64').toString()
        var {data} = JSON.parse(decoded_pl)
        var {user_id} = data;
    },
    delete: function (req, res) {
        var payload = req.headers.authorization.split('.')[1]
        var decoded_pl = new Buffer.from(payload, 'base64').toString()
        var {data} = JSON.parse(decoded_pl)
        var {user_id} = data;
        User.findOneAndDelete({user_id}).exec((err, data) => {
            if(err && !data) {
                debug(err)
                res.status(404).json({message: 'not_found'})
            } else {
                res.status(200).json({message: 'done'})
            }
        })
    },
    info: function (req, res) {
        var payload = req.headers.authorization.split('.')[1]
        var decoded_pl = new Buffer.from(payload, 'base64').toString()
        var {data} = JSON.parse(decoded_pl)
        var {user_id} = data;
        User.findOne({user_id}).exec((err, data) => {
            if(err || !data) {
                res.status(404).json({message: 'not_found'})
            } else {
                var data = {
                    username: data['username'],
                    email: data['email'],
                    user_id: data['user_id']
                }

                res.status(200).json(data)
            }
        })
    },
}