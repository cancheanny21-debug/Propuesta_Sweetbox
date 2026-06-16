const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token de autenticación.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sweetbox_secret_key');
        req.userId = decoded.userId; // Adjuntar el ID de usuario al objeto de solicitud
        next(); // Continuar con la siguiente función de middleware/ruta
    } catch (error) {
        console.error('Error al verificar token:', error);
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;