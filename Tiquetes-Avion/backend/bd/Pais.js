const mongoose = require('mongoose');

const paisSchema = new mongoose.Schema({
  name: String,
  code: String
});

const Pais = mongoose.model('Paises', paisSchema);

module.exports = Pais;