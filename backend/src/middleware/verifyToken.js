const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No se proporcionó token de autorización.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Formato de token inválido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjunta los datos del token decodificado
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido o expirado.' });
  }
};
