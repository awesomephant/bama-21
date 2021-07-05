import { d, gra, gri, rgba } from "./util";

let c;
let particles = [];
let target;

const colours = [
    [159, 247, 190],
    [250, 186, 71]
]

const config = {
    particleCount: 3,
    rMin: window.innerWidth * .3,
    rMax: window.innerWidth * .45,
    friction: 0.05
};

let mouse = {
    x: 0,
    y: 0
};

class Particle {
    constructor(x, y, r, fill) {
        this.fill = fill;
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }
}

function update() {
    target.vx += target.ax;
    target.vy += target.ay;
    target.x += target.vx;
    target.y += target.vy;

    target.x = mouse.x;
    target.y = mouse.y;

    particles.forEach((p, i) => {
        let aParticlesX = 0;
        let aParticlesY = 0;

        // Repelled by other circles
        particles.forEach((po, j) => {
            if (i !== j) {
                let dp = d(p.x, p.y, po.x, po.y);
                let aX = (0.15 * (p.x - po.x)) / dp;
                let aY = (0.15 * (p.y - po.y)) / dp;
                aParticlesX += aX;
                aParticlesY += aY;
            }
        });

        // Attracted by target
        let dt = d(p.x, p.y, target.x, target.y);
        let aTargetX = -0.3 * (p.x - target.x) * dt * 0.00001;
        let aTargetY = -0.3 * (p.y - target.y) * dt * 0.00001;

        p.ax = aParticlesX + aTargetX;
        p.ay = aParticlesY + aTargetY;

        p.vx += p.ax;
        p.vy += p.ay;

        // Apply friction
        p.vx -= p.vx * config.friction;
        p.vy -= p.vy * config.friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;
    });
}
function draw() {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    particles.forEach((p) => {
        let grad = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r / 2);
        grad.addColorStop(0, rgba(p.fill, 1));
        grad.addColorStop(1, rgba(p.fill, 0));
        c.fillStyle = grad;
        c.beginPath();
        c.arc(p.x, p.y, p.r / 2, 0, 2 * Math.PI);
        c.fill();
    });
    c.beginPath();
    c.arc(target.x, target.y, target.r / 2, 0, 2 * Math.PI);
    c.fill();
}

function setCursorCanvas() {
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
}

function init(cb) {
    c = document.querySelector(".cursor").getContext("2d")
    setCursorCanvas()
    for (let i = 0; i < config.particleCount; i++) {
        let x = gra(0, c.canvas.width);
        let y = gra(0, c.canvas.height);
        let r = gra(config.rMin, config.rMax);
        let fill = colours[0];
        if (i % 2 === 0) {
            fill = colours[1]
        }
        particles.push(new Particle(x, y, r, fill));
    }
    target = new Particle(c.canvas.width / 2, c.canvas.height / 2, 10);
    target.vx = 0.8;
    target.vy = -1.1;
    cb();
}
function loop() {
    update();
    draw();
    window.requestAnimationFrame(loop);
}

function initCursor() {
    window.addEventListener("touchstart", e => {
        window.hasTouch = true;
    })
    window.addEventListener("mousemove", e => {
        if (!window.hasTouch) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }
    })
    init(function () {
        loop()
    })
}

window.addEventListener("resize", setCursorCanvas)

export { initCursor }
