// require('dotenv').config();
import dotenv from "dotenv";
import mariadb from 'mariadb';
import h3 from "h3-js";
import express from 'express';

import { azimuth, haversine } from './src/utilities/math.js';

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
    try {
        const res = await conn.query(`SELECT * FROM sample.${h3Index}`);
        return res;
    } catch (err) {
        throw err;
    }
};

const getData = async (conn, h3Index) => {
    const items = getRing(h3Index);
    var arr = [];

    queryDB(conn, "851fb397fffffff").then(res => {
        arr.push(res);
    }).catch(err => {
        console.log(err);
    });

    // items.forEach(function (item, index, array){
    //     queryDB(conn, item).then(res => {
    //         arr.push(res);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // });

    return arr;
};

async function home (req, res) {
    let conn;
    try {
        // example : 851fb42bfffffff
        // example : 851fb397fffffff
        conn = await pool.getConnection();
        const data = getData(conn, "851fb397fffffff");
        console.log(data);
        res.send(data);
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
