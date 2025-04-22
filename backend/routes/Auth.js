const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Ruta para iniciar sesión
router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/cambiar-contrasena', authController.cambiarContrasena);
module.exports = router;
