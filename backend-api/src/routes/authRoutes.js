const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../../authMiddleware');

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile); // Ruta protegida por el middleware

module.exports = router;