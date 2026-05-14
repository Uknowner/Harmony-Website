import { destroyEventListeners } from "./utils.js";

const routes = {
    home: "home",
    gallery: "gallery",
    apply: "apply",
    contact: "contact",
    "about-tkc": "about-tkc",
    facilities: "facilities",
    testimonials: "testimonials",
    rooms: "rooms"
};

let currentModule = null;

export const router = {
    init() {
        window.addEventListener("hashchange", () => this.handleRoute());
        this.handleRoute();
    },

    getRoute() {
        return window.location.hash.replace("#", "") || "home";
    },

    async handleRoute() {
        const route = this.getRoute();
        const file = routes[route] || route;

        await this.loadView(file);
    },

    async loadView(file) {
        // cleanup previous view
        destroyEventListeners();
        window.scrollTo({ top: 0, behavior: "smooth" });

        const content = document.getElementById("content");

        try {
            const module = await import(`./views/${file}.js`);
            currentModule = module;

            // render
            content.innerHTML = module.render?.() || "";

            // init
            module.init?.();

        } catch (e) {
            const { render } = await import("./views/not-found.js");
            content.innerHTML = render();
            console.log(e);
        }
    }
};