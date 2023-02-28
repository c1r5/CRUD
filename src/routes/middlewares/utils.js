var crypto = require("crypto")
module.exports = {
    gen_id: (username) => {
        var plainTextId = `${username}:${Date.now()}:null8bit6`;
        var hashedId = crypto.createHash('md5').update(plainTextId).digest('hex')

        return hashedId

    },
};