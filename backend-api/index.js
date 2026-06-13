const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Inicializamos la conexión a la base de datos
const db = require('./src/config/db');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
const productRoutes = require('./src/routes/productRoutes');
app.use('/api', productRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor SweetBox funcionando correctamente.' });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
});
