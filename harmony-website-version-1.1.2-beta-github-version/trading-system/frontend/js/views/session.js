export function render() {
    const html = `
        <h2>Trading Sessions</h2>
        <p>Market hours and session characteristics</p>

        <div class="session-overview">
            <div class="session-card" id="asian-card">
                <div class="session-header">
                    <span class="session-dot-large asian"></span>
                    <h3>Asian Session</h3>
                    <span class="session-time">00:00 - 09:00 UTC</span>
                </div>
                <div class="session-markets">
                    <h4>Major Markets</h4>
                    <ul>
                        <li>Tokyo</li>
                        <li>Sydney</li>
                        <li>Hong Kong</li>
                        <li>Singapore</li>
                    </ul>
                </div>
                <div class="session-pairs">
                    <h4>Active Pairs</h4>
                    <div class="pair-tags">
                        <span class="pair-tag">USD/JPY</span>
                        <span class="pair-tag">EUR/JPY</span>
                        <span class="pair-tag">GBP/JPY</span>
                        <span class="pair-tag">AUD/JPY</span>
                        <span class="pair-tag">AUD/USD</span>
                        <span class="pair-tag">NZD/USD</span>
                    </div>
                </div>
                <div class="session-characteristics">
                    <h4>Characteristics</h4>
                    <p>Lower volatility, range-bound trading. JPY and AUD pairs most active. Good for support/resistance trading.</p>
                </div>
            </div>

            <div class="session-card" id="london-card">
                <div class="session-header">
                    <span class="session-dot-large london"></span>
                    <h3>London Session</h3>
                    <span class="session-time">08:00 - 17:00 UTC</span>
                </div>
                <div class="session-markets">
                    <h4>Major Markets</h4>
                    <ul>
                        <li>London</li>
                        <li>Frankfurt</li>
                        <li>Zurich</li>
                    </ul>
                </div>
                <div class="session-pairs">
                    <h4>Active Pairs</h4>
                    <div class="pair-tags">
                        <span class="pair-tag">EUR/USD</span>
                        <span class="pair-tag">GBP/USD</span>
                        <span class="pair-tag">EUR/GBP</span>
                        <span class="pair-tag">EUR/CHF</span>
                        <span class="pair-tag">GBP/JPY</span>
                        <span class="pair-tag">FTSE 100</span>
                        <span class="pair-tag">DAX 40</span>
                    </div>
                </div>
                <div class="session-characteristics">
                    <h4>Characteristics</h4>
                    <p>Highest trading volume. Breakouts and trends are common. Best session for day trading and scalping.</p>
                </div>
            </div>

            <div class="session-card" id="ny-card">
                <div class="session-header">
                    <span class="session-dot-large ny"></span>
                    <h3>New York Session</h3>
                    <span class="session-time">13:00 - 22:00 UTC</span>
                </div>
                <div class="session-markets">
                    <h4>Major Markets</h4>
                    <ul>
                        <li>New York</li>
                        <li>Toronto</li>
                        <li>Chicago</li>
                    </ul>
                </div>
                <div class="session-pairs">
                    <h4>Active Pairs</h4>
                    <div class="pair-tags">
                        <span class="pair-tag">EUR/USD</span>
                        <span class="pair-tag">GBP/USD</span>
                        <span class="pair-tag">USD/JPY</span>
                        <span class="pair-tag">USD/CAD</span>
                        <span class="pair-tag">USD/CHF</span>
                        <span class="pair-tag">S&P 500</span>
                        <span class="pair-tag">Nasdaq</span>
                    </div>
                </div>
                <div class="session-characteristics">
                    <h4>Characteristics</h4>
                    <p>News-driven volatility. USD pairs dominate. Economic releases at 13:30 UTC can cause sharp moves.</p>
                </div>
            </div>
        </div>

        <div class="session-overlaps">
            <h3>Session Overlaps</h3>
            <div class="overlap-card">
                <h4>Asian - London</h4>
                <span class="overlap-time">08:00 - 09:00 UTC</span>
                <p>Thinner liquidity, but can see increased EUR/JPY and GBP/JPY movement as European banks enter.</p>
            </div>
            <div class="overlap-card highlight">
                <h4>London - New York</h4>
                <span class="overlap-time">13:00 - 17:00 UTC</span>
                <p>Busiest trading period. Highest liquidity and volatility. Best time for day trading. Major USD news at 13:30 UTC.</p>
            </div>
        </div>
    `;
    
    return html;
}