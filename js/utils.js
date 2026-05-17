const eventListeners = [];

export function registerEventListener(element, type, handler) {
    element.addEventListener(type, handler);
    eventListeners.push([element, type, handler]);
}

export function destroyEventListeners() {

    eventListeners.forEach(([element, type, handler]) => {
        element.removeEventListener(type, handler);
    });

    // clear after cleanup
    eventListeners.length = 0;
}

export async function scrollToTarget(scrollTarget) {
    await new Promise(resolve => setTimeout(resolve, 10));
    
    let element = document.getElementById(scrollTarget);
    
    if (!element && scrollTarget.includes('-')) {
        element = document.getElementById(scrollTarget.replace(/-/g, ' '));
    }
    
    if (element) {
        // Get element position
        const position = element.getBoundingClientRect().top + window.scrollY;
        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
        
        // Scroll to position minus header height
        window.scrollTo({
            top: position - headerHeight,
            behavior: "smooth"
        });
        return true;
    }
    
    return false;
}

function sanitize(text = "") {
    return text.replace(/[<>]/g, "").trim();
}

export function sendEmail(name, email, subject = "", message = "") {

    if (!name || !email || !message) {
        alert("Fill all required fields.");
        return;
    }

    const recipient = "lwaziradebe48@gmail.com";

    const cleanSubject = sanitize(subject || "Contact Form Submission");

    const body =
`From: ${sanitize(name)}
Email: ${sanitize(email)}

${sanitize(message)}`;

    const gmail =
        `https://mail.google.com/mail/?view=cm&fs=1` +
        `&to=${encodeURIComponent(recipient)}` +
        `&su=${encodeURIComponent(cleanSubject)}` +
        `&body=${encodeURIComponent(body)}`;

    // 🔥 ALWAYS open Gmail first (reliable)
    const windowOpened = window.open(gmail, "_blank");

    // Only fall back to mailto if the popup was blocked
    if (!windowOpened) {
        const mailto =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(cleanSubject)}` +
            `&body=${encodeURIComponent(body)}`;
    
        window.location.href = mailto;
    }
}

/*
 * Creates and appends skeleton loaders to a container.
 * @param {HTMLElement} container - Where to inject the skeletons
 * @param {number} count - How many skeletons to create
 * @param {object} options - Styling options
 * @param {string} options.height - Height of each skeleton (e.g., "200px")
 * @param {string} options.width - Width of each skeleton (e.g., "100%")
 * @param {string} options.gap - Gap between skeletons (e.g., "16px")
 * @param {string} options.gridTemplateColumns - Grid columns (e.g., "repeat(3, 1fr)")
 * @param {string} options.display - Display type (default: "grid")
 * @returns {HTMLElement} The wrapper element — remove it later when content loads
 */
 
export class Skeletons {
  constructor() {
    this.wrapper = null;
  }

  create(container, count, options = {}) {
    const {
      height = "200px",
      width = "100%",
      gap = "16px",
      gridTemplateColumns = "repeat(3, 1fr)",
      display = "grid",
    } = options;

    const wrapper = document.createElement("div");
    wrapper.className = "skeleton-wrapper";
    wrapper.style.display = display;
    wrapper.style.gap = gap;
    wrapper.style.gridTemplateColumns = gridTemplateColumns;
    wrapper.style.width = "100%";

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "skeleton";
      el.style.height = height;
      el.style.width = width;
      wrapper.appendChild(el);
    }

    container.appendChild(wrapper);
    this.wrapper = wrapper;
    return wrapper;
  }

  remove() {
    if (!this.wrapper) return;
    setTimeout(() => {
        this.wrapper.classList.add("removing");
        registerEventListener(this.wrapper, "transitionend", () => {
            this.wrapper.remove();
        });
    }, 150); // small pause before fade starts, not after
  }
}
    
export function titleCase(dirtyTitle) {
    const title = dirtyTitle.replace(/[^a-zA-Z0-9\s]/g, " ");
    const cleanTitle = title
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    
    return cleanTitle;
}