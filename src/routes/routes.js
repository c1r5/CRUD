var express = require("express");
var debug = require("debug")("app:routes"); // DEBUG LINE
var crud = require("./crud");
var Route = express.Router();

Route.post('/register', crud.register);
Route.post('/login', crud.register);
Route.put('/update/:id', crud.register);
Route.delete('/delete-profile/:id', crud.register);
Route.get('/info/:id', (req, res) => crud.info);
module.exports = Route