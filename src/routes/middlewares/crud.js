// USER HANDLER FUNCTIONS
var path = require("path");
var debug = require("debug")("app:crud"); // DEBUG LINE
var {User} = require(path.resolve(__dirname, '..', '..', 'mongo', 'models'))
var {gen_id} = require('./utils');
var messages = require("./messages.json");
var jwt = require("jsonwebtoken");

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
var findUser = (credentials) => new Promise((resolve, reject) => {
    User.findOne({username:credentials['username']}).where('password').eq(credentials['password'])
    .exec(function (err, userdata) {
        if (!err) {
            userdata = {
                username: userdata['username'],
                user_id: userdata['user_id'],
                email: userdata['email']
            }
            resolve(userdata)
        } else {
            reject(err)
        }
    })
})

var jwt_utils = {
    verifyToken: function (token) {

    }, 
    genToken: (data) => new Promise((resolve, reject) => {
        jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60), data
          }, process.env['PRIVATE_KEY'], {
            algorithm: 'HS256'
          }, (err, token) => {
            if(!err) resolve(token)
            else reject(err)
          });
    })
}