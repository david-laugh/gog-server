// require('dotenv').config();
import dotenv from "dotenv";
import mariadb from 'mariadb';
import h3 from "h3-js";
import express from 'express';

import { haversine, azimuth } from './utilities/Math.js';


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
    const sX = 48.06869406823506;
    const sY = 3.74459769969682;
    const items = getRing(h3Index);

    let arr = [];
    let tmp = [];
    for (let i = 0; i < items.length; i++) {
        let tmp = await queryDB(conn, items[i]);
        for (let j = 0; j < tmp.length; j++) {
            let d = haversine(sX, sY, tmp[j]["lat"], tmp[j]["lon"]);
            console.log(d);
            if (d < 5) {
                arr.push({
                    lat: tmp[j]["lat"],
                    lon: tmp[j]["lon"],
                    color: '#FF0000',
                    radius: 200
                });
            } else if ( d > 5 && d < 10 ) {
                arr.push({
                    lat: tmp[j]["lat"],
                    lon: tmp[j]["lon"],
                    color: '#0000FF',
                    radius: 200
                });
            } else if ( d > 10 && d < 15 ) {
                arr.push({
                    lat: tmp[j]["lat"],
                    lon: tmp[j]["lon"],
                    color: '#FF0000',
                    radius: 200
                });
            } else if ( d > 20 ) {
                arr.push({
                    lat: tmp[j]["lat"],
                    lon: tmp[j]["lon"],
                    color: '#0000FF',
                    radius: 200
                });
            }
        }
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

app.get('/Result/:lat/:lon/:km/:angle', result);

// PORT
const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Listening on port ${port}...`));
