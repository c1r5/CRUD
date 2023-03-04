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
        return new Promise (async (resolve, reject) => {
            var user_id = extract_userId(req)
            var filter = {user_id};
            var update = req.body
            delete update.user_id
            try {
                var info = await User.findOneAndUpdate(filter, update)

                res.status(200).json({message: 'ok'})
            } catch (error) {
                res.status(500).json({message: 'internal_server_error'})
            }
        })
    },
    delete: function (req, res) {
        var user_id = extract_userId(req)
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
        var user_id = extract_userId(req)
        
        User.findOne({user_id}).exec((err, data) => {
            if(err || !data) {
                
                res.status(404).json({message: 'not_found'})
            } else {

                var data = {
                    name: data['name'],
                    username: data['username'],
                    email: data['email'],
                    user_id: data['user_id']
                }

                res.status(200).json(data)
            }
        })
    },
}

function extract_userId (req) { // EXTRACT USER ID FROM AUTHORIZATION TOKEN
    var payload = req.headers.authorization.split('.')[1]
    var decoded_pl = new Buffer.from(payload, 'base64').toString()
    var {data} = JSON.parse(decoded_pl)
    var {user_id} = data;

    return user_id
}