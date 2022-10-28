export function getCellData(distance, angle) {
    const arr = [];

    const angleCount = 360 / angle;
    const distanceCount = 2;

    let color = -1;
    for (let i = 0; i < distanceCount; i++) {
        for (let j = 0; j < angleCount; j++) {
            arr.push([
                angle * (j + 1),
                distance / distanceCount * (i + 1),
                color
            ]);
        }
        color *= -1;
    }
    return arr;
}
