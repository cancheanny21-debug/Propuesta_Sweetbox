const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ─── REGISTRO ───────────────────────────────────────────────────────────────
const register = async (req, res) => {
  const { nombre, correo, password } = req.body;

  // 1. Validar que vengan todos los campos
  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos (nombre, correo, password).' });
  }

  try {
    // 2. Verificar si el correo ya está registrado
    const [existing] = await db.query('SELECT id FROM Users WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Este correo ya está registrado.' });
    }

    // 3. Hashear la contraseña con bcrypt (10 salt rounds)
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Insertar el nuevo usuario en la tabla Users
    const [result] = await db.query(
      'INSERT INTO Users (nombre, correo, password) VALUES (?, ?, ?)',
      [nombre, correo, passwordHash]
    );

    // 5. Responder con éxito
    res.status(201).json({
      message: 'Usuario registrado correctamente.',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// ─── INICIO DE SESIÓN ────────────────────────────────────────────────────────
const login = async (req, res) => {
  const { correo, password } = req.body;

  // 1. Validar campos
  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
  }

  try {
    // 2. Buscar usuario por correo en la BD
    const [rows] = await db.query(
      'SELECT id, nombre, correo, password FROM Users WHERE correo = ?',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    const user = rows[0];

    // 3. Comparar la contraseña con el hash guardado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos.' });
    }

    // 4. Generar token JWT (expira en 7 días)
    const token = jwt.sign(
      { userId: user.id, correo: user.correo },
      process.env.JWT_SECRET || 'sweetbox_secret_key',
      { expiresIn: '7d' }
    );

    // 5. Responder con token y datos básicos del usuario
    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// ─── PERFIL (requiere token JWT) ─────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, correo, created_at FROM Users WHERE id = ?',
      [req.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    res.json({ user: rows[0] });

  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = { register, login, getProfile };
