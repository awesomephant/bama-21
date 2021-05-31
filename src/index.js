import { initCursor } from "./initCursor";
import { initLines } from "./initLine";
import { initSettings } from "./initSettings";
window.addEventListener("DOMContentLoaded", () => {
  const settingsEl = document.querySelector(".settings")
  
  if (settingsEl){
    initSettings()
    initLines()
  }

  initCursor()
});
