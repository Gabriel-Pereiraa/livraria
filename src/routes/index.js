var express = require("express");
var router = express.Router();
var livroController = require('../controllers/livroController');

router.post('/livros', livroController.cadastrarLivro);
router.get('/livros', livroController.listarLivros);
router.get('/generos', livroController.listarGeneros);
router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;