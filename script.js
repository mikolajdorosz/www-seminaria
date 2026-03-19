const progressBar = document.querySelector("#progressBar");
const navContainer = document.querySelector("#navContainer");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll("#navMenu a");
const navHamburger = document.querySelector("#navHamburger");
const sections = document.querySelectorAll(".section");
const heroTitle = document.querySelector(".hero h2");
const scrollToBtn = document.querySelector("#scrollToBtn");
const scrollByBtn = document.querySelector("#scrollByBtn");

// SCROLL on window

const scrollHandler = () => {
    console.log(
        "Przewijam!",
        "scrollY (pageYOffset):",
        scrollY,
        "scrollX (pageXOffset):",
        scrollX,
    );

    progressHandler();
    navbarHandler();
    heroHandler();
    sectionsHandler();
};
window.addEventListener("scroll", scrollHandler);

const progressHandler = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
};

const navbarHandler = () => {
    if (window.scrollY > 100) navContainer.classList.add("small-nav-container");
    else navContainer.classList.remove("small-nav-container");
};

const heroHandler = () => {
    const initialFont = 42;
    const decrease = 32;
    const minFont = initialFont - decrease;
    const scrollFraction = Math.min(window.scrollY / window.innerHeight, 1);
    const newFont = initialFont - scrollFraction * decrease;
    heroTitle.style.fontSize = `${Math.max(newFont, minFont)}px`;
};

const sectionsHandler = () => {
    sections.forEach((section) => {
        const elementTop = section.getBoundingClientRect().top;
        if (elementTop < window.innerHeight / 2)
            section.classList.add("visible");
    });
};

// SCROLL on element

const horizontalHandler = (e) => {
    scrollElementX = e.currentTarget.scrollLeft;
    console.log("Przewijam!", "scrollLeft:", scrollElementX);
    e.currentTarget.style.color = `rgb(${scrollElementX}, ${255 - scrollElementX}, ${scrollElementX})`;
};
sections[0].addEventListener("scroll", horizontalHandler);

const verticalHandler = (e) => {
    scrollElementY = e.currentTarget.scrollTop;
    console.log("Przewijam!", "scrollTop:", scrollElementY);
    e.currentTarget.style.color = `rgb(${scrollElementY}, ${scrollElementY}, ${255 - scrollElementY})`;
};
sections[1].addEventListener("scroll", verticalHandler);

// RESIZE

const resizeHandler = () => {
    console.log(
        "Zmieniam rozmiar!",
        "innerHeight:",
        innerHeight,
        "outerHeight:",
        outerHeight,
        "innerWidth:",
        innerWidth,
        "outerWidth:",
        outerWidth,
    );

    mobileHandler();
};
window.addEventListener("resize", resizeHandler);

const mobileHandler = () => {
    if (window.innerWidth <= 768) {
        navHamburger.style.display = "block";
        navMenu.classList.add("mobile");
        sections.forEach((section) => {
            section.classList.add("mobile");
        });
    } else {
        navHamburger.style.display = "none";
        navHamburger.textContent = "☰";
        navMenu.classList.remove("mobile");
        navMenu.classList.remove("active");
        sections.forEach((section) => {
            section.classList.remove("mobile");
        });
    }
};

// SCROLL functions

scrollToBtn.addEventListener("click", () => {
    // window.scroll(0, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
});
scrollByBtn.addEventListener("click", () => {
    window.scrollBy({ top: 200, behavior: "instant" });
});

navHamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    if (navMenu.classList.contains("active")) navHamburger.textContent = "✕";
    else navHamburger.textContent = "☰";
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navHamburger.textContent = "☰";
    });
});

window.addEventListener("DOMContentLoaded", () => {
    resizeHandler();
    scrollHandler();
});
