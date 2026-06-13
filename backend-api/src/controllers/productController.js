const db = require('../config/db');

const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT p.*, c.nombre as categoria_nombre FROM Products p JOIN Categories c ON p.categoria_id = c.id');
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getProducts
};
