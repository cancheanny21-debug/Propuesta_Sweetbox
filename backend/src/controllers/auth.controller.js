const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword
    });

    // Crear token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Error interno del servidor al registrar.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Validar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        foto_perfil: user.foto_perfil
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'nombre', 'email', 'foto_perfil', 'metodo_login']
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    return res.status(500).json({ error: 'Error al obtener datos del perfil.' });
  }
};
