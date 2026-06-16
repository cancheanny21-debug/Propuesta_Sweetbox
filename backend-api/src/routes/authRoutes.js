const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// ─── Middleware: verificar token JWT ─────────────────────────────────────────
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Token requerido. Inicia sesión primero.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sweetbox_secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

// ─── Rutas públicas ───────────────────────────────────────────────────────────
router.post('/register', register);   // POST /api/auth/register
router.post('/login', login);         // POST /api/auth/login

// ─── Rutas protegidas (requieren JWT) ────────────────────────────────────────
router.get('/profile', verifyToken, getProfile);  // GET /api/auth/profile

module.exports = router;
