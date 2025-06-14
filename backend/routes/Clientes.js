const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClientesController');


router.post('/', clienteController.crearCliente); // Agregar la ruta para crear cliente
router.get('/', clienteController.getClientes);
router.get('/buscar/:nombre', clienteController.buscarClientePorNombre);
router.delete('/eliminar/:id', clienteController.eliminarCliente);
router.put('/editar/:id', clienteController.editarCliente); // Agregar la ruta para editar cliente


module.exports = router;