# Portfolio Analytics

A self-contained, single-file portfolio analytics dashboard for multi-exchange dividend investors. No install, no backend, no account — open the page, import your CSV, and get a full performance, risk, and dividend breakdown.

**Live demo:** [gumbyone.github.io/Gumby-s-Portfolio-analytics](https://gumbyone.github.io/Gumby-s-Portfolio-analytics/)

---

## Features

### Dashboard
- Portfolio NAV with interactive time-range selector (1M / 3M / 6M / YTD / 1Y / All)
- KPI cards: NAV, XIRR, TWR, day change (with ES3 benchmark reference), capital P&L, dividend YTD, projected year-end income, trailing 12-month dividends
- Daily value change bar chart with top gainers and losers
- Asset allocation doughnut and sector exposure breakdown

### Holdings
- Combined holdings table with EOD closing prices from Yahoo Finance
- Per-position: shares, average cost, EOD close (color-coded green/red), day change in SGD and %, value, P&L, return %, weight
- Filter by type (Stock / ETF / REIT / Bond), sort by weight, day change %, P&L, return, or symbol
- Search by symbol or name
- Click any symbol for a detailed overlay with price chart, dividend history, and transaction log

### Performance
- Sharpe ratio, Sortino ratio, CAGR, alpha/beta vs ES3 benchmark
- TWR (time-weighted return) with proper chain-link methodology
- XIRR (cash-flow-weighted) for both portfolio and ES3 switch-fund comparison
- Portfolio vs benchmark cumulative return chart (rebased to 100)
- Monthly returns heatmap and per-position return attribution

### Risk & Drawdown
- Drawdown-from-peak chart
- Annualised volatility, VaR (95%), CVaR / expected shortfall, max drawdown
- Daily return distribution histogram
- Rolling 30-day volatility chart

### Dividends
- Dividend calendar with upcoming ex-dates (sourced from dividends.sg for SGX)
- Historical dividend timeline and per-position breakdown
- YTD received vs projected year-end income
- Manual dividend declarations for positions not covered by Yahoo Finance

### Exposure
- Breakdowns by asset type, exchange, and currency (with live FX conversion to SGD)
- Concentration chart for top 10 positions
- Portfolio summary with current/closed position filtering and per-ticker drill-down

### Additional Features
- Multi-portfolio support with independent naming and segmentation
- Price and FX rate caching in localStorage with smart compression
- Three-tier CORS proxy fallback chain for Yahoo Finance fetches
- Manual price overrides for unlisted securities (e.g. Astrea bonds)
- Corporate actions tracking (stock splits, consolidations)
- Export/import full backup as JSON, auto-backup to a designated folder
- Transaction history with editable entries and CSV re-export

---

## Getting Started

### Try it instantly
Click **Load demo** on the [live demo](https://gumbyone.github.io/Gumby-s-Portfolio-analytics/) — no file needed.

### Use your own data

1. Prepare a CSV file with your transaction history (see format below)
2. Open the app and go to the **Import** tab
3. Drop your CSV/TSV file or click **Browse file**
4. Click **Fetch Prices** to pull live EOD data from Yahoo Finance

#### CSV format

Your CSV needs a header row followed by one row per transaction:

```csv
action,exchange,symbol,date,shares,price,fees,currency,notes
Buy,SGX,D05,15/03/2020,500,20.50,25.00,SGD,DBS accumulate
Buy,SGX,C38U,10/06/2021,2000,2.15,12.80,SGD,CapitaLand Integrated
Sell,SGX,D05,02/01/2023,200,35.80,25.00,SGD,Partial profit taking
Buy,LSE,IWDA,18/07/2022,50,68.30,15.00,USD,iShares World ETF
Buy,HKEX,3988,05/09/2023,1000,3.45,50.00,HKD,Bank of China
Buy,NYSE,AAPL,12/11/2023,10,185.50,5.00,USD,Apple
```

A blank template CSV (`demo-portfolio.csv`) is included in this repo — download it, fill in your own transactions, and import.

| Field | Values |
|-------|--------|
| `action` | `Buy` / `Sell` / `1` / `-1` / `Fees` / `0` |
| `exchange` | `SGX`, `HKEX`, `NYSE`, `NASDAQ`, `LSE`, `KLSE`, `SSB`, etc. |
| `date` | `YYYY-MM-DD`, `DD/MM/YYYY`, or `DD.MM.YYYY` |
| `currency` | `SGD`, `USD`, `HKD`, `GBP`, `EUR`, `MYR`, etc. |

---

## Your Data Never Leaves Your Browser

This app has **no backend and no analytics**. Your transaction data is parsed and held entirely in browser memory and `localStorage` on your own machine. The only outbound network calls are to Yahoo Finance (for prices and dividends) and dividends.sg (for SGX upcoming ex-dates) — nothing about your holdings or transactions is ever sent anywhere else.

---

## How Prices Are Fetched

Prices and dividend history come from Yahoo Finance's public chart endpoint. Since Yahoo doesn't serve CORS headers for direct browser requests, the app routes through a chain of public CORS proxies (tried in order until one succeeds), then falls back to a locally cached copy if every proxy is temporarily unavailable.

If you're running this behind restrictive antivirus or firewall software, you may need to whitelist:

- `query1.finance.yahoo.com` / `query2.finance.yahoo.com`
- `corsproxy.io`
- `api.allorigins.win`
- `api.codetabs.com`

---

## Running Locally

It's a single HTML file — no build step, no dependencies to install.

```bash
git clone https://github.com/GumbyOne/Gumby-s-Portfolio-analytics.git
cd Gumby-s-Portfolio-analytics
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

---

## Tech

Vanilla HTML/CSS/JS and [Chart.js](https://www.chartjs.org/) — no framework, no bundler, no package.json. Everything lives in one file by design, so it can be opened, read, and modified without any tooling.

---

## Supported Exchanges

| Exchange | Suffix | Currency |
|----------|--------|----------|
| SGX (Singapore) | `.SI` | SGD |
| HKEX (Hong Kong) | `.HK` | HKD |
| NYSE (New York) | — | USD |
| NASDAQ | — | USD |
| LSE (London) | `.L` | GBP |
| KLSE (Kuala Lumpur) | `.KL` | MYR |
| Euronext Amsterdam | `.AS` | EUR |
| SSB (Singapore Savings Bonds) | — | SGD |

---

## Limitations

- Live prices depend on free public data sources and proxies; during an outage, the app falls back to cached or last-known transaction prices rather than failing outright.
- LSE prices from Yahoo Finance are returned in pence (GBp) and automatically normalised to GBP.
- Yahoo Finance does not provide data for some delisted tickers or unlisted bonds — use the manual price override feature for these.
- This is a personal analytics tool, not financial advice. Verify anything decision-relevant against your broker's own statements.

---

## License

*Not yet licensed for reuse. Please ask before forking for anything beyond personal use.*
