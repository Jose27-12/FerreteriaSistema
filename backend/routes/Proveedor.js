const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/ProveedorController');

router.get('/', proveedorController.getProveedores); // Obtener todos los proveedores
router.get('/buscar/:nombre', proveedorController.buscarProveedorPorNombre); // Buscar proveedor por nombre
router.delete('/:id', proveedorController.eliminarProveedor); // Eliminar proveedor
router.put('/:id', proveedorController.editarProveedor); // Editar proveedor (agregado para completar la funcionalidad)
router.post('/agregar', proveedorController.agregarProveedor); // Agregar proveedor (nuevo endpoint)
module.exports = router;