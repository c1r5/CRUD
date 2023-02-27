var {userModel} = require('../../mongo/models/models');
var gen_id = require("../../utils/gen_id.js")
var errors_code = require("../../utils/errors.json")
module.exports = {
    registrar: function (req, res) {
        var register_form = req.body
        register_form['createdAt'] = Date.now()

        var user_id = gen_id({
            username: register_form['username'], 
            password: register_form['password'], 
            createdAt: register_form['createdAt']
        }) // <-- GENERATE USER_ID FROM MODULE: gen_id
        register_form['user_id'] = user_id;
        
        try {
            var newUser = new userModel(register_form)
            newUser.save()

            return res.status(200).json({msg: errors_code['200']})
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: errors_code['500']})
        }
        
    },
    logar: function (req, res) {
        var login_form = req.body

        console.log(login_form);

        res.status(200).json({msg: errors_code['200']})
    },
    atualizar: function (req, res) {},
    listar: function(req, res) {},
    deletar: function (req, res) {}
}