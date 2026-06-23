const db = require('../config/db');

/**
 * Obtiene todos los productos con el nombre de su categoría.
 * Soporta filtro opcional por categoria_id via query param: ?categoria_id=2
 */
const getProducts = async (req, res) => {
  try {
    const { categoria_id } = req.query;

    let query = 'SELECT p.*, c.nombre AS categoria_nombre FROM Products p JOIN Categories c ON p.categoria_id = c.id';
    const params = [];

    if (categoria_id) {
      query += ' WHERE p.categoria_id = ?';
      params.push(categoria_id);
    }

    query += ' ORDER BY p.categoria_id, p.id';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/**
 * Obtiene todas las categorías disponibles.
 */
const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Categories ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getProducts,
  getCategories,
};
