var db = require('../config');

var Genero = {
  listarTodos: (callback) => {
    db.query('SELECT * FROM genero', callback);
  }
};

module.exports = Genero;
