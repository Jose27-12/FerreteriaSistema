const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductosController');

router.get('/', productoController.getProductos);
router.get('/buscar/:nombre', productoController.buscarProductoPorNombre);
router.post('/agregar', productoController.agregarProducto);

module.exports = router;
