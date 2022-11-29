// require('dotenv').config();
import dotenv from "dotenv";
import mariadb from 'mariadb';
import h3 from "h3-js";
import express from 'express';

import { haversine, azimuth } from './utilities/Math.js';


dotenv.config();

const app = express();

const PORT = 3000;

const conn = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// conn.connect();

function getRing(h3Index, km) {
    if ( km > 10 ){
        return h3.gridDisk(h3Index, 2);
    }
    else {
        return h3.gridDisk(h3Index, 1);
    }
}

const queryDB = async (country, h3Index) => {
    const res = await conn.query(
        `SELECT * FROM ${country} WHERE h3_code = ?;`,
        [h3Index]
    );
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

const getDartData = async (conn, km, angle, lat, lon) => {
    const h3_code = h3.latLngToCell(lat, lon, 5);
    const items = getRing(h3_code, km);
    const km_list = getKmList(km);
    const angle_list = getAngleList(angle);

    let arr = [];
    let tmp = [];

    let country;
    if (lat > 32.74 && lat < 42.00 && lon > -124.27 && lon < -113.97) {
        country = "cf";
    } else if (lat > 51.25 && lat < 51.72 && lon > -0.57 && lon < 0.37) {
        country = "london";
    } else if (lat > 37.41 && lat < 37.72 && lon > 126.73 && lon < 127.27) {
        country = "seoul";
    } else {
        return arr;
    }

    for (let i = 0; i < items.length; i++) {
        let tmp = await queryDB(country, items[i]);
        for (let j = 0; j < tmp.length; j++) {
            let d = haversine(lat, lon, tmp[j]["lat"], tmp[j]["lon"]);
            let a = azimuth(lat, lon, tmp[j]["lat"], tmp[j]["lon"]);
            if (d <= km_list[0]) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                }
            } else if ( d > km_list[0] && d <= km_list[1] ) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                }
            } else if ( d > km_list[1] && d <= km_list[2] ) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                }
            } else if ( d > km_list[2] && d <= km_list[3] ) {
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#0000FF',
                        radius: 10
                    });
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr.push({
                        lat: tmp[j]["lat"],
                        lon: tmp[j]["lon"],
                        color: '#FF0000',
                        radius: 10
                    });
                }
            }
        }
    }

    return arr;
};

