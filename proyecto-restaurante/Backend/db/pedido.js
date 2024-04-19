const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    mesero: { type: String, required: true },
    estado: { type: String, required: true },
    precioTotal: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    producto: { type: String, required: true },
    mesa: { type: String, required: true }
    
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
