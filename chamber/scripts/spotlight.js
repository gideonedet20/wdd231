// ---------------------------------------------------------
// Member spotlight (home page) - pulls 3 random Silver/Gold members
// ---------------------------------------------------------

const spotlightGrid = document.getElementById("spotlightGrid");
const tierNames = { 1: "Member", 2: "Silver", 3: "Gold" };

function pickRandomMembers(members, count) {
  const eligible = members.filter((m) => m.membership === 2 || m.membership === 3);
  const shuffled = eligible.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function buildSpotlightCard(member) {
  const card = document.createElement("article");
  card.className = "member-card spotlight-card";

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
    <div class="card-actions">
      <a href="${member.url}" target="_blank" rel="noopener">Visit website &rarr;</a>
    </div>
  `;
  card.appendChild(body);

  return card;
}

async function loadSpotlight() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();

    const picks = pickRandomMembers(data.members, 3);
    spotlightGrid.innerHTML = "";
    picks.forEach((member) => spotlightGrid.appendChild(buildSpotlightCard(member)));
  } catch (error) {
    spotlightGrid.innerHTML = `<p class="loading-msg">Spotlight members could not be loaded right now.</p>`;
    console.error("Error loading spotlight members:", error);
  }
}

loadSpotlight();
