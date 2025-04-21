const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController'); // ✅ Asegúrate que esta ruta esté bien

router.get('/usuarios', UsuarioController.getUsuarios); 
router.delete('/usuarios/:id', UsuarioController.eliminarUsuario); // Cambié el método a DELETE
// Asegúrate de que AuthController esté importado correctamente
module.exports = router;
