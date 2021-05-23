function mark(c, x, y, r) {
    if (!r) {
        r = 8
    }
    c.lineWidth = "1";
    c.strokeRect(x - r / 2, y - r / 2, r, r)
}

export { mark }