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
        let scrollTarget = null;
        
        // #gallery?scroll=single%20rooms
        if (file.includes("?")) {
            scrollTarget = file.split("=")[1];
        
            // Check if scrollTarget exists and has %20
            if (scrollTarget && scrollTarget.includes("%20")) {
                scrollTarget = scrollTarget.replace("%20", "-");
            }
        }
        
        file = file.includes("?") 
            ? file.split("?")[0] 
            : file;      
        
        if (file !== "home") window.scrollTo({ top: 0, behavior: "smooth" });

        const content = document.getElementById("content");

        try {
            const module = await import(`./views/${file}.js`);
            currentModule = module;

            // render
            content.innerHTML = module.render?.() || "";

            // init
            module.init?.(scrollTarget);

        } catch (e) {
            const { render } = await import("./views/not-found.js");
            content.innerHTML = render();
            console.log(e);
        }
    }
};