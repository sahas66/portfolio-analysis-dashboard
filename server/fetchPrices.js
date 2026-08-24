import 'dotenv/config';
import { savePrices } from './dataStore.js';

export const TICKERS = ['VOO', 'BND', 'AAPL', 'JNJ', 'PG', 'XOM', 'COIN'];

const TWELVE_DATA_URL = 'https://api.twelvedata.com/price';

// Fetches the latest price for each ticker from Twelve Data (one batched
// request, comma-separated symbols) and overwrites data/prices.json with a
// fresh snapshot stamped with the fetch time.
export async function fetchAndStorePrices(tickers = TICKERS) {
  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('TWELVE_DATA_API_KEY is not set in .env');
  }

  const url = `${TWELVE_DATA_URL}?symbol=${tickers.join(',')}&apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Twelve Data request failed: ${res.status} ${res.statusText}`);
  }
  const body = await res.json();

  // Twelve Data returns { symbol: { price } } for multi-symbol requests,
  // or a single { price } object when only one symbol is requested.
  const raw = tickers.length === 1 ? { [tickers[0]]: body } : body;

  const fetchedAt = new Date().toISOString();
  const prices = {};
  for (const ticker of tickers) {
    const entry = raw[ticker];
    if (entry && entry.price && !entry.code) {
      prices[ticker] = { price: Number(entry.price), fetchedAt };
    } else {
      prices[ticker] = { price: null, error: entry?.message || 'no data', fetchedAt };
    }
  }

  const snapshot = { fetchedAt, prices };
  await savePrices(snapshot);
  return snapshot;
}

// Allow `npm run fetch-prices` to run this directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAndStorePrices()
    .then((snapshot) => {
      console.log(`Saved prices at ${snapshot.fetchedAt}`);
      console.table(snapshot.prices);
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
}
