const express = require('express');
const { createOrder } = require('../controllers/orderController');
const authMiddleware = require('../../authMiddleware');

const router = express.Router();

// Ruta protegida para crear un nuevo pedido
router.post('/orders', authMiddleware, createOrder);

module.exports = router;
