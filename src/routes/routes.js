var express = require("express");
var debug = require("debug")("app:routes"); // DEBUG LINE
var crud = require("./middlewares/crud");
var Route = express.Router();

Route.post('/register', crud.register);
Route.post('/login', crud.login);
Route.put('/update', crud.update);
Route.delete('/delete-profile', crud.delete);
Route.get('/info', crud.info);

module.exports = Route