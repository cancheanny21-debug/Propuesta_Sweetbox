const db = require('../config/db');

/**
 * Crea un nuevo pedido con sus respectivos detalles en una sola transacción.
 */
const createOrder = async (req, res) => {
  const { total, metodo_pago, direccion, items } = req.body;
  const userId = req.userId; // Obtenido del token JWT por authMiddleware

  // 1. Validar campos requeridos
  if (!total || !metodo_pago || !direccion || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Faltan campos requeridos (total, metodo_pago, direccion, items).' });
  }

  // Obtener una conexión del pool para la transacción
  const connection = await db.getConnection();

  try {
    // 2. Iniciar transacción
    await connection.beginTransaction();

    // 3. Insertar el pedido principal en la tabla Orders
    const [orderResult] = await connection.query(
      'INSERT INTO Orders (user_id, total, metodo_pago, direccion, estado) VALUES (?, ?, ?, ?, ?)',
      [userId, total, metodo_pago, direccion, 'Confirmado']
    );

    const orderId = orderResult.insertId;

    // 4. Insertar cada producto del pedido en la tabla Order_Items
    for (const item of items) {
      const { product_id, cantidad, precio_unitario } = item;

      if (!product_id || !cantidad || !precio_unitario) {
        throw new Error('Cada item del pedido debe contener product_id, cantidad y precio_unitario.');
      }

      await connection.query(
        'INSERT INTO Order_Items (order_id, product_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [orderId, product_id, cantidad, precio_unitario]
      );
    }

    // 5. Confirmar transacción
    await connection.commit();

    res.status(201).json({
      message: 'Pedido creado exitosamente.',
      orderId: orderId
    });

  } catch (error) {
    // Si algo falla, revertimos los cambios
    await connection.rollback();
    console.error('Error al crear pedido (transacción cancelada):', error.message);
    res.status(500).json({ error: error.message || 'Error interno al procesar el pedido.' });
  } finally {
    // Siempre liberar la conexión al pool
    connection.release();
  }
};

/**
 * Obtiene un pedido por ID (con sus items).
 */
const getOrderById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const [orders] = await db.query(
      'SELECT * FROM Orders WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    const [items] = await db.query(
      `SELECT oi.*, p.nombre, p.url_imagen
       FROM Order_Items oi
       JOIN Products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    res.json({ order: orders[0], items });
  } catch (error) {
    console.error('Error al obtener pedido:', error.message);
    res.status(500).json({ error: 'Error interno al obtener el pedido.' });
  }
};

/**
 * Actualiza el estado de un pedido.
 * Estados válidos: 'Confirmado', 'Preparando', 'En camino', 'Entregado'
 */
const VALID_STATES = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado || !VALID_STATES.includes(estado)) {
    return res.status(400).json({
      error: `Estado inválido. Valores permitidos: ${VALID_STATES.join(', ')}.`
    });
  }

  try {
    const [result] = await db.query(
      'UPDATE Orders SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    res.json({ message: `Estado actualizado a "${estado}".`, orderId: id, estado });
  } catch (error) {
    console.error('Error al actualizar estado:', error.message);
    res.status(500).json({ error: 'Error interno al actualizar el estado.' });
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.userId;
  try {
    const [orders] = await db.query(
      'SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener pedidos del usuario:', error.message);
    res.status(500).json({ error: 'Error interno al obtener los pedidos.' });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
};
