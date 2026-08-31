import { useState } from 'react';
import { historicalPrices, EXPERIMENT_START_DATE } from '../data/historicalPrices.js';

const WIDTH = 640;
const HEIGHT = 280;
const PADDING = 32;

const TICKERS = Object.keys(historicalPrices);

function buildPath(rows, xScale, yScale) {
  return rows
    .map((row, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(row[1])}`)
    .join(' ');
}

export default function HistoricalPriceChart() {
  const [ticker, setTicker] = useState(TICKERS[0]);
  const rows = historicalPrices[ticker];

  const values = rows.map((row) => row[1]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const xScale = (i) =>
    rows.length === 1
      ? WIDTH / 2
      : PADDING + (i / (rows.length - 1)) * (WIDTH - PADDING * 2);
  const yScale = (v) => HEIGHT - PADDING - ((v - min) / range) * (HEIGHT - PADDING * 2);

  const startIndex = rows.findIndex((row) => row[0] >= EXPERIMENT_START_DATE);
  const startX = startIndex >= 0 ? xScale(startIndex) : null;

  return (
    <div className="historical-chart">
      <p className="placeholder">
        Historical price context: real market data from mid-July 2026 to present.
        Portfolio A and B were funded and positions established on August 24, 2026 —
        prices shown before that date are historical market context, not part of the
        experiment.
      </p>

      <div className="ticker-toggle" role="tablist" aria-label="Select ticker">
        {TICKERS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={t === ticker}
            className={t === ticker ? 'active' : ''}
            onClick={() => setTicker(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={`${ticker} closing price, mid-July 2026 to present`}>
        <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#8884" />
        <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#8884" />
        {startX != null && (
          <line
            x1={startX}
            y1={PADDING}
            x2={startX}
            y2={HEIGHT - PADDING}
            stroke="#16a34a"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        )}
        <path d={buildPath(rows, xScale, yScale)} fill="none" stroke="#2563eb" strokeWidth="2" />
        <g className="chart-legend">
          <circle cx={WIDTH - 190} cy={PADDING} r="4" fill="#2563eb" />
          <text x={WIDTH - 180} y={PADDING + 4} fontSize="12">{ticker} close</text>
          <line x1={WIDTH - 190} y1={PADDING + 14} x2={WIDTH - 182} y2={PADDING + 14} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={WIDTH - 180} y={PADDING + 18} fontSize="12">Experiment start (Aug 24)</text>
        </g>
      </svg>
    </div>
  );
}
