import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getPortfolios, getPrices } from './dataStore.js';
import { fetchAndStorePrices, TICKERS } from './fetchPrices.js';
import { totalValue } from './portfolioMath.js';

const app = express();
const PORT = process.env.PORT || 5175;

app.use(cors());
app.use(express.json());

app.get('/api/portfolios', async (req, res) => {
  const [{ portfolios }, { prices }] = await Promise.all([getPortfolios(), getPrices()]);
  const withValue = portfolios.map((p) => ({ ...p, totalValue: totalValue(p, prices) }));
  res.json({ portfolios: withValue });
});

app.get('/api/prices', async (req, res) => {
  const snapshot = await getPrices();
  res.json(snapshot);
});

app.post('/api/prices/refresh', async (req, res) => {
  try {
    const snapshot = await fetchAndStorePrices(TICKERS);
    res.json(snapshot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
