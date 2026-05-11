const RATE_CCYS   = ["EUR","GBP","JPY","AUD","CHF","CAD","NZD","SGD","ZAR"];
const FALLBACK    = { USD:1, EUR:1.085, GBP:1.27, JPY:0.0067, AUD:0.65, NZD:0.60, CHF:1.12, CAD:0.74, SGD:0.74, ZAR:0.055 };
const CCY_SYMBOLS = { USD:"$", EUR:"€", GBP:"£", JPY:"¥", AUD:"A$", CHF:"Fr", CAD:"C$", NZD:"NZ$", SGD:"S$", ZAR:"R" };

let rates     = { ...FALLBACK };
let direction = "buy";

const $ = id => document.getElementById(id);

// ── Rates ──────────────────────────────────────────────

function buildRatesGrid() {
  $("rates-grid").innerHTML = RATE_CCYS.map(c => {
    const v = rates[c] ? (1 / rates[c]) : null;
    const d = v ? v.toFixed(c === "JPY" ? 2 : c === "ZAR" ? 4 : 4) : "…";
    return `<div class="rate-card">
      <div class="rate-pair">USD/${c}</div>
      <div class="rate-val">${d}</div>
    </div>`;
  }).join("");
}

function fetchRates() {
  console.log("Fetching rates...");
  fetch("https://api.frankfurter.app/latest?from=USD")
    .then(r => {
      console.log("Response:", r.status);
      return r.json();
    })
    .then(data => {
      console.log("Data received:", data);
      // ... rest
    })
    .catch(err => {
      console.error("Fetch failed:", err);
      $("status-dot").style.background = "var(--amber)";
      $("status-text").textContent = "Cached rates";
      buildRatesGrid();
    });
}

// ── Direction ──────────────────────────────────────────

function setDirection(dir) {
  direction = dir;
  $("btn-buy").className  = "dir-btn" + (dir === "buy"  ? " active-buy"  : "");
  $("btn-sell").className = "dir-btn" + (dir === "sell" ? " active-sell" : "");
  calculate();
}

// ── Calculation helpers ────────────────────────────────

function getPipSize(pair) { return pair.includes("JPY") ? 0.01 : 0.0001; }

function convert(amount, from, to) {
  if (from === to) return amount;
  if (!rates[from] || !rates[to]) return amount;
  return (amount / rates[from]) * rates[to];
}

function getPipValue(pair, acctCcy, price) {
  const quote = pair.split("/")[1];
  const pip   = getPipSize(pair);
  let pv = pip * 100000;
  if (quote === "JPY") pv = (pip * 100000) / (price || 150);
  return convert(pv, quote, acctCcy);
}

