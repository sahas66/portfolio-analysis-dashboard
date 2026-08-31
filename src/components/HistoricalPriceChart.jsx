import { useState } from 'react';
import { historicalPrices, EXPERIMENT_START_DATE } from '../data/historicalPrices.js';

const WIDTH = 720;
const HEIGHT = 360;
const PAD_LEFT = 52;
const PAD_RIGHT = 16;
const PAD_TOP = 20;
const PAD_BOTTOM = 36;
const GRID_LINES = 5;

const TICKERS = Object.keys(historicalPrices);

const COLORS = {
  VOO: '#2563eb',
  BND: '#dc2626',
  AAPL: '#16a34a',
  JNJ: '#eab308',
  PG: '#9333ea',
  XOM: '#db2777',
  COIN: '#0891b2',
};

const formatDate = (iso) => {
  const [, month, day] = iso.split('-');
  const names = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(month)]} ${Number(day)}`;
};

const buildSeries = () =>
  TICKERS.map((ticker) => {
    const rows = historicalPrices[ticker];
    const base = rows[0][1];
    return {
      ticker,
      dates: rows.map((row) => row[0]),
      values: rows.map((row) => (row[1] / base - 1) * 100),
    };
  });

export default function HistoricalPriceChart() {
  const [visible, setVisible] = useState(() => new Set(TICKERS));

  const series = buildSeries();
  const dates = series[0].dates;
  const n = dates.length;

  const allValues = series.flatMap((s) => s.values);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const xScale = (i) =>
    n === 1 ? WIDTH / 2 : PAD_LEFT + (i / (n - 1)) * (WIDTH - PAD_LEFT - PAD_RIGHT);
  const yScale = (v) =>
    HEIGHT - PAD_BOTTOM - ((v - min) / range) * (HEIGHT - PAD_TOP - PAD_BOTTOM);

  const gridValues = Array.from({ length: GRID_LINES }, (_, i) => min + (i / (GRID_LINES - 1)) * range);

  const tickIndices = Array.from(new Set([0, Math.round((n - 1) / 4), Math.round((n - 1) / 2), Math.round(((n - 1) * 3) / 4), n - 1]));

  const startIndex = dates.findIndex((d) => d >= EXPERIMENT_START_DATE);
  const startX = startIndex >= 0 ? xScale(startIndex) : null;

  const toggle = (ticker) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        if (next.size === 1) return prev;
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  };

  return (
    <div className="card">
      <p className="chart-caption">
        This is real price data from mid-July 2026 up to now, just so you can see what
        the market was doing before I actually started trading. I didn't fund Portfolio
        A and B until August 24, 2026 — everything before that is just background, not
        part of the actual experiment.
      </p>

      <div className="ticker-toggle" role="group" aria-label="Show or hide tickers">
        {TICKERS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={visible.has(t)}
            className={visible.has(t) ? 'active' : ''}
            style={{ '--swatch': COLORS[t] }}
            onClick={() => toggle(t)}
          >
            <span className="swatch" />
            {t}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Cumulative percent price change for all seven tickers, mid-July 2026 to present"
      >
        {gridValues.map((v) => (
          <g key={v}>
            <line
              x1={PAD_LEFT}
              y1={yScale(v)}
              x2={WIDTH - PAD_RIGHT}
              y2={yScale(v)}
              stroke="#8884"
            />
            <text x={PAD_LEFT - 8} y={yScale(v) + 4} fontSize="11" textAnchor="end">
              {v > 0 ? '+' : ''}
              {v.toFixed(1)}%
            </text>
          </g>
        ))}

        {tickIndices.map((i, idx) => (
          <text
            key={i}
            x={xScale(i)}
            y={HEIGHT - PAD_BOTTOM + 18}
            fontSize="11"
            textAnchor={idx === 0 ? 'start' : idx === tickIndices.length - 1 ? 'end' : 'middle'}
          >
            {formatDate(dates[i])}
          </text>
        ))}

        {startX != null && (
          <>
            <line
              x1={startX}
              y1={PAD_TOP}
              x2={startX}
              y2={HEIGHT - PAD_BOTTOM}
              stroke="#666"
              strokeDasharray="4 3"
            />
            <text x={startX + 6} y={PAD_TOP + 10} fontSize="11" style={{ fill: '#666' }}>
              Experiment start (Aug 24)
            </text>
          </>
        )}

        {series
          .filter((s) => visible.has(s.ticker))
          .map((s) => (
            <path
              key={s.ticker}
              d={s.values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ')}
              fill="none"
              stroke={COLORS[s.ticker]}
              strokeWidth="2"
            />
          ))}
      </svg>
      <p className="chart-axis-label">Y-axis is % change in price since Jul 14, 2026, not the actual dollar price.</p>
    </div>
  );
}
