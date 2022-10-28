export function haversine(sX, sY, tX, tY) {
    const radius = 6371;
    const radian = Math.PI / 180;

    const deltaLat = Math.abs(sX - tX) * radian;
    const deltaLon = Math.abs(sY - tY) * radian;

    const sinDeltaLat = Math.sin(deltaLat / 2);
    const sinDeltaLon = Math.sin(deltaLon / 2);

    return Math.asin(Math.sqrt(
        Math.pow(sinDeltaLat, 2) +
        Math.cos(sX * radian) *
        Math.cos(tX * radian) *
        Math.pow(sinDeltaLon, 2)
    )) * radius * 2;
}

export function azimuth(sX, sY, tX, tY) {
    /*
    https://www.movable-type.co.uk/scripts/latlong.html
    */
    const y = Math.sin((tY * Math.PI / 180) - (sY * Math.PI / 180)) *
              Math.cos(tX * Math.PI / 180);
    const x = Math.cos(sX * Math.PI / 180) *
              Math.sin(tX * Math.PI / 180) -
              Math.sin(sX * Math.PI / 180) *
              Math.cos(tX * Math.PI / 180) *
              Math.cos(tY * Math.PI / 180 - sY * Math.PI / 180);
    const a = Math.atan2(y, x);

    return (a * 180 / Math.PI + 360) % 360;
}
