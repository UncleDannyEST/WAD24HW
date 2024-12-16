const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',        // Your database user
    host: 'localhost',       // Your database host
    database: 'myapp',       // Your database name
    password: 'Parool1',     // Your database password
    port: 5432,              // Default PostgreSQL port
});

module.exports = pool; // Export the pool object
