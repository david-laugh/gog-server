require('dotenv').config();
const mariadb = require('mariadb');
const h3 = require("h3-js");
const express = require('express');

const app = express();

const PORT = 3000;

console.log(process.env.DB_PASSWORD);

const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root', 
    password: process.env.DB_PASSWORD + "#",
});

async function home (req, res) {
    let conn;
    try {
        // example : 851fb42bfffffff
        // example : 851fb397fffffff
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT * FROM sample.851fb397fffffff"
        );
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}
  
app.get('/', home);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