function fmt(n, dec) {
  return n.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function sym(ccy) { return CCY_SYMBOLS[ccy] || ccy; }

// ── Calculate ──────────────────────────────────────────

function calculate() {
  const pair    = $("pair").value;
  const acct    = $("acct-ccy").value;
  const entry   = parseFloat($("entry").value);
  const sl      = parseFloat($("sl").value);
  const tp      = parseFloat($("tp").value);
  const balance = parseFloat($("balance").value);
  const riskPct = parseFloat($("risk-pct").value);

  $("ccy-prefix").textContent = sym(acct);

  const pipSize = getPipSize(pair);

  // SL direction hint
  const hint = $("sl-hint");
  if (!isNaN(entry) && !isNaN(sl)) {
    const bad = direction === "buy" ? sl >= entry : sl <= entry;
    hint.textContent = direction === "buy" ? "SL must be below entry" : "SL must be above entry";
    hint.style.display = bad ? "block" : "none";
  } else {
    hint.style.display = "none";
  }

  const slValid = !isNaN(entry) && !isNaN(sl)
    && ((direction === "buy" && sl < entry) || (direction === "sell" && sl > entry));

  const valid = slValid && !isNaN(balance) && !isNaN(riskPct)
             && balance > 0 && riskPct > 0 && riskPct <= 100;

  if (!valid) { clearResults(); return; }

  const slPips    = Math.abs(entry - sl) / pipSize;
  const tpPips    = (!isNaN(tp) && tp > 0) ? Math.abs(tp - entry) / pipSize : null;
  const rr        = tpPips ? tpPips / slPips : null;
  const riskAmt   = balance * (riskPct / 100);
  const rewardAmt = rr ? riskAmt * rr : null;
  const pipVal    = getPipValue(pair, acct, entry);
  const units     = (riskAmt / (slPips * pipVal)) * 100000;
  const stdLots   = units / 100000;

  $("hero-lots").textContent = fmt(stdLots, 2);
  $("hero-lots").classList.add("active");

  $("si-sl-pips").textContent    = fmt(slPips, 1) + " pips";
  $("si-tp-pips").textContent    = tpPips    ? fmt(tpPips, 1) + " pips"       : "—";
  $("si-rr").textContent         = rr        ? "1 : " + fmt(rr, 2)            : "—";
  $("si-risk-amt").textContent   = sym(acct) + fmt(riskAmt, 2);
  $("si-reward-amt").textContent = rewardAmt ? sym(acct) + fmt(rewardAmt, 2)  : "—";

  setVal("out-units",  Math.round(units).toLocaleString(), "active");
  setVal("out-mini",   fmt(units / 10000, 2), "active");
  setVal("out-micro",  fmt(units / 1000,  2), "active");
  setVal("out-pipval", sym(acct) + fmt(pipVal, 4), "amber");
}

function setVal(id, val, cls) {
  const el = $(id);
  el.textContent = val;
  el.className = "rc-value " + cls;
}

function clearResults() {
  $("hero-lots").textContent = "—";
  $("hero-lots").classList.remove("active");
  ["si-sl-pips","si-tp-pips","si-rr","si-risk-amt","si-reward-amt"]
    .forEach(id => $(id).textContent = "—");
  ["out-units","out-mini","out-micro","out-pipval"]
    .forEach(id => { $(id).textContent = "—"; $(id).className = "rc-value"; });
}

// ── Init ───────────────────────────────────────────────

function init() {
  buildRatesGrid();
  fetchRates();

  $("btn-buy").addEventListener("click",  () => setDirection("buy"));
  $("btn-sell").addEventListener("click", () => setDirection("sell"));

  ["pair","acct-ccy","entry","sl","tp","balance","risk-pct"]
    .forEach(id => $(id).addEventListener("input", calculate));

  calculate();
}

// ── Render ─────────────────────────────────────────────

export function render() {
  setTimeout(init, 0);

  return `
    <div id="header">
      <div class="brand">
        <div class="brand-mark">FX</div>
        <span class="brand-name">Position Calculator</span>
      </div>
      <div id="rate-status">
        <div id="status-dot"></div>
        <span id="status-text">Fetching rates…</span>
      </div>
    </div>

    <div id="main">

      <div id="left">

        <div class="section-label">Instrument</div>

        <div class="field">
          <label>Pair</label>
          <select id="pair">
            <option>EUR/USD</option><option>GBP/USD</option><option>USD/JPY</option>
            <option>USD/CHF</option><option>AUD/USD</option><option>NZD/USD</option>
            <option>USD/CAD</option><option>EUR/GBP</option><option>EUR/JPY</option>
            <option>GBP/JPY</option><option>AUD/JPY</option><option>USD/SGD</option>
            <option>USD/ZAR</option>
          </select>
        </div>

        <div class="field">
          <label>Direction</label>
          <div class="dir-toggle">
            <button class="dir-btn active-buy"  id="btn-buy">▲ BUY</button>
            <button class="dir-btn"             id="btn-sell">▼ SELL</button>
          </div>
        </div>

        <hr class="divider">
        <div class="section-label">Trade Levels</div>

        <div class="field">
          <label>Entry Price</label>
          <input id="entry" type="number" step="any" placeholder="e.g. 1.0850">
        </div>

        <div class="row-2">
          <div class="field">
            <label>Stop Loss</label>
            <input id="sl" type="number" step="any" placeholder="e.g. 1.0810">
            <div class="val-hint" id="sl-hint"></div>
          </div>
          <div class="field">
            <label>Take Profit <span class="optional-tag">optional</span></label>
            <input id="tp" type="number" step="any" placeholder="e.g. 1.0950">
          </div>
        </div>

        <hr class="divider">
        <div class="section-label">Account</div>

        <div class="row-2">
          <div class="field">
            <label>Currency</label>
            <select id="acct-ccy">
              <option>USD</option><option>EUR</option><option>GBP</option>
              <option>JPY</option><option>AUD</option><option>CHF</option>
              <option>CAD</option><option>NZD</option><option>SGD</option>
              <option>ZAR</option>
            </select>
          </div>
          <div class="field">
            <label>Risk %</label>
            <div class="input-wrap has-suffix">
              <input id="risk-pct" type="number" step="0.1" min="0.1" max="100" placeholder="1">
              <span class="input-suffix">%</span>
            </div>
          </div>
        </div>

        <div class="field">
          <label>Account Balance</label>
          <div class="input-wrap">
            <span class="input-prefix" id="ccy-prefix">$</span>
            <input id="balance" type="number" placeholder="10,000">
          </div>
        </div>

      </div>

      <div id="right">

        <div id="hero">
          <div class="hero-label">Position Size</div>
          <div class="hero-row">
            <span id="hero-lots">—</span>
            <span class="hero-unit">standard lots</span>
          </div>
        </div>

        <div id="summary-strip">
          <div class="strip-item">
            <span class="si-label">SL Distance</span>
            <span class="si-value" id="si-sl-pips">—</span>
          </div>
          <div class="strip-item">
            <span class="si-label">TP Distance</span>
            <span class="si-value" id="si-tp-pips">—</span>
          </div>
          <div class="strip-item">
            <span class="si-label">R : R</span>
            <span class="si-value amber" id="si-rr">—</span>
          </div>
          <div class="strip-item">
            <span class="si-label">At Risk</span>
            <span class="si-value red" id="si-risk-amt">—</span>
          </div>
          <div class="strip-item">
            <span class="si-label">Potential Gain</span>
            <span class="si-value green" id="si-reward-amt">—</span>
          </div>
        </div>

        <div id="result-grid">
          <div class="result-cell">
            <div class="rc-label">Units</div>
            <div class="rc-value" id="out-units">—</div>
          </div>
          <div class="result-cell">
            <div class="rc-label">Mini Lots</div>
            <div class="rc-value" id="out-mini">—</div>
          </div>
          <div class="result-cell">
            <div class="rc-label">Micro Lots</div>
            <div class="rc-value" id="out-micro">—</div>
          </div>
          <div class="result-cell">
            <div class="rc-label">Pip Value</div>
            <div class="rc-value" id="out-pipval">—</div>
            <div class="rc-sub">per pip / std lot</div>
          </div>
        </div>

        <div id="rates-section">
          <div class="rates-label">Live Rates · Base USD</div>
          <div id="rates-grid"></div>
        </div>

      </div>
    </div>
  `;
}