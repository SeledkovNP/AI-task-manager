const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'ai_task_manager',
    user: 'postgres',
    password: String(process.env.DB_PASSWORD || 'van42'),
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
    console.error('PostgreSQL error:', err);
});

module.exports = pool;