import pkg from 'pg';
const { Pool, Client } = pkg;

import { config } from 'dotenv';
config()

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
    ssl: {
        rejectUnauthorized: false
    }
})

const client = new Client({
    connectionString: process.env.POSTGRES_URI,
    ssl: {
        rejectUnauthorized: false
    }
})
console.log(`SQL Database Connected: ${client.host}`.blue.bold);

export { pool, client }