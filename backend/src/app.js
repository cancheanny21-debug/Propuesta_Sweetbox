const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

// Modelos
const User = require('./models/User');
const Postre = require('./models/Postre');
const OpcionPostre = require('./models/OpcionPostre');

// Script de población de base de datos
const seedDatabase = require('./config/seeder');

// Rutas
const authRoutes = require('./routes/auth.routes');
const postresRoutes = require('./routes/postres.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Definir prefijo de la API
app.use('/api/auth', authRoutes);
app.use('/api/postres', postresRoutes);

app.get('/', (req, res) => {
  res.json({ message: "SweetBox API is running" });
});

// Sincronizar Base de Datos
sequelize.sync({ force: false })
  .then(async () => {
    console.log('✅ MySQL conectado y modelos sincronizados.');
    
    // Correr script seeder
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en puerto ${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error DB:', err));

module.exports = app;
