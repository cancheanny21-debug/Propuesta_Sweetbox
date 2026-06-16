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
      multipleStatements: true // Permite ejecutar varios comandos SQL a la vez
    });

    const sqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('⏳ Ejecutando script de inicialización en MySQL...');
    await connection.query(sql);

    console.log('✅ Tablas creadas e inicializadas con éxito en la base de datos.');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
  } finally {
    if (connection) await connection.end();
    process.exit(0);
  }
})();
