const mysql = require('mysql2/promise');
// Connection pool pool (for common queries)
const pool = mysql.createPool({
    host: '139.180.136.119',
    user: 'root',
    port: '1985',
    password: '56781234',
    database: 'wedding',
    multipleStatements: true,
    // debug: true,
});

module.exports = pool;