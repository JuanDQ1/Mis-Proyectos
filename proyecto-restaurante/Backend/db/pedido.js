const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    mesero: { type: String },
    estado: { type: String },
    precioTotal: { type: Number },
    cantidad: { type: Number },
    producto: { type: String },
    mesa: { type: String }, 
    id: { type: String}, 
    idPedido: { type: String, unique: true}
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
