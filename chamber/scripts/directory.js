// ---------------------------------------------------------
// Port Harcourt Chamber of Commerce - Directory page script
// ---------------------------------------------------------

const tierNames = { 1: "Member", 2: "Silver", 3: "Gold" };

// --- Navigation toggle (hamburger) ---
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// --- Footer: copyright year + last modified date ---
document.getElementById("copyrightYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// --- Member directory: fetch, render, and toggle views ---
const directoryEl = document.getElementById("directory");
const memberCountEl = document.getElementById("memberCount");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

function buildCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const seal = document.createElement("div");
  seal.className = `seal tier-${member.membership}`;
  seal.innerHTML = `<span class="seal-inner">${tierNames[member.membership]}</span>`;
  card.appendChild(seal);

  const logo = document.createElement("img");
  logo.className = "logo";
  logo.src = `images/logos/${member.image}`;
  logo.alt = `${member.name} logo`;
  logo.width = 64;
  logo.height = 64;
  logo.loading = "lazy";
  card.appendChild(logo);

  const body = document.createElement("div");
  body.className = "card-body";
  body.innerHTML = `
    <p class="category">${member.category}</p>
    <h3>${member.name}</h3>
    <p class="tagline">${member.tagline}</p>
    <p class="contact-line">${member.address}</p>
    <p class="contact-line"><a href="tel:${member.phone.replace(/[^\d+]/g, "")}">${member.phone}</a></p>
    <div class="card-actions">
      <a href="${member.url}" target="_blank" rel="noopener">Visit website &rarr;</a>
    </div>
  `;
  card.appendChild(body);

  return card;
}

async function loadDirectory() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    const members = data.members;

    directoryEl.innerHTML = "";
    members
      .slice()
      .sort((a, b) => b.membership - a.membership || a.name.localeCompare(b.name))
      .forEach((member) => directoryEl.appendChild(buildCard(member)));

    memberCountEl.textContent = `${members.length} member businesses listed`;
  } catch (error) {
    directoryEl.innerHTML = `<p class="loading-msg">Sorry, the directory could not be loaded right now.</p>`;
    memberCountEl.textContent = "";
    console.error("Error loading members.json:", error);
  }
}

function setView(view) {
  const isGrid = view === "grid";
  directoryEl.classList.toggle("grid-view", isGrid);
  directoryEl.classList.toggle("list-view", !isGrid);

  gridBtn.classList.toggle("active", isGrid);
  gridBtn.setAttribute("aria-pressed", isGrid);

  listBtn.classList.toggle("active", !isGrid);
  listBtn.setAttribute("aria-pressed", !isGrid);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

loadDirectory();
