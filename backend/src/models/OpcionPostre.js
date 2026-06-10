const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Postre = require('./Postre');

const OpcionPostre = sequelize.define('OpcionPostre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  postre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Postre,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  tipo: {
    type: DataTypes.ENUM('sabor', 'relleno'),
    allowNull: false
  },
  valor: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'opciones_postre',
  timestamps: false
});

// Definir relaciones
Postre.hasMany(OpcionPostre, { as: 'opciones', foreignKey: 'postre_id' });
OpcionPostre.belongsTo(Postre, { foreignKey: 'postre_id' });

module.exports = OpcionPostre;
