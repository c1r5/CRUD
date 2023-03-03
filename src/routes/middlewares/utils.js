var crypto = require("crypto")
var {User} = require(path.resolve(__dirname, '..', '..', 'mongo', 'models'))
var jwt = require("jsonwebtoken");  
module.exports = {
    findUser: (credentials) => new Promise((resolve, reject) => {
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
    },
    gen_id: (username) => {
        var plainTextId = `${username}:${Date.now()}:null8bit6`;
        var hashedId = crypto.createHash('md5').update(plainTextId).digest('hex')

        return hashedId

    },
};