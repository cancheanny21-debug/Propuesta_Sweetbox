const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoritesController');
const authMiddleware = require('../../authMiddleware');

const router = express.Router();

router.get('/favorites', authMiddleware, getFavorites);
router.post('/favorites', authMiddleware, addFavorite);
router.delete('/favorites/:productId', authMiddleware, removeFavorite);

module.exports = router;
