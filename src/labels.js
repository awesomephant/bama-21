import textBalancer from 'text-balancer';
import { gra } from './util';

const grey = [224, 222, 220];
const orange = [250, 183, 71];
const mint = [159, 247, 190];
const res = 2;
const gradientCount = 3;

function rgb(rgb) {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}
function rgba(rgb, a) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`
}

function generateBackground(label) {
  // Let's set up the canvas element
  const c = label.querySelector(".label__background").getContext("2d")
  c.canvas.width = label.getBoundingClientRect().width * res
  c.canvas.height = label.getBoundingClientRect().height * res

  // Now we decide what the background should be and draw it
  const background = rgb(grey);
  c.fillStyle = background;
  c.fillRect(0, 0, c.canvas.width, c.canvas.height)

  // Now we place two gradients in random positions
  for (let i = 0; i < gradientCount; i++) {

    let gradientColour = null;
    if (Math.random() > .5) {
      gradientColour = mint;
    } else {
      gradientColour = orange;
    }


    let x = gra(-100, 600) * res;
    let y = gra(-100, 350) * res;
    let r = gra(550, 650) * res;
    const grad = c.createRadialGradient(x, y, 0, x, y, r / 2);
    grad.addColorStop(0, rgba(gradientColour, 1));
    grad.addColorStop(1, rgba(gradientColour, 0));

    c.fillStyle = grad;
    c.beginPath();
    c.arc(x, y, r / 2, 0, 2 * Math.PI);
    c.fill();
    // c.stroke();
  }

}

window.addEventListener("DOMContentLoaded", () => {
  const labels = document.querySelectorAll(".label")
  labels.forEach(label => {
    let regenButton = label.querySelector(".label__regen")
    regenButton.addEventListener("click", () => {
      generateBackground(label)
    })
    generateBackground(label)
  })
});
