// MODULOS
var express = require("express")
var path = require("path")
var dotenv = require("dotenv")

dotenv.config()
//

var app = express();
app.use('/', (req, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
})
// IMPORTAR ROTAS

var route = require(path.join(__dirname, 'routes', 'crud', 'crud.js'))

app.use('/api/v1', route)

app.get('/', (req, res) => res.send('OK'))
var [port, host] = [process.env.PORT, process.env.HOST]

app.listen(port, host, () => console.log('Servidor inicializado na porta: ' + port))