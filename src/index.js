import { initCursor } from "./initCursor";
import { initLines } from "./initLine";
import { initSettings } from "./initSettings";
import { initFilters } from "./initFilters";
import { initNav } from "./initNav";
import { initProject } from "./initProject";
import textBalancer from 'text-balancer';

window.addEventListener("DOMContentLoaded", () => {
  const settingsEl = document.querySelector(".settings")
  textBalancer.balanceText(".project__title")
  if (settingsEl) {
    initSettings()
    initLines()
    initFilters();
    initNav()
  }
  initProject();
  initCursor()
});
