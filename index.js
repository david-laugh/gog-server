// require('dotenv').config();
import dotenv from "dotenv";
import mariadb from 'mariadb';
import h3 from "h3-js";
import express from 'express';


dotenv.config();

const app = express();

const PORT = 3000;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD + "#",
});

function getRing(h3Index) {
    return h3.gridDisk(h3Index, 1);
}

const queryDB = async (conn, h3Index) => {
    const res = await conn.query(`SELECT * FROM sample.${h3Index}`);
    return res;
};

const getData = async (conn, h3Index) => {
    const items = getRing(h3Index);

    let arr = [];
    let tmp = [];
    for (let i = 0; i < items.length; i++) {
        let tmp = await queryDB(conn, items[i]);
        arr = arr.concat(...arr, tmp);
    }

    return arr;
};

async function result (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const {lat, lon, km, angle} = req.params;
    console.log(lat);
    console.log(lon);
    console.log(km);
    console.log(angle);
    
    let conn;
    try {
        // example : 851fb42bfffffff
        // example : 851fb397fffffff
        conn = await pool.getConnection();
        const data = await getData(conn, "851fb397fffffff");
        res.send(data);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

async function home (req, res) {
    console.log("Hello");
}
app.get('/', home);
// GET + uri 파라메터로 데이터 전송
app.get('/result/:lat/:lon/:km/:angle', result);

// PORT
const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Listening on port ${port}...`));
