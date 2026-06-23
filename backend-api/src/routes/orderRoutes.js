const express = require('express');
const { createOrder, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../../authMiddleware');

const router = express.Router();

// Crear un nuevo pedido (protegido)
router.post('/orders', authMiddleware, createOrder);

// Obtener un pedido por ID (protegido — el usuario solo ve sus pedidos)
router.get('/orders/:id', authMiddleware, getOrderById);

// Actualizar estado de un pedido (protegido)
router.patch('/orders/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;
