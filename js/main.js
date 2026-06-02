// Block 3 — fetch both product lists from the API and render them dynamically.
// (Pagination + filtering for the catalogue grid arrive in Block 4.)
import { getBouquets, getBestsellers } from "./api.js";
import { renderProducts, setListState, clearList } from "./render.js";

const carousel = document.querySelector(".top-selling__list");
const grid = document.querySelector(".bouquets__grid");

// Dynamically inserted cards aren't known to AOS until we ask it to re-scan.
function refreshAOS() {
  if (window.AOS && typeof window.AOS.refresh === "function") window.AOS.refresh();
}

async function loadBestsellers() {
  if (!carousel) return;
  setListState(carousel, "Loading bestsellers…");
  try {
    const items = await getBestsellers();
    clearList(carousel);
    renderProducts(carousel, items, "carousel");
  } catch (error) {
    console.error("Failed to load bestsellers:", error);
    setListState(carousel, "Couldn't load bestsellers. Please try again later.", true);
  }
}

async function loadBouquets() {
  if (!grid) return;
  setListState(grid, "Loading bouquets…");
  try {
    const items = await getBouquets({ featured: false });
    clearList(grid);
    if (items.length === 0) {
      setListState(grid, "No bouquets found.");
      return;
    }
    renderProducts(grid, items, "grid");
  } catch (error) {
    console.error("Failed to load bouquets:", error);
    setListState(grid, "Couldn't load bouquets. Please try again later.", true);
  }
}

async function init() {
  await Promise.all([loadBestsellers(), loadBouquets()]);
  refreshAOS();
}

init();
