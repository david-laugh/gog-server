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

function getRing(h3Index, km) {
    if ( km > 10 ){
        return h3.gridDisk(h3Index, 2);
    }
    else {
        return h3.gridDisk(h3Index, 1);
    }
}

const queryDB = async (conn, h3Index) => {
    const res = await conn.query(`SELECT * FROM sample.${h3Index}`);
    return res;
};

function getKmList(km) {
    return [km * (1/4), km * (2/4), km * (3/4), km * (4/4)];
}

function getAngleList(angle) {
    let arr = [0];
    let tmp = 360 / angle;
    for (let i = 0; i < tmp; i++) {
        arr.push(360 * ( (i+1) / tmp));
    }
    return arr;
}

const getData = async (conn, km, angle, lat, lon) => {
    const h3_code = h3.latLngToCell(lat, lon, 5);
    const items = getRing(h3_code, km);
    const km_list = getKmList(km);
    const angle_list = getAngleList(angle);

    let arr = [];
    let tmp = [];
    for (let i = 0; i < items.length; i++) {
        let tmp = await queryDB(conn, items[i]);
        for (let j = 0; j < tmp.length; j++) {
            let d = haversine(lat, lon, tmp[j]["lat"], tmp[j]["lon"]);
            let a = azimuth(lat, lon, tmp[j]["lat"], tmp[j]["lon"]);
            // console.log(d);
            if (d <= km_list[0]) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                }
            } else if ( d > km_list[0] && d <= km_list[1] ) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                }
            } else if ( d > km_list[1] && d <= km_list[2] ) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                }
            } else if ( d > km_list[2] && d <= km_list[3] ) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 50
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 50
                    });
                }
            }
        }
    }

    return arr;
};

async function result (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const {km, angle, lat, lon} = req.params;
    
    let conn;
    try {
        // example : 851fb42bfffffff
        // example : 851fb397fffffff
        conn = await pool.getConnection();
        const data = await getData(conn, km, angle, lat, lon);
        // console.log(data);
        res.send(data);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}

app.get('/Result/:km/:angle/:lat/:lon', result);

// PORT
const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Listening on port ${port}...`));
