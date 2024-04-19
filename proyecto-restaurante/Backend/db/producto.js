const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;