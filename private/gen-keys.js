var crypto = require("crypto")
var fs = require('fs')

var {publicKey, privateKey} =  crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048
})

fs.writeFileSync('priv.pem', privateKey.export({type: 'pkcs1', format: 'pem'}))
