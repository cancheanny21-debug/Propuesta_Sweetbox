const db = require('../config/db');

// Obtener los productos favoritos del usuario
const getFavorites = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, c.nombre as categoria_nombre 
       FROM Favorites f
       JOIN Products p ON f.product_id = p.id
       LEFT JOIN Categories c ON p.categoria_id = c.id
       WHERE f.user_id = ?`,
      [req.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Agregar un producto a favoritos
const addFavorite = async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ error: 'El ID del producto es requerido.' });
  }

  try {
    // Verificar si el producto existe
    const [prodCheck] = await db.query('SELECT id FROM Products WHERE id = ?', [product_id]);
    if (prodCheck.length === 0) {
      return res.status(404).json({ error: 'El producto no existe.' });
    }

    await db.query(
      'INSERT IGNORE INTO Favorites (user_id, product_id) VALUES (?, ?)',
      [req.userId, product_id]
    );

    res.status(201).json({ message: 'Producto agregado a favoritos.' });
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Eliminar un producto de favoritos
const removeFavorite = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ error: 'El ID del producto es requerido.' });
  }

  try {
    await db.query(
      'DELETE FROM Favorites WHERE user_id = ? AND product_id = ?',
      [req.userId, productId]
    );
    res.json({ message: 'Producto eliminado de favoritos.' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
