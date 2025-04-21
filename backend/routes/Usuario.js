const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');


router.get('/usuarios', UsuarioController.getUsuarios); 
router.delete('/usuarios/:id', UsuarioController.eliminarUsuario); // Cambié el método a DELETE
router.get('/usuarios/buscar', UsuarioController.buscarUsuario); 
// Asegúrate de que AuthController esté importado correctamente
module.exports = router;
