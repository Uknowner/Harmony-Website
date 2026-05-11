const routes = {
    'home': 'home',
    'chart': 'charts',           // maps #chart → views/charts.js
    'risk-calculator': 'calculator', // maps #risk-calculator → views/calculator.js
    'notes': 'notes',
    'journal': 'journal',
    'checklist': 'checklist',
    'news': 'news',
    'session': 'session',
};

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
        const viewName = routes[route] || route;
        await this.loadView(viewName);
    },

    async loadView(viewName) {
        const content = document.getElementById("content");
        try {
            const module = await import(`./views/${viewName}.js`);
            content.innerHTML = module.render();
            if (module.init) module.init();
        } catch (e) {
            console.error(e);
            content.innerHTML = `<h2>Page not found</h2><pre>${e.message}</pre>`;
        }
    }
};