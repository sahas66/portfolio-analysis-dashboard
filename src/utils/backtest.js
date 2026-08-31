import { historicalPrices } from '../data/historicalPrices.js';

// Backtest assumptions (documented since the trading rules don't fully
// specify position sizing):
// - Each ticker starts with 10 shares, matching the actual Day 1 position.
// - "Entry price" for both the -15%/±3% rules and Portfolio B's buy-more
//   rule is each ticker's close on the first date in historicalPrices
//   (2026-07-14), since the backtest simulates the rules from that date.
// - A sold position stays sold (converted to cash) for the rest of the
//   backtest — neither rule describes re-entering a position.
// - Portfolio B's "buy more" rule adds 1 share per triggering day, funded
//   from a shared cash pool seeded by proceeds of any position it has
//   already sold. If that pool can't cover the share price, the buy is
//   skipped for that day (no assumed outside financing).
// - The trailing 5-day average uses the 5 trading days strictly before the
//   current day (not including it), and buys aren't evaluated until at
//   least 5 days of price history exist.

const TICKERS = Object.keys(historicalPrices);
const STARTING_SHARES = 10;
const A_STOP_LOSS = 0.85; // sell if price falls to 85% of entry or below
const B_TAKE_PROFIT = 1.03; // sell if price rises to 103% of entry or above
const B_STOP_LOSS = 0.97; // sell if price falls to 97% of entry or below
const TRAILING_WINDOW = 5;

const priceAt = (ticker, i) => historicalPrices[ticker][i][1];

function trailingAverage(ticker, i) {
  let sum = 0;
  for (let j = i - TRAILING_WINDOW; j < i; j++) sum += priceAt(ticker, j);
  return sum / TRAILING_WINDOW;
}

function simulatePortfolioA(dates) {
  const positions = Object.fromEntries(
    TICKERS.map((t) => [t, { shares: STARTING_SHARES, entry: priceAt(t, 0), sold: false }])
  );
  let cash = 0;
  const values = [];

  dates.forEach((date, i) => {
    for (const ticker of TICKERS) {
      const pos = positions[ticker];
      if (pos.sold) continue;
      const price = priceAt(ticker, i);
      if (price <= pos.entry * A_STOP_LOSS) {
        cash += pos.shares * price;
        pos.shares = 0;
        pos.sold = true;
      }
    }
    const holdingsValue = TICKERS.reduce((sum, t) => sum + positions[t].shares * priceAt(t, i), 0);
    values.push(cash + holdingsValue);
  });

  return values;
}

function simulatePortfolioB(dates) {
  const positions = Object.fromEntries(
    TICKERS.map((t) => [t, { shares: STARTING_SHARES, entry: priceAt(t, 0), sold: false }])
  );
  let cash = 0;
  const values = [];

  dates.forEach((date, i) => {
    for (const ticker of TICKERS) {
      const pos = positions[ticker];
      if (pos.sold) continue;
      const price = priceAt(ticker, i);

      if (price >= pos.entry * B_TAKE_PROFIT || price <= pos.entry * B_STOP_LOSS) {
        cash += pos.shares * price;
        pos.shares = 0;
        pos.sold = true;
        continue;
      }

      if (i >= TRAILING_WINDOW) {
        const avg5 = trailingAverage(ticker, i);
        if (price < avg5 && cash >= price) {
          cash -= price;
          pos.shares += 1;
        }
      }
    }
    const holdingsValue = TICKERS.reduce((sum, t) => sum + positions[t].shares * priceAt(t, i), 0);
    values.push(cash + holdingsValue);
  });

  return values;
}

export function computeBacktest() {
  const dates = historicalPrices[TICKERS[0]].map((row) => row[0]);
  const portfolioA = simulatePortfolioA(dates);
  const portfolioB = simulatePortfolioB(dates);
  return { dates, portfolioA, portfolioB };
}

export const BACKTEST_STARTING_SHARES = STARTING_SHARES;
export const BACKTEST_TICKERS = TICKERS;
