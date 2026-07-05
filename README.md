# Portfolio Analytics

A self-contained, single-file portfolio analytics dashboard for multi-exchange dividend
investors. No install, no backend, no account — open the page, import a CSV, get a full
performance and risk breakdown.

**Live demo:** https://gumbyone.github.io/Gumby-s-Portfolio-analytics/

## What it does

- **Dashboard** — NAV over time, asset allocation, sector exposure, dividend income
- **Holdings** — live-priced positions with cost basis, P&L, and portfolio weight
- **Performance** — Sharpe/Sortino, CAGR, alpha/beta vs. benchmark, monthly returns
  heatmap, and per-position return attribution
- **Risk & Drawdown** — drawdown-from-peak, VaR/CVaR, return distribution, rolling
  volatility
- **Exposure** — breakdowns by asset type, exchange, and currency, with a concentration
  chart for your largest positions

It supports SGX, NASDAQ, NYSE, LSE, HKEX, and KLSE out of the box, with automatic
currency conversion to a single reference currency.

## Getting started

**Try it instantly:** click **Load demo** on the live demo link above — no file needed.

**Use your own data:** export your transaction history from
[StocksCafe](https://stockscafe.com) (Portfolio → Transactions → Export Transactions)
and drop the CSV/TSV file onto the Import tab. Expected columns:

```
action, exchange, symbol, date, shares, price, fees, currency, notes
```

- `action`: `Buy` / `Sell` / `1` / `-1` / `Fees` / `0`
- `exchange`: `SGX`, `HKEX`, `NYSE`, `NASDAQ`, `LSE`, `SSB`, etc.
- `date`: `YYYY-MM-DD`, `DD/MM/YYYY`, or `DD.MM.YYYY`

## Your data never leaves your browser

This app has no backend and no analytics. Your transaction data is parsed and held
entirely in browser memory and `localStorage` on your own machine. The only outbound
network calls are to Yahoo Finance (for prices and dividends) — nothing about your
holdings or transactions is ever sent anywhere else.

## How prices are fetched

Prices and dividend history come from Yahoo Finance's public chart endpoint. Since
Yahoo doesn't serve CORS headers for direct browser requests, the app routes through a
small chain of public CORS proxies (tried in order until one succeeds), then falls back
to a locally cached copy of the last successful fetch if every proxy is temporarily
unavailable. If you're running this behind restrictive antivirus or firewall software,
you may need to whitelist:

- `query1.finance.yahoo.com` / `query2.finance.yahoo.com`
- `corsproxy.io`
- `api.allorigins.win`
- `api.codetabs.com`

## Running it locally

It's a single HTML file — no build step, no dependencies to install.

```bash
git clone https://github.com/GumbyOne/Gumby-s-Portfolio-analytics.git
cd Gumby-s-Portfolio-analytics
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Tech

Vanilla HTML/CSS/JS and [Chart.js](https://www.chartjs.org/) — no framework, no bundler,
no package.json. Everything lives in one file by design, so it can be opened, read, and
modified without any tooling.

## Limitations

- Live prices depend on free public data sources and proxies; during an outage, the app
  falls back to cached or last-known transaction prices rather than failing outright.
- Benchmark comparisons (STI, S&P 500) are simplified proxy curves, not live index data.
- This is a personal analytics tool, not financial advice. Verify anything
  decision-relevant against your broker's own statements.

## License

_TBD — not yet licensed for reuse. Ask before forking for anything beyond personal use._
