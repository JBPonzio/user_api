
const Pool = require('pg').Pool;

//initialization connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'default_database',
    password: 'root',
    port: 5432,
});

module.exports = pool



