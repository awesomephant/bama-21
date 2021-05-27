import { initCursor } from "./initCursor";
import { initLines } from "./initLine";
import { initSettings } from "./initSettings";
window.addEventListener("DOMContentLoaded", () => {
  initSettings()
  initLines()
  initCursor()
});