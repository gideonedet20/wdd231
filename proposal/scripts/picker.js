// Home page: "Surprise me" button fetches parks.json once and reveals
// a random park each time it's clicked — the interactive hook on the
// landing page itself, separate from the full browser on parks.html.

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#surprise-btn");
  const resultBox = document.querySelector("#surprise-result");
  if (!button || !resultBox) return;

  let parks = [];
  let lastId = null;

  async function loadParks() {
    try {
      const response = await fetch("data/parks.json");
      if (!response.ok) throw new Error("Network response was not ok");
      parks = await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  function showRandomPark() {
    if (parks.length === 0) return;
    let pick = parks[Math.floor(Math.random() * parks.length)];
    if (parks.length > 1) {
      while (pick.id === lastId) {
        pick = parks[Math.floor(Math.random() * parks.length)];
      }
    }
    lastId = pick.id;

    resultBox.innerHTML = `
      <div class="park-name">${pick.name}</div>
      <div class="park-meta">${pick.state} state · ${pick.type}</div>
      <p>${pick.blurb}</p>
    `;
    resultBox.classList.add("is-visible");
  }

  button.addEventListener("click", async () => {
    if (parks.length === 0) {
      button.textContent = "Loading…";
      await loadParks();
      button.textContent = "Pick another state park";
    }
    showRandomPark();
  });
});
