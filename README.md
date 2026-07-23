# Portfolio Analytics

A self-contained, single-file portfolio analytics dashboard built for long-term,
multi-exchange investors. No installation, no backend, no account required — open
the page, import a CSV, and get a full picture of your portfolio.

**[→ Feature overview](https://gumbyone.github.io/Gumby-s-Portfolio-analytics/feature-sheet.html)**
---

## What it does

Portfolio Analytics is a browser-based tool that turns a CSV of your transaction
history into a comprehensive investment dashboard. Prices and dividends are fetched
live from Yahoo Finance each session. Everything else — NAV, P&L, returns, risk
metrics, dividend income — is calculated in your browser from your own data.

---

## Features

### 📊 Dashboard
- Portfolio NAV over time with range controls (1M / 3M / 6M / YTD / 1Y / All)
- Unrealised P&L, day change (vs. prior session close), and position count
- Asset allocation donut and sector exposure bar chart
- Dividend income KPIs: YTD received, projected to year-end, yield on cost

### 💼 Holdings
- All open positions with shares, average cost, current price, SGD value, P&L and weight
- Filter by asset type (Stock / ETF / REIT / Bond) and sort by weight, P&L, or return %
- Exchange-aware EOD pricing — SGX, HKEX, KLSE, LSE, NYSE, NASDAQ

### 📈 Performance
- **TWR** (time-weighted return) and **XIRR** (money-weighted) since inception
- CAGR derived from TWR, Sharpe ratio, Sortino ratio, Calmar ratio, Beta, win rate
- Benchmark comparison vs. ES3 (STI ETF) with switch-fund XIRR, TWR diff, tracking error and information ratio
- Monthly returns heatmap (colour-coded, scrollable)
- Per-position performance attribution chart

### 🛡️ Risk & Drawdown
- Drawdown-from-peak chart over full history
- Daily VaR (95%) and CVaR / expected shortfall
- Return distribution histogram
- Rolling 30-day annualised volatility chart

### 🥧 Exposure & Analysis
- Breakdowns by asset type, exchange, and currency (live-recomputed in SGD)
- Concentration chart — top 10 positions by weight
- Full currency detail with FX rates

### 💰 Dividends
- Full dividend history per position and across the portfolio
- YTD income, projected year-end total, trailing 12-month chart
- Yield on cost (forward-looking, per position and aggregate)
- Annual income CAGR
- Upcoming ex-dates for SGX holdings (via dividends.sg)
- Manual dividend declaration entry for non-SGX holdings
- DRIP (dividend reinvestment) support

### 📋 Transactions
- Full transaction log with search, filter, and sort
- Add, edit, or delete individual transactions in-app
- Net cash flow chart

### 💹 Realised P&L
- Closed position summary with cost basis, proceeds, and return %
- Realised gain/loss history chart

### ⚙️ Corp Actions
- Manual entry for splits, mergers, rights issues, and MCB redemptions
- Applied automatically on every load

### 🔔 Alerts
- Price alerts on any holding — fires a notification when the threshold is crossed

### 📱 Mobile Snapshot (PWA)
- QR code generated from the desktop app encodes a holdings snapshot
- Mobile viewer live-fetches prices and FX on open — NAV, P&L, day change always current
- Works as a home screen app on iOS and Android

---

## Getting started

### Try it instantly
Open the [live app](https://gumbyone.github.io/Gumby-s-Portfolio-analytics/) and click
**Load demo** — no file needed.

### Import your own data

**Option A — Export from your broker or portfolio tracker**  
If your broker or tracker exports transactions as CSV, check that it includes at
minimum a `symbol` and `date` column.

**Option B — Build your own spreadsheet**  
Create a spreadsheet in Excel or Google Sheets with these columns, save as CSV, and
import via the Import tab:

```
action, exchange, symbol, date, shares, price, fees, currency, notes
```

| Column | Required | Notes |
|--------|----------|-------|
| `symbol` | ✓ | Ticker as listed on the exchange (e.g. `D05`, `AAPL`) |
| `date` | ✓ | `YYYY-MM-DD`, `DD/MM/YYYY`, or `DD.MM.YYYY` |
| `action` | | `Buy` or `Sell` — defaults to `Buy` |
| `exchange` | | `SGX`, `HKEX`, `NYSE`, `NASDAQ`, `LSE`, `KLSE`, `SSB` — defaults to `SGX` |
| `shares` | | Number of units |
| `price` | | Price per unit in the transaction currency |
| `fees` | | Brokerage/commission fees |
| `currency` | | `SGD`, `USD`, `HKD`, `GBP`, `MYR` etc. — defaults to `SGD` |
| `notes` | | Free text, optional |

A **blank template CSV** is available directly in the Import tab — click
*Download blank template*, fill it in, and import.

### Run locally

It's a single HTML file — no build step, no dependencies to install:

```bash
git clone https://github.com/GumbyOne/Gumby-s-Portfolio-analytics.git
cd Gumby-s-Portfolio-analytics
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

> **Note:** A local HTTP server is needed (rather than opening the file directly)
> because browsers block cross-origin requests from `file://` URLs. Any static
> server works — Python's built-in one is the simplest option.

---

## Supported exchanges

| Exchange | Suffix on Yahoo Finance | Currency |
|----------|------------------------|----------|
| SGX | `.SI` | SGD |
| HKEX | `.HK` | HKD |
| KLSE | `.KL` | MYR |
| LSE | `.L` | GBP |
| NYSE / NASDAQ | *(no suffix)* | USD |
| SSB / Bonds | *(no Yahoo data — held at cost)* | SGD |

Reference currency is SGD. Historical FX rates are fetched from Yahoo Finance for
accurate cost basis conversion across all currencies.

---

## Your data stays in your browser

This app has no backend and no analytics. Your transaction history is parsed and
held entirely in your browser's memory and `localStorage`. The only outbound network
calls are:

- **Yahoo Finance** — live prices, dividend history, and historical FX rates
- **dividends.sg** — upcoming SGX ex-dates

Nothing about your holdings, transactions, or identity is ever sent anywhere else.

If you run behind restrictive antivirus or firewall software, you may need to
whitelist:

```
query1.finance.yahoo.com
query2.finance.yahoo.com
corsproxy.io
api.allorigins.win
api.codetabs.com
dividends.sg
```

---

## How prices are fetched

Prices and dividend history come from Yahoo Finance's public chart API. Since Yahoo
doesn't serve CORS headers for direct browser requests, the app routes through a
chain of public CORS proxies (tried in order until one responds). If all proxies
are temporarily unavailable, the app falls back to a locally cached copy of the
last successful fetch rather than failing outright.

Price data is cached in `localStorage` between sessions and compacted automatically
to stay within the browser's ~5MB storage limit.

---

## Tech

- Vanilla HTML / CSS / JavaScript — no framework, no bundler, no `package.json`
- [Chart.js](https://www.chartjs.org/) for all charts
- [Tabler Icons](https://tabler.io/icons) for iconography
- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) for the mobile QR snapshot

Everything lives in one file by design — it can be opened, read, and modified
without any tooling.

---

## Limitations

- Live prices depend on free public data sources and CORS proxies. During an outage
  the app falls back to cached data rather than failing, but prices may be one
  session stale.
- Benchmark comparison uses ES3 (Nikko STI ETF) with dividend history sourced from
  Yahoo Finance and supplementary SSGA data. Pre-2013 dividend coverage is patched
  manually.
- This is a personal analytics tool, not financial advice. Always verify
  decision-relevant figures against your broker's own statements.

---

## License

Copyright (c) 2026 GumbyOne

The source code is made available for **personal, non-commercial use only**.  
You may view, run, and modify the code for your own personal use.  
You may not redistribute, sublicense, publish modified versions, or use this code
(in whole or in part) in any commercial product or service without explicit written
permission from the author.