const getCenterData = async (conn, km, angle, lat, lon) => {
    const h3_code = h3.latLngToCell(lat, lon, 5);
    const items = getRing(h3_code, km);
    const km_list = getKmList(km);
    const angle_list = getAngleList(angle);

    let arr = [];
    for (let i = 0; i < 48; i++){
        arr.push({
            lat: 0, 
            lon: 0, 
            color:'#0000FF', 
            radius: 0
        });
    }
    let tmp = [];
    let center_data = [];

    let country;
    if (lat > 32.74 && lat < 42.00 && lon > -124.27 && lon < -113.97) {
        country = "cf";
    } else if (lat > 51.25 && lat < 51.72 && lon > -0.57 && lon < 0.37) {
        country = "london";
    } else if (lat > 37.41 && lat < 37.72 && lon > 126.73 && lon < 127.27) {
        country = "seoul";
    } else {
        return center_data;
    }

    let data_count = 0;
    for (let i = 0; i < items.length; i++) {
        let tmp = await queryDB(country, items[i]);
        for (let j = 0; j < tmp.length; j++) {
            let d = haversine(lat, lon, tmp[j]["lat"], tmp[j]["lon"]);
            let a = azimuth(lat, lon, tmp[j]["lat"], tmp[j]["lon"]);
            if (d <= km_list[0]) {
                data_count += 1;
                let w = 0;
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr[0 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[0 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[0 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr[1 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[1 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[1 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr[2 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[2 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[2 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr[3 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[3 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[3 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr[4 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[4 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[4 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr[5 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[5 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[5 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr[6 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[6 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[6 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr[7 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[7 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[7 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr[8 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[8 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[8 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr[9 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[9 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[9 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr[10 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[10 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[10 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr[11 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[11 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[11 + 12 * w]['radius'] += 1;
                }
            } else if ( d > km_list[0] && d <= km_list[1] ) {
                data_count += 1;
                let w = 1;
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr[0 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[0 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[0 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr[1 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[1 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[1 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr[2 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[2 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[2 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr[3 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[3 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[3 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr[4 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[4 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[4 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr[5 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[5 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[5 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr[6 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[6 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[6 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr[7 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[7 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[7 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr[8 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[8 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[8 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr[9 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[9 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[9 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr[10 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[10 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[10 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr[11 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[11 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[11 + 12 * w]['radius'] += 1;
                }
            } else if ( d > km_list[1] && d <= km_list[2] ) {
                data_count += 1;
                let w = 2;
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr[0 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[0 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[0 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr[1 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[1 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[1 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr[2 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[2 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[2 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr[3 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[3 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[3 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr[4 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[4 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[4 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr[5 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[5 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[5 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr[6 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[6 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[6 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr[7 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[7 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[7 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr[8 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[8 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[8 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr[9 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[9 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[9 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr[10 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[10 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[10 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr[11 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[11 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[11 + 12 * w]['radius'] += 1;
                }
            } else if ( d > km_list[2] && d <= km_list[3] ) {
                data_count += 1;
                let w = 3;
                if ( a > angle_list[0] && a <= angle_list[1]) {
                    arr[0 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[0 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[0 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[1] && a <= angle_list[2]) {
                    arr[1 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[1 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[1 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[2] && a <= angle_list[3]) {
                    arr[2 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[2 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[2 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[3] && a <= angle_list[4]) {
                    arr[3 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[3 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[3 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[4] && a <= angle_list[5]) {
                    arr[4 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[4 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[4 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[5] && a <= angle_list[6]) {
                    arr[5 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[5 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[5 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[6] && a <= angle_list[7]) {
                    arr[6 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[6 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[6 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[7] && a <= angle_list[8]) {
                    arr[7 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[7 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[7 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[8] && a <= angle_list[9]) {
                    arr[8 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[8 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[8 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[9] && a <= angle_list[10]) {
                    arr[9 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[9 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[9 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[10] && a <= angle_list[11]) {
                    arr[10 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[10 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[10 + 12 * w]['radius'] += 1;
                } else if ( a > angle_list[11] && a <= angle_list[12]) {
                    arr[11 + 12 * w]['lat'] += tmp[j]["lat"];
                    arr[11 + 12 * w]['lon'] += tmp[j]["lon"];
                    arr[11 + 12 * w]['radius'] += 1;
                }
            }
        }
    }

    console.log(data_count);
    for (let i = 0; i < 48; i++){
        if (arr[i]["radius"] != 0) {
            center_data.push({
                lat: arr[i]["lat"] / arr[i]["radius"],
                lon: arr[i]["lon"] / arr[i]["radius"],
                color:'#0000FF', 
                radius: arr[i]["radius"] * (200 * 48) / (data_count > 200 * 48 ? data_count : data_count * 10)
            });
        }
    }

    return center_data;
};

async function dart (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const {km, angle, lat, lon} = req.params;
    
    let conn;
    try {
        // example : 851fb42bfffffff
        // example : 851fb397fffffff
        // conn = await connection.connect();
        const data = await getDartData(conn, km, angle, lat, lon);
        res.send(data);
    } catch (err) {
        throw err;
    }
    // finally {
    //     if (connection) return connection.end();
    //}
}

async function center (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    const {km, angle, lat, lon} = req.params;
    
    let conn;
    try {
        // example : 851fb42bfffffff
        // example : 851fb397fffffff
        // conn = await connection.connect();
        const data = await getCenterData(conn, km, angle, lat, lon);
        res.send(data);
    } catch (err) {
        throw err;
    }
    // finally {
    //     if (connection) return connection.end();
    //}
}

async function hello (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("hello");
}

app.get('/', hello);
app.get('/Result/Dart/:km/:angle/:lat/:lon', dart);
app.get('/Result/Center/:km/:angle/:lat/:lon', center);

// PORT
const port = process.env.PORT || 3300;
app.listen(port, () => console.log(`Listening on port ${port}...`));
