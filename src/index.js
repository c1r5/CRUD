var app = require("./app/app");
var mongo = require("./mongo/db")
var log = require("debug")("app:index") // DEBUG LINE

require("dotenv").config()

var [port, host] = [process.env.PORT, process.env.HOST];
// IMPORT ROUTES
var routes = require("./routes/routes");
app.use('/api/user', routes)
mongo.then(() => app.listen(port, () => {
    log("[+] Servidor iniciado e escutando na porta:", port)
    log("[+] Database rodando em", process.env['MONGODB_URL'])
    log("[+] Database:", process.env['DB_NAME'])
}))