const express = require('express');
const router = express.Router();
const postresController = require('../controllers/postres.controller');
const verifyToken = require('../middleware/verifyToken');

// Rutas protegidas por JWT (para asegurar que solo usuarios logueados accedan al catálogo)
router.get('/', verifyToken, postresController.getAllPostres);
router.get('/:id', verifyToken, postresController.getPostreById);

module.exports = router;
