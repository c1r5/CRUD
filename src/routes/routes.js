var express = require("express");
var debug = require("debug")("app:routes"); // DEBUG LINE
var crud = require("./crud");
var Route = express.Router();

Route.get('/', (req, res) => res.send('ok'));
Route.post('/register', crud.register);

module.exports = Route