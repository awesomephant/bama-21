let c;
let cursor = {
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    r: 750
}
function updateCursor() {
    c.clearRect(cursor.x - cursor.r / 2, cursor.y - cursor.r / 2, cursor.r, cursor.r)
    cursor.x += (cursor.targetX - cursor.x) * .1
    cursor.y += (cursor.targetY - cursor.y) * .1
    let grad = c.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, cursor.r / 2);
    grad.addColorStop(0, "rgba(250, 183, 71, 1)");
    grad.addColorStop(1, "rgba(250, 183, 71, 0)");
    c.fillStyle = grad;
    c.beginPath();
    c.arc(cursor.x, cursor.y, cursor.r / 2, 0, 2 * Math.PI);
    c.fill();

    window.requestAnimationFrame(updateCursor)
}

function setCursorCanvas() {
    c = document.querySelector(".cursor").getContext("2d")
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
}

function initCursor() {
    window.addEventListener("touchstart", e => {
        window.hasTouch = true;
    })
    window.addEventListener("mousemove", e => {
        if (!window.hasTouch) {
            cursor.targetX = e.clientX;
            cursor.targetY = e.clientY;
        }
    })
    setCursorCanvas()
    updateCursor()
}

window.addEventListener("resize", setCursorCanvas)

export { initCursor }
