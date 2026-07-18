const membersData = [{"name": "RiverGold Oilfield Services Ltd.", "address": "14 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State", "phone": "(084) 461-2290", "url": "https://www.rivergoldoilfield.example.com", "image": "rivergold.svg", "membership": 3, "founded": 2004, "category": "Oil & Gas Services", "tagline": "Wellhead equipment, maintenance, and field logistics for the Niger Delta."}, {"name": "Garden City Hotels & Suites", "address": "22 Aba Road, Port Harcourt, Rivers State", "phone": "(084) 233-7710", "url": "https://www.gardencityhotels.example.com", "image": "gardencity.svg", "membership": 3, "founded": 1998, "category": "Hospitality", "tagline": "Business-class rooms and event halls in the heart of the city."}, {"name": "Niger Delta Logistics Co.", "address": "7 Harbour Road, Port Harcourt, Rivers State", "phone": "(084) 355-1187", "url": "https://www.ndlogistics.example.com", "image": "ndlogistics.svg", "membership": 2, "founded": 2011, "category": "Shipping & Logistics", "tagline": "Freight forwarding and warehousing along the Bonny River corridor."}, {"name": "Trans-Amadi Tech Hub", "address": "5B Woji Road, Port Harcourt, Rivers State", "phone": "(084) 902-4456", "url": "https://www.transamaditech.example.com", "image": "techhub.svg", "membership": 2, "founded": 2019, "category": "Technology & Coworking", "tagline": "Coworking desks, dev training, and startup mentorship."}, {"name": "Rivers Fresh Market", "address": "Mile 3 Market Road, Diobu, Port Harcourt, Rivers State", "phone": "(084) 778-3302", "url": "https://www.riversfreshmarket.example.com", "image": "freshmarket.svg", "membership": 1, "founded": 2015, "category": "Retail & Agriculture", "tagline": "Wholesale produce sourced from farms across Rivers State."}, {"name": "Golden Delta Community Bank", "address": "31 Olu Obasanjo Road, Port Harcourt, Rivers State", "phone": "(084) 611-0075", "url": "https://www.goldendeltabank.example.com", "image": "goldendelta.svg", "membership": 3, "founded": 1991, "category": "Banking & Finance", "tagline": "Small-business loans and savings products for local entrepreneurs."}, {"name": "AgroLink Rivers", "address": "18 Ada George Road, Port Harcourt, Rivers State", "phone": "(084) 540-2216", "url": "https://www.agrolinkrivers.example.com", "image": "agrolink.svg", "membership": 1, "founded": 2021, "category": "Agricultural Technology", "tagline": "Connecting smallholder farmers to buyers with SMS-based market pricing."}, {"name": "Bonny Street Textiles", "address": "9 Bonny Street, Port Harcourt, Rivers State", "phone": "(084) 289-6641", "url": "https://www.bonnystreettextiles.example.com", "image": "bonnystreet.svg", "membership": 1, "founded": 2008, "category": "Retail & Fashion", "tagline": "Locally woven fabrics and made-to-order tailoring."}];
const tierNames = { 1: "Member", 2: "Silver", 3: "Gold" };
 
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");
navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
document.getElementById("copyrightYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
 
const weatherCard = document.getElementById("weatherCard");
weatherCard.innerHTML = '<p class="loading-msg">Add your OpenWeatherMap API key in js/weather.js to show live conditions.</p>';
 
const logoData = {
  "rivergold.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJSaXZlckdvbGQgT2lsZmllbGQgU2VydmljZXMgbG9nbyI+CiAgPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiNDOThBMkIiLz4KICA8cGF0aCBkPSJNNDggMjBjOCAxMiAxNiAyMiAxNiAzMmExNiAxNiAwIDAgMS0zMiAwYzAtMTAgOC0yMCAxNi0zMnoiIGZpbGw9IiNGQkYzRTEiLz4KICA8Y2lyY2xlIGN4PSI0OCIgY3k9IjU4IiByPSI2IiBmaWxsPSIjQzk4QTJCIi8+Cjwvc3ZnPgo=",
  "gardencity.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJHYXJkZW4gQ2l0eSBIb3RlbHMgYW5kIFN1aXRlcyBsb2dvIj4KICA8Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iIzBGNEMzQSIvPgogIDxyZWN0IHg9IjMwIiB5PSIzNCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM0IiBmaWxsPSIjRjZGMkU5Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSIyNCwzNCA0OCwxOCA3MiwzNCIgZmlsbD0iI0Y2RjJFOSIvPgogIDxyZWN0IHg9IjM4IiB5PSI0NiIgd2lkdGg9IjYiIGhlaWdodD0iOCIgZmlsbD0iIzBGNEMzQSIvPgogIDxyZWN0IHg9IjUyIiB5PSI0NiIgd2lkdGg9IjYiIGhlaWdodD0iOCIgZmlsbD0iIzBGNEMzQSIvPgogIDxyZWN0IHg9IjQ0IiB5PSI1OCIgd2lkdGg9IjgiIGhlaWdodD0iMTAiIGZpbGw9IiMwRjRDM0EiLz4KPC9zdmc+Cg==",
  "ndlogistics.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJOaWdlciBEZWx0YSBMb2dpc3RpY3MgQ29tcGFueSBsb2dvIj4KICA8Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iIzJFN0Q2QiIvPgogIDxwYXRoIGQ9Ik0yNCA1Mmg0OGwtOCAxNEgzMnoiIGZpbGw9IiNGNkYyRTkiLz4KICA8cmVjdCB4PSI0MiIgeT0iMzAiIHdpZHRoPSI2IiBoZWlnaHQ9IjIyIiBmaWxsPSIjRjZGMkU5Ii8+CiAgPHBhdGggZD0iTTQ4IDMwbDE0IDgtMTQgNnoiIGZpbGw9IiNGNkYyRTkiLz4KPC9zdmc+Cg==",
  "techhub.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJUcmFucy1BbWFkaSBUZWNoIEh1YiBsb2dvIj4KICA8Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSI0OCIgZmlsbD0iIzBBMzQyOCIvPgogIDxyZWN0IHg9IjM0IiB5PSIzNCIgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiByeD0iMyIgZmlsbD0iI0Y2RjJFOSIvPgogIDxyZWN0IHg9IjQyIiB5PSI0MiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSIjMEEzNDI4Ii8+CiAgPGcgc3Ryb2tlPSIjRjZGMkU5IiBzdHJva2Utd2lkdGg9IjMiPgogICAgPGxpbmUgeDE9IjQ4IiB5MT0iMjIiIHgyPSI0OCIgeTI9IjM0Ii8+CiAgICA8bGluZSB4MT0iNDgiIHkxPSI2MiIgeDI9IjQ4IiB5Mj0iNzQiLz4KICAgIDxsaW5lIHgxPSIyMiIgeTE9IjQ4IiB4Mj0iMzQiIHkyPSI0OCIvPgogICAgPGxpbmUgeDE9IjYyIiB5MT0iNDgiIHgyPSI3NCIgeTI9IjQ4Ii8+CiAgPC9nPgo8L3N2Zz4K",
  "freshmarket.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJSaXZlcnMgRnJlc2ggTWFya2V0IGxvZ28iPgogIDxjaXJjbGUgY3g9IjQ4IiBjeT0iNDgiIHI9IjQ4IiBmaWxsPSIjQzk4QTJCIi8+CiAgPHBhdGggZD0iTTMwIDQyaDM2bC00IDI2YTQgNCAwIDAgMS00IDRIMzhhNCA0IDAgMCAxLTQtNHoiIGZpbGw9IiNGNkYyRTkiLz4KICA8cGF0aCBkPSJNMzYgNDJjMC0xMCA1LTE4IDEyLTE4czEyIDggMTIgMTgiIHN0cm9rZT0iI0Y2RjJFOSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIi8+Cjwvc3ZnPgo=",
  "goldendelta.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJHb2xkZW4gRGVsdGEgQ29tbXVuaXR5IEJhbmsgbG9nbyI+CiAgPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiMwRjRDM0EiLz4KICA8cG9seWdvbiBwb2ludHM9IjQ4LDIyIDc0LDM2IDIyLDM2IiBmaWxsPSIjRjZGMkU5Ii8+CiAgPHJlY3QgeD0iMjYiIHk9IjQwIiB3aWR0aD0iNiIgaGVpZ2h0PSIyNCIgZmlsbD0iI0Y2RjJFOSIvPgogIDxyZWN0IHg9IjQ1IiB5PSI0MCIgd2lkdGg9IjYiIGhlaWdodD0iMjQiIGZpbGw9IiNGNkYyRTkiLz4KICA8cmVjdCB4PSI2NCIgeT0iNDAiIHdpZHRoPSI2IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjZGMkU5Ii8+CiAgPHJlY3QgeD0iMjIiIHk9IjY2IiB3aWR0aD0iNTIiIGhlaWdodD0iNiIgZmlsbD0iI0Y2RjJFOSIvPgo8L3N2Zz4K",
  "agrolink.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJBZ3JvTGluayBSaXZlcnMgbG9nbyI+CiAgPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiMyRTdENkIiLz4KICA8cGF0aCBkPSJNNDggNzBWNDAiIHN0cm9rZT0iI0Y2RjJFOSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPHBhdGggZD0iTTQ4IDQwYzAtMTItMTAtMTgtMjAtMTggMCAxMiA4IDIwIDIwIDE4eiIgZmlsbD0iI0Y2RjJFOSIvPgogIDxwYXRoIGQ9Ik00OCA1MGMwLTEwIDktMTYgMTgtMTYgMCAxMC03IDE4LTE4IDE2eiIgZmlsbD0iI0Y2RjJFOSIvPgo8L3N2Zz4K",
  "bonnystreet.svg": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOTYgOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJCb25ueSBTdHJlZXQgVGV4dGlsZXMgbG9nbyI+CiAgPGNpcmNsZSBjeD0iNDgiIGN5PSI0OCIgcj0iNDgiIGZpbGw9IiMwQTM0MjgiLz4KICA8Y2lyY2xlIGN4PSI0OCIgY3k9IjQ4IiByPSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjZGMkU5IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8cGF0aCBkPSJNNDggMzJ2MzJNMzIgNDhoMzIiIHN0cm9rZT0iI0Y2RjJFOSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHBhdGggZD0iTTQ4IDIwYzggNiA4IDEyIDAgMThNNDggNzZjOC02IDgtMTIgMC0xOE0yMCA0OGM2LTggMTItOCAxOCAwTTc2IDQ4Yy02IDgtMTIgOC0xOCAwIiBzdHJva2U9IiNGNkYyRTkiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K"
};
 
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
  logo.src = logoData[member.image];
  logo.alt = `${member.name} logo`;
  logo.width = 64;
  logo.height = 64;
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
 
const spotlightGrid = document.getElementById("spotlightGrid");
const picks = pickRandomMembers(membersData, 3);
spotlightGrid.innerHTML = "";
picks.forEach((member) => spotlightGrid.appendChild(buildSpotlightCard(member)));