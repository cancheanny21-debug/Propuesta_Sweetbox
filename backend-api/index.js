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
const authRoutes = require('./src/routes/authRoutes');
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor SweetBox funcionando correctamente.' });
});

// Función para iniciar el servidor verificando la conexión a la BD
const startServer = async () => {
  try {
    // Intentamos una consulta simple para validar la conexión
    await db.query('SELECT 1');
    console.log('✅ Conexión a MySQL exitosa.');

    app.listen(port, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('\n❌ ERROR CRÍTICO AL INICIAR EL SERVIDOR ❌');
    console.error('Mensaje:', error.message);
    console.error('\nPOSIBLES CAUSAS:');
    console.error('1. MySQL no está iniciado (XAMPP/WAMP/Docker).');
    console.error('2. Las credenciales en el archivo .env son incorrectas.');
    console.error('3. No has creado la base de datos "sweetbox_db".');
    console.error('4. El puerto 3000 ya está siendo usado por otra aplicación.\n');
    process.exit(1);
  }
};

startServer();
