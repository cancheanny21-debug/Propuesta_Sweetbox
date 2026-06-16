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

module.exports = {
  createOrder
};
