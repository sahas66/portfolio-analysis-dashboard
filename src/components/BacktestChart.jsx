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
        Backtested comparison: shows what each strategy's rules would have produced if applied
        to real market prices from mid-July 2026 onward. This is a retrospective calculation
        using real prices and the project's fixed trading rules — not the live tracked
        experiment, which began August 24, 2026.
      </p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Backtested Portfolio A and Portfolio B value, mid-July 2026 to present. Final Portfolio A: ${currency(finalA)}. Final Portfolio B: ${currency(finalB)}.`}
      >
        {gridValues.map((v) => (
          <g key={v}>
            <line
              x1={PAD_LEFT}
              y1={yScale(v)}
              x2={WIDTH - PAD_RIGHT}
              y2={yScale(v)}
              stroke="var(--border-soft)"
              strokeWidth="1"
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

        <path d={buildPath(portfolioA)} fill="none" stroke="var(--portfolio-a)" strokeWidth="2" strokeLinejoin="round" />
        <path d={buildPath(portfolioB)} fill="none" stroke="var(--portfolio-b)" strokeWidth="2" strokeLinejoin="round" />

        <g>
          <circle cx={PAD_LEFT} cy="14" r="4" fill="var(--portfolio-a)" />
          <text x={PAD_LEFT + 10} y="18" fontSize="12">
            Portfolio A ({currency(finalA)})
          </text>
          <circle cx={PAD_LEFT + 190} cy="14" r="4" fill="var(--portfolio-b)" />
          <text x={PAD_LEFT + 200} y="18" fontSize="12">
            Portfolio B ({currency(finalB)})
          </text>
        </g>
      </svg>
      <p className="chart-axis-label">
        Starting value: {currency(portfolioA[0])} (10 shares each of VOO, BND, AAPL, JNJ, PG, XOM, COIN)
      </p>
    </div>
  );
}
