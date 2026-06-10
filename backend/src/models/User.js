const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  foto_perfil: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  metodo_login: {
    type: DataTypes.ENUM('email', 'google'),
    defaultValue: 'email'
  }
}, {
  tableName: 'usuarios'
});

module.exports = User;
