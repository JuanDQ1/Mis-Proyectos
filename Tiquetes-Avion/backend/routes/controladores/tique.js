const Pais = require('../../bd/Pais');
const Ticket = require('../../bd/Ticket');

const obtenerPaises = async (req, res) => {
    const { query } = req.query;
    console.log(req.query);
    try {
      const regex = new RegExp(query, 'i'); // Crear expresión regular a partir de la cadena de búsqueda
      const paises = await Pais.find({ name: regex });
      res.json(paises);
      console.log(paises);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la lista de países' });
    }
  };
  const guardarTiquete = async (req, res) => {
    try {
      const { name, origin, destination, date } = req.body;
  
      // Verificar si ya existe un boleto con el mismo origen
      const existingOriginTicket = await Ticket.findOne({ origin });
      if (existingOriginTicket) {
        return res.status(400).json({ message: 'Ya existe un boleto con el mismo origen' });
      }
  
      // Verificar si ya existe un boleto con el mismo destino
      const existingDestinationTicket = await Ticket.findOne({ destination });
      if (existingDestinationTicket) {
        return res.status(400).json({ message: 'Ya existe un boleto con el mismo destino' });
      }
  
      // Verificar si ya existe un boleto con la misma fecha
      const existingDateTicket = await Ticket.findOne({ date });
      if (existingDateTicket) {
        return res.status(400).json({ message: 'Ya existe un boleto con la misma fecha' });
      }
  
      // Si no existe ningún boleto con los mismos datos, guardar el nuevo boleto
      const newTicket = new Ticket({ name, origin, destination, date });
      await newTicket.save();
      res.status(201).json(newTicket);
    } catch (error) {
      console.error('Error al guardar el tiquete:', error);
      res.status(500).json({ message: 'Error al guardar el tiquete' });
    }
  };

module.exports = {
    obtenerPaises,
    guardarTiquete
};