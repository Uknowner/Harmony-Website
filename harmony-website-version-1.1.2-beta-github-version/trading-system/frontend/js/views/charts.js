export function render() {
    return `
        <div id="chart-container">
            <div id="tradingview_eurusd"></div>
            <div id="chart-fallback" style="display:none;">
                ⚠️ Chart failed to load. Check your ad blocker or internet connection.
            </div>
        </div>
    `;
}

export function init() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = initializeWidget;
    script.onerror = showFallback;
    document.head.appendChild(script);
}

function initializeWidget() {
    try {
        new TradingView.widget({
            autosize: true,
            symbol: "FX:EURUSD",
            interval: "1",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            hide_top_toolbar: false,
            hide_legend: false,
            container_id: "tradingview_eurusd",
            studies: []
        });
    } catch (e) {
        showFallback();
    }
}

function showFallback() {
    const container = document.getElementById('tradingview_eurusd');
    const fallback = document.getElementById('chart-fallback');
    if (container && fallback) {
        container.style.display = 'none';
        fallback.style.display = 'flex';
    }
}