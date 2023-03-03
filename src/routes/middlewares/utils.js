var crypto = require("crypto")
var path = require("path")
var {User} = require(path.resolve(__dirname, '..', '..', 'mongo', 'models'))
var jwt = require("jsonwebtoken");  
var debug = require("debug")("src:routes:middlewares:utils")
require('dotenv').config();

module.exports = {
    // FIND USERS AND CHECK THEY CREDENTIALS
    User,
    checkCreds: (credentials) => new Promise((resolve, reject) => {
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
    }),
    jwt_utils: {
        verifyToken: (token) => new Promise((resolve, reject) => jwt.verify(token, process.env['PRIVATE_KEY'], 
            (err, decoded) => {
                if (!err) resolve(decoded)
                else reject(err)
            } )), // FUNCTION TO VERIFY JWT TOKEN 
        genToken: (data) => new Promise((resolve, reject) => {
            jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), data // EXPIRATION SET TO 1H
              }, process.env['PRIVATE_KEY'], {
                algorithm: 'HS256'
              }, (err, token) => {
                if(!err) resolve(token)
                else reject(err)
              });
        }) // FUNCTION TO GENERATE JWT TOKEN
    },
    gen_id: (username) => {
        var plainTextId = `${username}:${Date.now()}:null8bit6`;
        var hashedId = crypto.createHash('md5').update(plainTextId).digest('hex')

        return hashedId

    },
};