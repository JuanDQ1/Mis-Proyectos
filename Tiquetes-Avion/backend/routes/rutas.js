const express = require('express');
const router = express.Router();
const tiquetesControladores = require('./controladores/tique.js');
router


.get('/paises', tiquetesControladores.obtenerPaises)
.post('/tiquete', tiquetesControladores.guardarTiquete)






module.exports = router;