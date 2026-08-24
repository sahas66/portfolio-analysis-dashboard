# portfolio-analysis-dashboard

IB Personal Project — a static site comparing two simulated investment
strategies, Portfolio A and Portfolio B.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Pages

- **Home** — project title and purpose.
- **Methodology** — strategy rules for Portfolio A and Portfolio B
  (`src/pages/Methodology.jsx`).
- **Results** — table and chart of portfolio value over time, filled in
  manually from Investopedia data (`src/data/results.js`).
- **Reflection** — writeup of what the comparison showed
  (`src/pages/Reflection.jsx`).

No backend, no API calls, no environment variables required.
