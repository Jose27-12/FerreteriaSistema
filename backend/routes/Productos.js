const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductosController');

router.get('/', productoController.getProductos);
router.get('/buscar/:nombre', productoController.buscarProductoPorNombre);
router.post('/agregar', productoController.agregarProducto);
router.delete('/eliminar/:id', productoController.eliminarProducto);

router.put('/editar/:id', productoController.editarProducto); // Agregar la ruta para editar producto

module.exports = router;
