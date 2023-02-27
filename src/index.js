// MODULOS
var dotenv = require("dotenv");
dotenv.config();

// APP
var app = require("./app.js");

// MONGODB
var db = require("./mongo/db");

// IMPORTAR ROTAS

var route = require('./routes/crud/crud.js');

app.use('/api/v1', route);

app.get('/', (req, res) => res.send('OK'));

var [port, host] = [process.env.PORT, process.env.HOST];

db.then(() => app.listen(port, host, () => {
    console.log('[+] SERVIDOR INICIADO NA PORTA:', port)
    console.log('[+] DATABASE CONECTADA EM', process.env['DB_NAME'])
})).catch(err => {
    console.log(err)
})