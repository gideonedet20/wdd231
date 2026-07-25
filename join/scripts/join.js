// ---------------------------------------------------------
// Port Harcourt Chamber of Commerce - Join page script
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

// --- Hidden timestamp field: set the moment the form loads ---
document.getElementById("timestamp").value = new Date().toISOString();

// --- Membership level modals ---
const tierLinks = document.querySelectorAll(".tier-link");
let lastFocusedTrigger = null;

function openModal(modal, trigger) {
  lastFocusedTrigger = trigger;
  modal.classList.add("open");
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.focus();
}

function closeModal(modal) {
  modal.classList.remove("open");
  if (lastFocusedTrigger) {
    lastFocusedTrigger.focus();
  }
}

tierLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const modal = document.getElementById(link.dataset.modal);
    if (modal) openModal(modal, link);
  });
});

document.querySelectorAll(".modal-overlay").forEach((modal) => {
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal(modal);
  });
});
