module.exports = {
    registrar: function (req, res) {
        clientData = req.body

        

        res.status(200).json({msg: "ok"})
    },
    logar: function (req, res) {},
    atualizar: function (req, res) {},
    listar: function(req, res) {},
    deletar: function (req, res) {}
}