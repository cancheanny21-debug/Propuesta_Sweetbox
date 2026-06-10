const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Postre = sequelize.define('Postre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  categoria: {
    type: DataTypes.ENUM('Cupcakes', 'Pasteles', 'Galletas', 'Brownies'),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false
  },
  imagen_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  calificacion: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0.0
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'postres',
  timestamps: false
});

module.exports = Postre;
