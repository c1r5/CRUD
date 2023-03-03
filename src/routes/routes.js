var express = require("express");
var debug = require("debug")("app:routes"); // DEBUG LINE
var crud = require("./middlewares/crud");
var userController = require('./middlewares/userController')
var Route = express.Router();

Route.post('/register', crud.register);
Route.post('/login', crud.login);
Route.get('/info', userController, crud.info);
Route.put('/update', userController, crud.update);
Route.delete('/delete', userController, crud.delete);


module.exports = Route