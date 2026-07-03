const hamBtn = document.querySelector("#ham-btn");
const nav = document.querySelector("#nav");

hamBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    hamBtn.textContent =
        nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelector("#currentyear").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;