export function render() {
  // Return the HTML
  const html = `
    <div class="tradingview-widget-container">
      <p>Provided by Trading View<p>
      <div id="tradingview-widget"></div>
    </div>
  `;
  
  // Schedule showNews to run after DOM is updated
  setTimeout(showNews, 0);
  
  return html;
}

export function showNews() {
  const widget = document.getElementById("tradingview-widget");
  
  if (!widget) {
    console.error("TradingView widget container not found");
    return;
  }

  // Mute TradingView's Snowplow analytics errors
  window.addEventListener('error', function(e) {
    if (e.filename && e.filename.includes('snowplow')) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
  script.async = true;
  script.innerHTML = JSON.stringify({
    colorTheme: "dark",
    isTransparent: false,
    width: "100%",
    height: "100%",
    locale: "en",
    importanceFilter: "0,1",
    countryFilter: "us,eu,jp"
  });

  widget.appendChild(script);
}