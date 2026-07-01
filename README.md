# Gumby Yik's PA

A self-contained, single-file portfolio analytics dashboard. No build step, no backend, no database — it's one HTML file that runs entirely in your browser.

**[Try the live demo →](https://gumbyone.github.io/Gumby-s-Portfolio-analytics/)**

## What it does

Import a CSV of your buy/sell transactions and the app builds out a full analytics dashboard from scratch: NAV history, time-weighted and money-weighted (XIRR) returns, risk metrics, dividend income, realised P&L, and exposure breakdowns — all computed client-side from your raw transaction history plus live pricing pulled from Yahoo Finance.

It's built for multi-exchange, multi-currency portfolios — SGX, NASDAQ, LSE, KLSE, and HKEX all in one place, converted to a single reference currency, with real corporate-action handling (splits, bonus issues, rights) so historical share counts and NAV stay correct across the changes.

**Tabs:**
- **Dashboard** — NAV over time, day change, allocation, upcoming dividends
- **Holdings** — current positions, live prices, day change (value, not just price), weights
- **Performance** — Sharpe, Sortino, CAGR, XIRR, TWR vs. benchmark, monthly returns heatmap
- **Risk & Drawdown** — max drawdown, volatility, VaR
- **Exposure & Analysis** — breakdown by asset type, sector, exchange, currency, and grouped ticker drill-downs
- **Dividends** — received income, upcoming ex-dividend/pay dates, yield on cost
- **Transactions** — full history with split/bonus-adjusted display
- **Realised P&L** — closed-position gains and losses
- **Corp Actions** — log splits, bonus issues, and rights so historical data stays correct
- **Alerts** — price target alerts, plus data-integrity warnings if something looks off (e.g. a missing corp action)

## Try it with the demo portfolio

The easiest way to see everything working is the **Load demo** button on the import screen — it loads a synthetic portfolio with no setup needed.

If you'd rather see how a real CSV import works, `demo-portfolio.csv` in this repo is that same demo data as a file you can upload yourself. It's a small but deliberately varied portfolio:

- **2016** — an initial spread across SGX blue chips, REITs, and a Malaysia-listed pair (KLSE), plus one UK holding (LSE) — exercises the multi-exchange, multi-currency conversion (SGD/GBP/MYR)
- **2019** — a handful of NASDAQ tech names added (USD)
- **2021–2024** — a mix of trims, a full exit, and a couple of add-ons, including two NVDA sells that land either side of NVDA's real 2021 and 2024 stock splits

That last point is deliberate: it's a good way to see the app's split-handling in action. Import the CSV as-is and NVDA's post-split share counts won't yet reconcile against the pre-split buy — the Alerts tab will flag it under **Data integrity warnings**. Add NVDA's two splits (4-for-1 in July 2021, 10-for-1 in June 2024) in the **Corp Actions** tab and the warning clears itself, with NAV, holdings, and P&L all reconciling correctly across the split boundary.

**To import it:**
1. Open the app and go to the **Import / Settings** tab
2. Upload `demo-portfolio.csv`
3. Give the app a moment to fetch live prices and dividend data from Yahoo Finance
4. Explore — try the Corp Actions scenario above, or just look around the Dashboard and Performance tabs

## Running locally

This is a static file — any local web server works. From the folder containing `index.html`:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser. A plain `file://` open won't work — the price-fetching proxy blocks requests without an HTTP origin.

## Data & privacy

Your transaction data never leaves your browser except to fetch public price/dividend data:
- **Yahoo Finance** (via a CORS proxy) for prices and dividend history
- **dividends.sg** for SGX dividend ex-dates and pay dates

Everything else — your transactions, computed NAV, holdings, and settings — stays in your browser's local storage. There's no backend, no account, and nothing is uploaded anywhere.

## Disclaimer

This is a personal tool built for tracking my own portfolio, shared as-is. It's not financial advice, and I make no guarantees about the accuracy of any figure it produces — always cross-check anything that matters against your actual broker/CDP statements.
