const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../../authMiddleware');

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile); // Ruta protegida por el middleware
router.put('/profile', authMiddleware, updateProfile); // Actualizar perfil

module.exports = router;