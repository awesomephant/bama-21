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

function average(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length;
}

export { mark, average, gri, gra }
