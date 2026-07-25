// ---------------------------------------------------------
// Port Harcourt Chamber of Commerce - Thank You page script
// ---------------------------------------------------------

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

// --- Read submitted form data from the query string ---
const params = new URLSearchParams(window.location.search);

function fieldValue(name, fallback = "Not provided") {
  const value = params.get(name);
  return value && value.trim() !== "" ? value : fallback;
}

const firstName = fieldValue("firstName", "");
const lastName = fieldValue("lastName", "");

document.getElementById("thankName").textContent =
  firstName ? `${firstName} ${lastName}`.trim() : "friend";

document.getElementById("sumFirstName").textContent = fieldValue("firstName");
document.getElementById("sumLastName").textContent = fieldValue("lastName");
document.getElementById("sumEmail").textContent = fieldValue("email");
document.getElementById("sumPhone").textContent = fieldValue("phone");
document.getElementById("sumOrgName").textContent = fieldValue("orgName");

const rawTimestamp = params.get("timestamp");
document.getElementById("sumTimestamp").textContent = rawTimestamp
  ? new Date(rawTimestamp).toLocaleString()
  : "Not provided";
