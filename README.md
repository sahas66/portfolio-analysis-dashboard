# portfolio-analysis-dashboard
IB Personal Project — simulated dashboard comparing long-term and short-term investment strategies.

## Setup

```bash
npm install
cp .env.example .env   # then fill in TWELVE_DATA_API_KEY
```

## Run

```bash
npm run dev:all   # Vite dev server (5173) + API server (5175) together
```

Or separately: `npm run dev` (frontend) and `npm run server` (API).

## Fetch prices

The dashboard reads whatever is in `data/prices.json`. Fetch fresh prices from
Twelve Data for VOO, BND, AAPL, JNJ, PG, XOM, COIN either from the UI
("Refresh prices" button, while the API server is running) or from the CLI:

```bash
npm run fetch-prices
```

Each fetch overwrites `data/prices.json` with the latest price per ticker and
an ISO timestamp.

## Data

- `data/portfolios.json` — Portfolio A and B: starting balance, cash balance,
  holdings (asset, quantity, avg price), transactions (date, asset, type,
  quantity, price). No trading logic yet — both start fully in cash.
- `data/prices.json` — latest Twelve Data snapshot, timestamped.
