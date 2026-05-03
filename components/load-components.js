// Helper to wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  async function loadMenu() {
    const header = document.querySelector("header");
    if (!header) {
      console.error("No <header> element found on the page");
      return;
    }

    const menuOptions = ["rooms", "facilities", "gallery", "testimonials", "location", "contact"];
    
    const link = document.createElement("a");
    link.href = "/templates/about-tkc.html";
    
    const logo = document.createElement("img");
    logo.src = "/static/images/logos_and_icons/nav-logo.webp";
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
    
    let li1 = document.createElement("li");
    let a1 = document.createElement("a");
    a1.href = "/index.html";
    a1.textContent = "Home";
    li1.appendChild(a1);
    ul.appendChild(li1);
    
    menuOptions.forEach(option => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `/index.html#${option}`;
      a.textContent = option[0].toUpperCase() + option.slice(1);
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    let li2 = document.createElement("li");
    let a2 = document.createElement("a");
    a2.href = "/templates/apply.html";
    a2.textContent = "Apply Now";
    li2.appendChild(a2);
    ul.appendChild(li2);

    aside.appendChild(closeBtn);
    aside.appendChild(ul);
    document.body.appendChild(aside);

    // Ensure overlay exists; create if missing
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
    }

    function closeMenu() {
      aside.classList.remove("active");
      overlay.classList.remove("active");
    }

    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    aside.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) closeMenu();
    });
  }
  
  function initiateHeaderScrolling() {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      
      lastScrollY = window.scrollY;
    });
  }

  async function loadFooter() {
    const footer = document.createElement("div");
    footer.id = "footer-section";
    document.body.appendChild(footer);

    try {
      const response = await fetch("/templates/footer.html");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      document.getElementById("footer-section").innerHTML = html;
    } catch (error) {
      console.error("Footer load error:", error);
      document.getElementById("footer-section").innerHTML = "<p>Footer could not be loaded.</p>";
    }
  }

  // Execute both functions
  loadMenu();
  initiateHeaderScrolling();
  loadFooter();
  
});