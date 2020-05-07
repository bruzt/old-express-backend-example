
// req.query - ?query=1
// req.params - /:param
// req.body

module.exports = {

    index(req, res) {

        // retorna todos os registros

        res.render('index');
    },

    show(req, res) {

        //retorna um registro
    },

    store(req, res) {

        // armazena um registro
    },

    update(req, res) {

        // altera um registro
    },

    destroy(req, res) {

        // deleta um registro
    }
}
