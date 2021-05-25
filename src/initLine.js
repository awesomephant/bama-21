import { simplex2 } from "./perlin";
import { mark } from "./util";

const config = {
    lineCount: 100,
    pointCount: 300,
    debug: false,
    slope: 0.1,
}

let lineA = {}
let lineB = {}
let tweenLines = []
let c = null;
let offsetA1 = 0;
let offsetA2 = 0;
let offsetB1 = 0;
let offsetB2 = 0;

function update() {
    // Rolling update and draw into one loop for performance
    c.clearRect(0, 0, c.canvas.width, c.canvas.height)
    c.lineWidth = window.settings.lineweight;
    c.strokeStyle = "red";

    offsetA1 += window.settings.w1_p1_speed;
    offsetA2 += window.settings.w1_p2_speed;

    lineA.points.forEach(point => {
        let perlin1 = simplex2(point.y * window.settings.w1_p1_freq, point.y * window.settings.w1_p1_freq + offsetA1) * window.settings.w1_p1_amp + point.y * window.settings.slope;
        let perlin2 = simplex2(point.y * window.settings.w1_p2_freq, point.y * window.settings.w1_p2_freq + offsetA2) * window.settings.w1_p2_amp + point.y * window.settings.slope;
        point.x = window.settings.x1 + perlin1 + perlin2;
        if (config.debug) {
            mark(c, point.x, point.y)
        }
    })
    c.strokeStyle = "blue";

    offsetB1 += window.settings.w2_p1_speed;
    offsetB2 += window.settings.w2_p2_speed;
    lineB.points.forEach(point => {
        let perlin1 = simplex2(point.y * window.settings.w2_p1_freq + 3, point.y * window.settings.w2_p1_freq + offsetB1) * window.settings.w2_p1_amp + point.y * window.settings.slope;
        let perlin2 = simplex2(point.y * window.settings.w2_p2_freq + 3, point.y * window.settings.w2_p2_freq + offsetB2) * window.settings.w2_p2_amp + point.y * window.settings.slope;
        point.x = window.settings.x2 + perlin1 + perlin2;
        if (config.debug) {
            mark(c, point.x, point.y)
        }
    })

    // update tween lines
    c.strokeStyle = "white";
    tweenLines.forEach((line, i) => {
        c.beginPath();
        c.moveTo(line.points[0].x, line.points[0].y)
        line.points.forEach((point, j) => {
            let pa = lineA.points[j];
            let pb = lineB.points[j];
            let y = pa.y + (pb.y - pa.y) / tweenLines.length * i;
            let x = pa.x + (pb.x - pa.x) / tweenLines.length * i;
            point.x = x;
            point.y = y;

            c.lineTo(point.x, point.y)
        })
        c.stroke();

    })

}
function loop() {
    update();
    window.requestAnimationFrame(loop)
}

function initTweenLines() {
    tweenLines = []
    let count = window.settings.linecount;
    for (let i = 1; i < count; i++) {
        let line = { points: [] }
        for (let j = 0; j < lineA.points.length; j++) {
            let pa = lineA.points[j];
            let pb = lineB.points[j];
            let y = pa.y + (pb.y - pa.y) / count * i;
            let x = pa.x + (pb.x - pa.x) / count * i;
            line.points.push({ x: x, y: y })
        }
        tweenLines.push(line)
    }
}
function initLines() {
    c = document.querySelector("#lines").getContext("2d")
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight * .8;
    // Init guide lines
    lineA.points = []
    lineB.points = []
    for (let i = 0; i < config.pointCount; i++) {
        let ay = 5 + (c.canvas.height) / config.pointCount * i
        lineA.points.push({ x: 0, y: ay });
        lineB.points.push({ x: 0, y: ay });
    }

    if (lineA.points.length !== lineB.points.length) {
        console.error("Guide lines must have equal number of points")
        return;
    }

    initTweenLines()
    console.log(`Created ${tweenLines.length} tween lines, ${tweenLines[0].points.length} points/line.`)
    loop()
}

export { initLines, initTweenLines}