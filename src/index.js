import { initCursor } from "./initCursor";
import { initLines } from "./initLine";
import { initSettings } from "./initSettings";
import { initFilters } from "./initFilters";
import { initNav } from "./initNav";
window.addEventListener("DOMContentLoaded", () => {
  const settingsEl = document.querySelector(".settings")

  if (settingsEl) {
    initSettings()
    initLines()
    initFilters();
    initNav()
  }
  initCursor()
});
