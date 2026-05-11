export function render() {
    const html = `
        <h2>Available Tools</h2>
        <p>Select a tool to get started</p>
        
        <div class="cards">

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                </div>
                <a href="#chart">
                    <h3>Chart</h3>
                    <p>View price charts with multiple timeframes and drawing tools</p>
                    <span>Open Chart</span>
                </a>
            </div>

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20V10"></path>
                        <path d="M18 20V4"></path>
                        <path d="M6 20v-4"></path>
                    </svg>
                </div>
                <a href="#risk-calculator">
                    <h3>Risk Calculator</h3>
                    <p>Calculate position size based on risk percentage and stop loss</p>
                    <span>Calculate</span>
                </a>
            </div>

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                </div>
                <a href="#notes">
                    <h3>Notes</h3>
                    <p>Save and organize your trading notes and observations</p>
                    <span>View Notes</span>
                </a>
            </div>

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                </div>
                <a href="#journal">
                    <h3>Journal</h3>
                    <p>Track your trades with detailed entry and performance history</p>
                    <span>Open Journal</span>
                </a>
            </div>

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                </div>
                <a href="#checklist">
                    <h3>Checklist</h3>
                    <p>Pre-trade checklist to follow your trading plan with discipline</p>
                    <span>Start Checklist</span>
                </a>
            </div>

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </div>
                <a href="#news">
                    <h3>News</h3>
                    <p>Economic calendar and live market news headlines</p>
                    <span>View News</span>
                </a>
            </div>

            <div class="card">
                <div class="card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>
                <a href="#session">
                    <h3>Session</h3>
                    <p>Learn about different sessions and what to trade</p>
                    <span>Start Session</span>
                </a>
            </div>

        </div>
    `;
    
    setTimeout(initHeaderClock, 0);
    setTimeout(initSessionTracker, 0);
    
    return html;
}

const header = document.querySelector("header");
const timeSessionContainer = document.createElement("div");
timeSessionContainer.id = "time-session-container";
header.appendChild(timeSessionContainer)

export function initHeaderClock() {
    
    if (!timeSessionContainer) return;
    
    // Prevent duplicate time containers
    if (header.querySelector("#time-container")) return;
    
    const timeContainer = document.createElement("div");
    timeContainer.id = "time-container";
    
    timeSessionContainer.appendChild(timeContainer);
    
    function updateTime() {
        const now = new Date();
        const hrs = String(now.getUTCHours()).padStart(2, '0');
        const mins = String(now.getUTCMinutes()).padStart(2, '0');
        const secs = String(now.getUTCSeconds()).padStart(2, '0');
        timeContainer.textContent = `${hrs}:${mins}:${secs}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

export function initSessionTracker() {
    
    if (!timeSessionContainer) return;
    
    // Fixed: querySelector on header, not getElementById
    const existingContainer = timeSessionContainer.querySelector("#session-container");
    
    if (existingContainer) return;
    
    const sessionContainer = document.createElement("div");
    sessionContainer.id = "session-container";
    
    const now = new Date();
    const day = now.getUTCDay(); // 0 = Sun, 6 = Sat

    
    
    const asianDot = document.createElement("span");
    asianDot.className = "session-dot asian";
    const asianLabel = document.createElement("span");
    asianLabel.textContent = "Asian";
    asianLabel.id = "session-name";
    
    const londonDot = document.createElement("span");
    londonDot.className = "session-dot london";
    const londonLabel = document.createElement("span");
    londonLabel.textContent = "London";
    londonLabel.id = "session-name";

    const nyDot = document.createElement("span");
    nyDot.className = "session-dot ny";
    const nyLabel = document.createElement("span");
    nyLabel.textContent = "NY";
    nyLabel.id = "session-name";

    const createSession = (dot, label) => {
        const group = document.createElement("div");
        group.className = "session-group";
        group.appendChild(dot);
        group.appendChild(label);
        return group;
    };

    const createSeparator = () => {
        const separator = document.createElement("div");
        separator.className = "session-separator";
        return separator;
    };

    sessionContainer.appendChild(createSession(asianDot, asianLabel));
    sessionContainer.appendChild(createSeparator());
    sessionContainer.appendChild(createSession(londonDot, londonLabel));
    sessionContainer.appendChild(createSeparator());
    sessionContainer.appendChild(createSession(nyDot, nyLabel));
    
    timeSessionContainer.appendChild(sessionContainer);
    
    function updateSessions() {
        const now = new Date();
        const hours = now.getUTCHours();
        
        asianDot.classList.toggle("active", hours >= 0 && hours < 9);
        londonDot.classList.toggle("active", hours >= 8 && hours < 17);
        nyDot.classList.toggle("active", hours >= 13 && hours < 22);
    }

    updateSessions();
    setInterval(updateSessions, 60000);
}