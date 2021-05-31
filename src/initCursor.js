let c;
let cursor = {
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    r: 250
}
function updateCursor() {
    cursor.x += (cursor.targetX - cursor.x) * .45
    cursor.y += (cursor.targetY - cursor.y) * .45
    c.canvas.fillStyle= "transparent";
    c.clearRect(0, 0, c.canvas.width, c.canvas.height)
    let grad = c.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, cursor.r);
    grad.addColorStop(0, "rgba(250, 183, 71, 1)");
    grad.addColorStop(1, "rgba(250, 183, 71, 0)");
    c.fillStyle = grad;
    c.beginPath();
    c.arc(cursor.x, cursor.y, cursor.r, 0, 2 * Math.PI);
    c.fill();

    window.requestAnimationFrame(updateCursor)
}
function initCursor() {
    c = document.querySelector(".cursor").getContext("2d")
    c.canvas.width = window.innerWidth;
    c.canvas.height = window.innerHeight;
    window.addEventListener("mousemove", e => {
        cursor.targetX = e.clientX;
        cursor.targetY = e.clientY;
    })
    updateCursor()
}

export { initCursor }
