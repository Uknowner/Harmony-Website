const routes = {
    'home': { file: 'home', render: 'render', init: 'init' },
    'gallery': { file: 'gallery', render: 'render', init: 'init' },
    'about': { file: 'home', render: 'renderAbout', init: 'initAbout' }, // Custom functions
    'apply': { file: 'apply', render: 'render', init: ""},
    'about-tkc': { file: 'about-tkc', render: 'render', init: ""},
    'facilities': {file: 'facilities', render: 'render', init: ''},
    'testimonials': {file: 'testimonials', render: 'render', init: 'init'},
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
        const viewConfig = routes[route] || { file: route, render: 'render' };
        await this.loadView(viewConfig);
    },

    async loadView(viewConfig) {
        const content = document.getElementById("content");
        try {
            const module = await import(`./views/${viewConfig.file}.js`);
            
            // Use specified render function or default to 'render'
            const renderFn = viewConfig.render || 'render';
            content.innerHTML = module[renderFn]();
            
            // Use specified init function if it exists in config
            if (viewConfig.init && module[viewConfig.init]) {
                module[viewConfig.init]();
            }
        } catch (e) {
            console.error(e);
            content.innerHTML = `<h2>Page not found</h2><pre>${e.message}</pre>`;
        }
    }
};