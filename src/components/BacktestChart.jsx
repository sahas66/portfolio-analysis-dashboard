import { computeBacktest } from '../utils/backtest.js';

const WIDTH = 720;
const HEIGHT = 320;
const PAD_LEFT = 66;
const PAD_RIGHT = 16;
const PAD_TOP = 48;
const PAD_BOTTOM = 36;
const GRID_LINES = 5;

const currency = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const formatDate = (iso) => {
  const [, month, day] = iso.split('-');
  const names = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(month)]} ${Number(day)}`;
};

export default function BacktestChart() {
  const { dates, portfolioA, portfolioB } = computeBacktest();
  const n = dates.length;

  const allValues = [...portfolioA, ...portfolioB];
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const xScale = (i) =>
    n === 1 ? WIDTH / 2 : PAD_LEFT + (i / (n - 1)) * (WIDTH - PAD_LEFT - PAD_RIGHT);
  const yScale = (v) =>
    HEIGHT - PAD_BOTTOM - ((v - min) / range) * (HEIGHT - PAD_TOP - PAD_BOTTOM);

  const gridValues = Array.from({ length: GRID_LINES }, (_, i) => min + (i / (GRID_LINES - 1)) * range);
  const tickIndices = Array.from(new Set([0, Math.round((n - 1) / 4), Math.round((n - 1) / 2), Math.round(((n - 1) * 3) / 4), n - 1]));

  const buildPath = (values) => values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(v)}`).join(' ');

  const finalA = portfolioA[portfolioA.length - 1];
  const finalB = portfolioB[portfolioB.length - 1];

  return (
    <div className="card">
      <p className="chart-caption">
        This chart shows what would've happened if I'd applied my Portfolio A (Long-Term)
        and Portfolio B (Short-Term) rules starting from mid-July 2026, using real prices.
        It's a backtest, not my actual tracked results — the real experiment didn't start
        until August 24, 2026. Also, this only tracks the ~$17,852 that went into 10 shares
        of each stock, not the full $25,000 I actually invested — 10 shares doesn't split
        evenly to $3,571 per stock the way my real trades did.
      </p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Backtested Portfolio A (Long-Term) and Portfolio B (Short-Term) value, mid-July 2026 to present. Final Portfolio A (Long-Term): ${currency(finalA)}. Final Portfolio B (Short-Term): ${currency(finalB)}.`}
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
              {currency(v)}
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

        <path d={buildPath(portfolioA)} fill="none" stroke="#2563eb" strokeWidth="2" />
        <path d={buildPath(portfolioB)} fill="none" stroke="#dc2626" strokeWidth="2" />

        <g>
          <circle cx={PAD_LEFT} cy="14" r="4" fill="#2563eb" />
          <text x={PAD_LEFT + 10} y="18" fontSize="12">
            Portfolio A (Long-Term) — {currency(finalA)}
          </text>
          <circle cx={PAD_LEFT} cy="32" r="4" fill="#dc2626" />
          <text x={PAD_LEFT + 10} y="36" fontSize="12">
            Portfolio B (Short-Term) — {currency(finalB)}
          </text>
        </g>
      </svg>
      <p className="chart-axis-label">
        Both start at {currency(portfolioA[0])} — 10 shares each of VOO, BND, AAPL, JNJ, PG, XOM, COIN.
      </p>
    </div>
  );
}
