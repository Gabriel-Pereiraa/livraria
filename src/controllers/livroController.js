var Livro = require('../models/livroModel');
var Genero = require('../models/genero');

function precoVenda(preco, generoNome) {
  if (preco >= 100 && (generoNome === 'horror' || generoNome === 'romance')) {
    return +(preco * 1.225).toFixed(2);
  }
  if (preco <= 50 && (generoNome === 'poesia' || generoNome === 'horror')) {
    return +(preco * 1.25).toFixed(2);
  }
  if (preco > 50 && preco < 100 && generoNome === 'fantasia') {
    return +(preco * 1.275).toFixed(2);
  }
  return preco;
}

exports.cadastrarLivro = (req, res) => {
  var { titulo, autor, preco_compra, quantidade, genero_id } = req.body;

  var letras = autor.split('');
  for (let i = 0; i < letras.length; i++) {
    var codigo = letras[i].charCodeAt(0);
    if (
      !(
        (codigo >= 65 && codigo <= 90) ||
        (codigo >= 97 && codigo <= 122) ||
        (codigo >= 192 && codigo <= 255) ||
        codigo === 32
      )
    ) {
      return res.status(400).json({ erro: 'Autor inválido' });
    }
  }

  // nome do gênero
  var sqlGenero = 'SELECT nome FROM genero WHERE id = ?';
  var db = require('../config');
  db.query(sqlGenero, [genero_id], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ erro: 'Gênero inválido' });

    var nomeGenero = results[0].nome;
    var preco_venda = precoVenda(Number(preco_compra), nomeGenero);

    var livro = { titulo, autor, preco_compra, preco_venda, genero_id, quantidade };

    Livro.cadastrar(livro, (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar' });
      res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!' });
    });
  });
};

exports.listarLivros = (req, res) => {
  Livro.listarTodos((err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar livros' });
    res.json(results);
  });
};

exports.listarGeneros = (req, res) => {
  Genero.listarTodos((err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar gêneros' });
    res.json(results);
  });
};