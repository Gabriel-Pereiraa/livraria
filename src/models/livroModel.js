var db = require('../database/config');

var Livro = {
  cadastrar: (livro, callback) => {
    var sql = `INSERT INTO livro (titulo, autor, preco_venda, preco_compra, genero_id, quantidade)
                 VALUES`;
    db.query(sql, [livro.titulo, livro.autor, livro.preco_venda, livro.preco_compra, livro.genero_id, livro.quantidade], callback);
  },

  listarTodos: (callback) => {
    const sql = `
      SELECT livro.*, genero.nome AS genero_nome
      FROM livro
      JOIN genero ON livro.genero_id = genero.id
    `;
    db.query(sql, callback);
  }
};

module.exports = Livro;