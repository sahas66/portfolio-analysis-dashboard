# Portfolio Analysis Dashboard

An IB Personal Project comparing a long-term buy-and-hold investment strategy against a short-term rules-based trading strategy, using simulated portfolios tracked through the Investopedia Stock Simulator.

## Project Overview

Two portfolios (Portfolio A and Portfolio B) start with identical positions — $25,000 each invested equally across 7 assets (VOO, BND, AAPL, JNJ, PG, XOM, and COIN) — and are managed under different, predefined rules for the duration of the experiment. Performance is tracked, compared against each other and a benchmark index (SPY), and analyzed to determine which strategy performed better under the stated conditions.

## Strategy Rules

**Portfolio A — Long-Term:** Positions are held without active trading. The only exception is a risk rule: a position may be sold if it falls 15% or more below its entry price.

**Portfolio B — Short-Term:** Checked every 2–3 days. A position is bought when its price is below its own 5-day average, and sold when it rises 3% or more above, or falls 3% or more below, its entry price.

Both portfolios hold identical assets and identical starting positions — the only variable being tested is the trading strategy itself.

## Data Source

Trades are executed and tracked using the Investopedia Stock Simulator (real market prices, simulated money — no real trades or funds involved). Results are manually recorded and entered into this site for analysis; there is no live price-fetching API or backend server.

## Site Structure

- **Home** — project title and purpose
- **Methodology** — full strategy rules and assumptions
- **Results** — performance tables and charts (filled in from Investopedia data)
- **Reflection** — learning, challenges, and evaluation against success criteria

## Tech Stack

React + Vite, static site, no backend or environment variables required.

## Setup

```bash
npm install
npm run dev
```

## Status

This project is being developed iteratively as part of an IB Personal Project, with development assisted by Claude Code.
