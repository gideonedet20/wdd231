// Parks page: loads parks.json and renders cards filterable by state,
// park type, and a free-text search — the state selector is the
// primary interactive control on this page.

const STATES = [
  "Bauchi",
  "Taraba",
  "Cross River",
  "Niger",
  "Oyo",
  "Borno",
  "Kaduna",
  "Edo",
  "Lagos",
  "FCT (Abuja)",
  "Enugu",
  "Rivers",
];

const TYPES = ["National Park", "Nature Park", "Urban Park"];

const state = {
  selectedState: "All",
  type: "All",
  query: "",
  data: [],
};

function slug(text) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

function makeToggle(label, value, kind, className) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = className;
  btn.textContent = label;
  btn.dataset.value = value;
  btn.dataset.kind = kind;
  btn.setAttribute("aria-pressed", String(state[kind] === value));
  btn.addEventListener("click", () => {
    state[kind] = value;
    syncPressedState(kind);
    render();
  });
  return btn;
}

function syncPressedState(kind) {
  const selector = kind === "selectedState" ? "#state-selector button" : "#type-filters button";
  document.querySelectorAll(selector).forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.value === state[kind]));
  });
}

function buildStateSelector() {
  const wrap = document.querySelector("#state-selector");
  if (!wrap) return;
  wrap.appendChild(makeToggle("All States", "All", "selectedState", "state-btn"));
  STATES.forEach((s) => wrap.appendChild(makeToggle(s, s, "selectedState", "state-btn")));
}

function buildTypeFilters() {
  const wrap = document.querySelector("#type-filters");
  if (!wrap) return;
  wrap.appendChild(makeToggle("All Types", "All", "type", "chip"));
  TYPES.forEach((t) => wrap.appendChild(makeToggle(t, t, "type", "chip")));
}

function bindSearch() {
  const input = document.querySelector("#park-search");
  if (!input) return;
  input.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });
}

function cardArtClass(type) {
  return "art-" + slug(type);
}

function renderCard(park) {
  return `
    <article class="card">
      <div class="card-art ${cardArtClass(park.type)}">
        <span>${park.type}</span>
      </div>
      <div class="card-body">
        <h3>${park.name}</h3>
        <div class="card-meta">${park.state} state · ${park.zone}</div>
        <dl class="card-facts">
          <div><dt>Established</dt><dd>${park.established}</dd></div>
          <div><dt>Do there</dt><dd>${park.activity}</dd></div>
        </dl>
        <p>${park.blurb}</p>
      </div>
    </article>
  `;
}

function render() {
  const grid = document.querySelector("#parks-grid");
  const countEl = document.querySelector("#results-count");
  if (!grid) return;

  const q = state.query.trim().toLowerCase();

  const filtered = state.data.filter((park) => {
    const stateMatch = state.selectedState === "All" || park.state === state.selectedState;
    const typeMatch = state.type === "All" || park.type === state.type;
    const queryMatch =
      q === "" ||
      park.name.toLowerCase().includes(q) ||
      park.state.toLowerCase().includes(q) ||
      park.blurb.toLowerCase().includes(q);
    return stateMatch && typeMatch && queryMatch;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${state.data.length} parks`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">No parks match that combination yet — try a different state or type.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(renderCard).join("");
}

async function init() {
  buildStateSelector();
  buildTypeFilters();
  bindSearch();

  const grid = document.querySelector("#parks-grid");
  if (!grid) return;

  try {
    const response = await fetch("data/parks.json");
    if (!response.ok) throw new Error("Network response was not ok");
    state.data = await response.json();
    render();
  } catch (err) {
    grid.innerHTML = `<div class="empty-state">Couldn't load parks right now. Check your connection and reload the page.</div>`;
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", init);
