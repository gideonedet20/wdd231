// scripts/discover.js
// Renders the 8 discovery cards and handles the "Learn more" dialog and the
// localStorage visit-tracking message. Nav toggle and footer year/last-modified
// are left to scripts/common.js, which already handles those site-wide.
import { discoverItems } from "./discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  setupLearnMoreDialog();
  showVisitMessage();
});

// ---------- Render the 8 cards from the data module ----------
function renderCards() {
  const grid = document.getElementById("discoveryGrid");
  const fragment = document.createDocumentFragment();

  discoverItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "discover-card";
    card.dataset.card = item.id;

    const stopNumber = String(index + 1).padStart(2, "0");

    card.innerHTML = `
      <figure>
        <span class="stop-label">Stop ${stopNumber}</span>
        <img src="${item.image}" alt="${item.alt}" loading="lazy" width="300" height="200">
      </figure>
      <div class="card-body">
        <h2>${item.name}</h2>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button" class="learn-more" data-id="${item.id}">Learn more</button>
      </div>
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

// ---------- Learn more dialog ----------
function setupLearnMoreDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "learn-more-dialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h2></h2>
      <address></address>
      <p></p>
      <button type="submit" class="learn-more-close">Close</button>
    </form>
  `;
  document.body.appendChild(dialog);

  document.getElementById("discoveryGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".learn-more");
    if (!button) return;

    const item = discoverItems.find((entry) => entry.id === button.dataset.id);
    if (!item) return;

    dialog.querySelector("h2").textContent = item.name;
    dialog.querySelector("address").textContent = item.address;
    dialog.querySelector("p").textContent = item.description;
    dialog.showModal();
  });
}

// ---------- localStorage visit tracking ----------
function showVisitMessage() {
  const STORAGE_KEY = "phChamberLastVisit";
  const note = document.getElementById("visitNote");
  const messageEl = document.getElementById("visitMessage");
  const closeBtn = document.getElementById("visitNoteClose");

  const now = Date.now();
  const lastVisit = localStorage.getItem(STORAGE_KEY);

  let message;

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const msDiff = now - Number(lastVisit);
    const dayMs = 1000 * 60 * 60 * 24;

    if (msDiff < dayMs) {
      message = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(msDiff / dayMs);
      const unit = days === 1 ? "day" : "days";
      message = `You last visited ${days} ${unit} ago.`;
    }
  }

  messageEl.textContent = message;
  note.hidden = false;

  closeBtn.addEventListener("click", () => {
    note.hidden = true;
  });

  localStorage.setItem(STORAGE_KEY, String(now));
}
