import { simplex2 } from "./perlin";
import { mark } from "./util";

const config = {
    lineCount: 100,
    pointCount: 120,
    padding: 100,
    debug: false,
    noiseAmplitude: 500,
    noiseFrequency: .001,
    speed: .001,
    slope: 0.7,
}

let lineA = {}
let lineB = {}
let tweenLines = []
let c = null;
let offset = 0;

function update() {
    // Rolling update and draw into one loop for performance
    c.clearRect(0, 0, c.canvas.width, c.canvas.height)
    c.strokeStyle = "red";
    offset += config.speed;

    lineA.points.forEach(point => {
        point.x = simplex2(point.y * config.noiseFrequency, point.y * config.noiseFrequency + offset) * config.noiseAmplitude + config.padding + point.y * config.slope;
        if (config.debug) {
            mark(c, point.x, point.y)
        }
    })
    c.strokeStyle = "blue";
    lineB.points.forEach(point => {
        point.x = simplex2(point.y * config.noiseFrequency + 3, point.y * config.noiseFrequency + offset) * config.noiseAmplitude + config.padding * 6 + point.y * config.slope;
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
function initLines() {
    c = document.querySelector("#lines").getContext("2d")
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight * .8;
    c.lineWidth = 1;
    // Init guide lines
    lineA.points = []
    lineB.points = []
    for (let i = 0; i < config.pointCount; i++) {
        let ay = 5 + (c.canvas.height) / config.pointCount * i
        lineA.points.push({ x: config.padding, y: ay });
        lineB.points.push({ x: c.canvas.width - config.padding, y: ay });
    }

    if (lineA.points.length !== lineB.points.length) {
        console.error("Guide lines must have equal number of points")
        return;
    }

    // Init tween lines

    for (let i = 1; i < config.lineCount; i++) {
        let line = { points: [] }
        for (let j = 0; j < lineA.points.length; j++) {
            let pa = lineA.points[j];
            let pb = lineB.points[j];
            let y = pa.y + (pb.y - pa.y) / config.lineCount * i;
            let x = pa.x + (pb.x - pa.x) / config.lineCount * i;
            line.points.push({ x: x, y: y })
        }
        tweenLines.push(line)
    }
    console.log(`Created ${tweenLines.length} tween lines, ${tweenLines[0].points.length} points/line.`)
    loop()
}

export { initLines }