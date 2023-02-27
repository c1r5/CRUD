var express = require("express");
var debug = require("debug")("app:app") // DEBUG LINE
var app = express()
app.use('/', (req, res, next) => {
    debug(req.method);
    next()
})
app.use(express.json())
module.exports = app