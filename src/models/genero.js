var db = require('../database/config');

var Genero = {
  listarTodos: (callback) => {
    db.query('SELECT * FROM genero', callback);
  }
};

module.exports = Genero;
