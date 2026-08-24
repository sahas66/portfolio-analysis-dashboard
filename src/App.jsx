import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const currency = (n) =>
  n == null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function PortfolioCard({ portfolio }) {
  return (
    <div className="card">
      <h2>{portfolio.name}</h2>
      <div className="stat">
        <span className="label">Cash balance</span>
        <span className="value">{currency(portfolio.cashBalance)}</span>
      </div>
      <div className="stat">
        <span className="label">Total value</span>
        <span className="value">{currency(portfolio.totalValue)}</span>
      </div>
    </div>
  );
}

function PricesTable({ snapshot }) {
  if (!snapshot?.prices) return <p>No prices fetched yet.</p>;
  const rows = Object.entries(snapshot.prices);
  return (
    <>
      <p className="fetched-at">
        Last fetched: {snapshot.fetchedAt ? new Date(snapshot.fetchedAt).toLocaleString() : '—'}
      </p>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([ticker, data]) => (
            <tr key={ticker}>
              <td>{ticker}</td>
              <td>{data.price != null ? currency(data.price) : `error: ${data.error}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function App() {
  const [portfolios, setPortfolios] = useState([]);
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const [pRes, priceRes] = await Promise.all([
        fetch(`${API_URL}/api/portfolios`),
        fetch(`${API_URL}/api/prices`),
      ]);
      if (!pRes.ok || !priceRes.ok) throw new Error('API request failed');
      const pData = await pRes.json();
      const priceData = await priceRes.json();
      setPortfolios(pData.portfolios);
      setPrices(priceData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function refreshPrices() {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/prices/refresh`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to refresh prices');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>Portfolio Analysis Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <section className="portfolios">
        {portfolios.map((p) => (
          <PortfolioCard key={p.id} portfolio={p} />
        ))}
      </section>
      <section>
        <div className="section-header">
          <h2>Today's Prices</h2>
          <button onClick={refreshPrices}>Refresh prices</button>
        </div>
        <PricesTable snapshot={prices} />
      </section>
    </main>
  );
}
