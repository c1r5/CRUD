var mongo = require("mongoose");
var dotenv = require('dotenv');

dotenv.config();
mongo.set('strictQuery', false);
var db = mongo.connect(process.env['MONGO_URL'] + process.env['DB_NAME']);

module.exports = db