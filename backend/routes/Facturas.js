const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

// Ruta para crear factura
router.post('/', facturaController.crearFactura);

module.exports = router;
