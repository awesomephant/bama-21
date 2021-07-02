function gra(min, max) {
  return Math.random() * (max - min) + min;
}

function gri(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mark(c, x, y, r) {
  if (!r) {
    r = 8
  }
  c.lineWidth = "1";
  c.strokeRect(x - r / 2, y - r / 2, r, r)
}
function d(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function average(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length;
}

function rgb(rgb) {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

function rgba(rgb, a) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`
}

export { mark, average, gri, gra, d,rgb,rgba }
