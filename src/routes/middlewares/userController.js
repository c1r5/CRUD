var debug = require("debug")("src:routes:middlewares:userController")
var { jwt_utils } = require('./utils');


var message_invalid_token = {message: 'invalid_token'}
module.exports = function (req, res, next) {
    var bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer eyJ')) return res.status(401).json(message_invalid_token)
    bearer = bearer.split('Bearer')[1].trim()
    jwt_utils.verifyToken(bearer)
        .then(data => {
            next()
        })
        .catch(err => {
            res.status(401).json(message_invalid_token)
        })
}