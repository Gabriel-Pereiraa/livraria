var express = require("express");
var router = express.Router();
var livroController = require('../controllers/livroController');

router.post('/livros', livroController.cadastrarLivro);
router.get('/livros', livroController.listarLivros);
router.get('/generos', livroController.listarGeneros);

module.exports = router;