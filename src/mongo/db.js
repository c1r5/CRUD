var mongoose = require("mongoose")
require("dotenv").config()

mongoose.set('strictQuery', false)
module.exports = mongoose.connect(process.env['MONGODB_URL'] + process.env['DB_NAME']);
