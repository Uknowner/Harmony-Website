import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
    router.init();
    loadMenu();
});

function loadMenu() {
    const header = document.querySelector("header");
    if (!header) {
        console.error("No <header> element found on the page");
        return;
    }

    const menuOptions = ["home", "rooms", "facilities", "gallery", "testimonials", "contact", "apply"];
    
    const link = document.createElement("a");
    link.href = "#about-tkc";
    
    const logo = document.createElement("img");
    logo.src = "assets/images/logos/nav-logo.webp";
    logo.alt = "TKC properties logo";
    logo.classList.add("tkc-logo");

    const menuBtn = document.createElement("button");
    menuBtn.id = "menuBtn";
    menuBtn.classList.add("menu-btn");
    menuBtn.setAttribute("aria-label", "Menu");
    menuBtn.textContent = "☰";
    
    link.appendChild(logo);
    header.appendChild(link);
    header.appendChild(menuBtn);

    const aside = document.createElement("aside");
    aside.id = "sidebar";
    aside.classList.add("sidebar");

    const closeBtn = document.createElement("button");
    closeBtn.id = "closeBtn";
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "✕";

    const ul = document.createElement("ul");
    
    menuOptions.forEach(option => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${option}`;
        a.textContent = option[0].toUpperCase() + option.slice(1);
        li.appendChild(a);
        ul.appendChild(li);
    });

    aside.appendChild(closeBtn);
    aside.appendChild(ul);
    document.body.appendChild(aside);

    let overlay = document.getElementById("overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.classList.add("overlay");
        document.body.appendChild(overlay);
    }

    function openMenu() {
        aside.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    function closeMenu() {
        aside.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    aside.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link) closeMenu();
    });

    initiateHeaderScrolling();
}

function initiateHeaderScrolling() {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        lastScrollY = window.scrollY;
    });
}