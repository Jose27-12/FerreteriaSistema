const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detalleFacturaController');

// Ruta para crear detalle de factura
router.post('/', detalleFacturaController.crearDetalleFactura);

module.exports = router;
