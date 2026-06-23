const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Lista de productos (acepta ?categoria_id=N para filtrar)
router.get('/products', productController.getProducts);

// Lista de categorías (para poblar el nav del catálogo)
router.get('/categories', productController.getCategories);

module.exports = router;
