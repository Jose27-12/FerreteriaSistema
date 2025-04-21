const express = require('express');
const router = express.Router();
const { obtenerVentas } = require('../controllers/VentaController');

router.get('/', obtenerVentas);

module.exports = router;
