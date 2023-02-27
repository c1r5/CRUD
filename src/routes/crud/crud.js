var express = require("express")

var route = express.Router()
route.use(express.json())
route.use('/', (req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Content-Type', 'application/json');
    
    next();
})

// ROUTES

var crud = require("./crudFunctions.js")

route.get('/', (req, res) => res.status(200).json({message: "it's works!"}))
route.post('/register', crud.registrar) // CRIAR USUARIO
route.post('/login', crud.logar) // LOGAR USUARIO
route.put('/update/user/:id', crud.atualizar) // ATUALIZAR INFORMAÇÕES USUÁRIO
route.get('/list/user/:id', crud.listar) // LISTAR USUARIO(S)
route.delete('/delete/user/:id', crud.deletar) // DELETAR USUARIO

module.exports = route