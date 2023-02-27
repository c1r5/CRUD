var crypto = require("crypto")
module.exports = function ({username, password, createdAt}) {
    var plainTxtString = `${createdAt}:${username}:${password}:NULL8BITEST`
    var md5String = crypto.createHash('md5').update(plainTxtString).digest('hex')
    
    return md5String
}