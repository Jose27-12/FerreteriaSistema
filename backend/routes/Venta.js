const express = require('express');
const router = express.Router();
const { obtenerVentas, buscarVentaPorNombre, registrarVenta } = require('../controllers/VentaController');

router.get('/', obtenerVentas);

router.post('/', registrarVenta); // Ruta para registrar venta

module.exports = router;
