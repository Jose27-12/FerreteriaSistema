const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductosController');

router.get('/', productoController.getProductos);
router.get('/buscar/:nombre', productoController.buscarProductoPorNombre);
router.post('/agregar', productoController.agregarProducto);
router.delete('/eliminar/:id', productoController.eliminarProducto);
router.put('/editar/:id', productoController.editarProducto); // Agregar la ruta para editar producto
router.get('/bajo-stock', productoController.getProductosBajoStock); // Ruta para obtener productos bajo stock
router.put('/stock/:id_Producto', productoController.actualizarStock);
router.get('/productos-mas-vendidos', productoController.getProductosMasVendidos); // Ruta para obtener productos más vendidos
router.get('/productos-menos-vendidos', productoController.getProductosMenosVendidos); // Ruta para obtener productos menos vendidos
module.exports = router;
