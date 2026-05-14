export const eventListeners = [];

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

    const mailto =
        `mailto:${recipient}` +
        `?subject=${encodeURIComponent(cleanSubject)}` +
        `&body=${encodeURIComponent(body)}`;

    // 🔥 ALWAYS open Gmail first (reliable)
    window.open(gmail, "_blank");

    // optional fallback attempt (not guaranteed)
    setTimeout(() => {
        window.location.href = mailto;
    }, 300);
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
export function createSkeletons(container, count, options = {}) {
    const {
        height = "200px",
        width = "100%",
        gap = "16px",
        gridTemplateColumns = "repeat(3, 1fr)",
        display = "grid"
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
    return wrapper;
}

export function titleCase(dirtyTitle) {
    const title = dirtyTitle.replace(/[^a-zA-Z0-9\s]/g, " ");
    const cleanTitle = title
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    
    return cleanTitle;
}