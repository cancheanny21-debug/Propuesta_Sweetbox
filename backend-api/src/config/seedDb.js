const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

(async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    const sqlPath = path.join(__dirname, 'seed_products.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('⏳ Ejecutando script de sembrado de productos en MySQL...');
    const [result] = await connection.query(sql);
    
    // Si hay múltiples sentencias, result es un array de resultados de cada consulta.
    // Buscamos el resultado que tiene la fila del conteo final.
    let summary = '';
    if (Array.isArray(result)) {
      const lastSelect = result[result.length - 1];
      if (Array.isArray(lastSelect) && lastSelect[0]) {
        summary = lastSelect[0].resultado || '';
      }
    }

    console.log('✅ Sembrado completado con éxito.');
    if (summary) {
      console.log('📊 Resumen:', summary);
    }
  } catch (error) {
    console.error('❌ Error al sembrar la base de datos:', error.message);
  } finally {
    if (connection) await connection.end();
    process.exit(0);
  }
})();
