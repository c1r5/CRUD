var express = require("express")
var app = express();

app.use('/', (req, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
});

var dotenv = require("dotenv")
dotenv.config()

module.exports = app
