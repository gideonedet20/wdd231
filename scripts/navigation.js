const navToggle = document.getElementById("nav-toggle");
const primaryNav = document.getElementById("primary-nav");

navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

// Close the menu automatically after a link is tapped (mobile UX)
const navLinks = primaryNav.querySelectorAll("a");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
        navToggle.setAttribute("aria-label", "Open navigation");
    });
});

const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.getElementById("lastModified");
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}


const courses = [
    { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 1, completed: true },
    { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: false },
    { subject: "WDD", number: 231, title: "Web Frontend Development I", credits: 2, completed: false },
    { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false }
];

const courseListContainer = document.querySelector(".course-list");
const totalCreditsDisplay = document.getElementById("total-credits");
const filterButtons = document.querySelectorAll(".filter-btn");

function displayCourses(courseArray) {
    courseListContainer.innerHTML = "";

    courseArray.forEach((course) => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h4>${course.subject} ${course.number}</h4>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        courseListContainer.appendChild(card);
    });

    const total = courseArray.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `Total Credits: ${total}`;
}

function setActiveButton(activeBtn) {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

document.getElementById("all").addEventListener("click", (e) => {
    displayCourses(courses);
    setActiveButton(e.target);
});

document.getElementById("wdd").addEventListener("click", (e) => {
    displayCourses(courses.filter((course) => course.subject === "WDD"));
    setActiveButton(e.target);
});

document.getElementById("cse").addEventListener("click", (e) => {
    displayCourses(courses.filter((course) => course.subject === "CSE"));
    setActiveButton(e.target);
});

// Initial render on page load
displayCourses(courses);
