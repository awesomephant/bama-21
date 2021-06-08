import { initCursor } from "./initCursor";
import { initLines } from "./initLine";
import { initSettings } from "./initSettings";
import { initFilters } from "./initFilters";
import { initNav } from "./initNav";
window.addEventListener("DOMContentLoaded", () => {
  const settingsEl = document.querySelector(".settings")
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
      img.classList.add("cached");
    }
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  });
  if (settingsEl) {
    initSettings()
    initLines()
    initFilters();
    initNav()
  }
  initCursor()
});
