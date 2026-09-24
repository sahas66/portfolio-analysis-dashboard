import { computeBacktest, BACKTEST_TICKERS } from '../utils/backtest.js';
import { historicalPrices } from '../data/historicalPrices.js';

const WIDTH = 720;
const HEIGHT = 320;
const PAD_LEFT = 66;
const PAD_RIGHT = 16;
const PAD_TOP = 48;
const PAD_BOTTOM = 36;
const GRID_LINES = 5;

// Dip/recovery callouts, derived from the actual per-ticker price moves in
// historicalPrices.js (see the day each portfolio's biggest single-day
// swings happened, and which ticker(s) accounted for them).
const ANNOTATIONS = [
  { portfolio: 'A', date: '2026-08-03', label: 'COIN & AAPL dropped', dx: -20, dy: -34, anchor: 'end' },
  { portfolio: 'A', date: '2026-08-21', label: 'COIN rebounded sharply', dx: -14, dy: 40, anchor: 'end' },
  { portfolio: 'B', date: '2026-07-29', label: 'VOO dipped', dx: -70, dy: -20, anchor: 'end' },
  { portfolio: 'B', date: '2026-08-04', label: 'VOO rebounded', dx: 40, dy: -20, anchor: 'start' },
];

const currency = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const currencyPrecise = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const formatDate = (iso) => {
  const [, month, day] = iso.split('-');
  const names = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(month)]} ${Number(day)}`;
};

export default function BacktestChart() {
  const { dates, portfolioA, portfolioB, allocation } = computeBacktest();
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

  const annotations = ANNOTATIONS.map((a) => {
    const i = dates.indexOf(a.date);
    const value = (a.portfolio === 'A' ? portfolioA : portfolioB)[i];
    const x = xScale(i);
    const y = yScale(value);
    return { ...a, x, y, labelX: x + a.dx, labelY: y + a.dy };
  });

  return (
    <div className="card space-y-4">
      <p className="text-sm leading-relaxed text-slate-400">
        This chart shows what happened when I applied my Portfolio A (Long-Term) and
        Portfolio B (Short-Term) rules starting July 14, 2026, the day I actually funded
        both portfolios, using real prices. Each portfolio starts with
        the real $25,000, split evenly across the 7 stocks and rounded down to whole
        shares, with the leftover kept as cash, same as the table below.
      </p>

      <svg
        className="h-auto w-full text-slate-300"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Backtested Portfolio A (Long-Term) and Portfolio B (Short-Term) value, mid-July 2026 to present. Final Portfolio A (Long-Term): ${currency(finalA)}. Final Portfolio B (Short-Term): ${currency(finalB)}.`}
      >
        <defs>
          <marker id="annotationArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" />
          </marker>
        </defs>

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
            Portfolio A (Long-Term): {currency(finalA)}
          </text>
          <circle cx={PAD_LEFT} cy="32" r="4" fill="#dc2626" />
          <text x={PAD_LEFT + 10} y="36" fontSize="12">
            Portfolio B (Short-Term): {currency(finalB)}
          </text>
        </g>

        {annotations.map((a) => (
          <g key={`${a.portfolio}-${a.date}`} className="text-slate-400" opacity="0.9">
            <line
              x1={a.labelX}
              y1={a.labelY}
              x2={a.x}
              y2={a.y}
              stroke="currentColor"
              strokeWidth="1"
              markerEnd="url(#annotationArrow)"
            />
            <text x={a.labelX} y={a.labelY - 5} fontSize="10" fill="currentColor" textAnchor={a.anchor}>
              {a.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="text-xs text-slate-500">
        Both start at {currency(portfolioA[0])}: whole shares of each stock at July 14
        prices, plus {currencyPrecise(allocation.cash)} in leftover cash from rounding down.
      </p>

      <table className="data-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price (Jul 14)</th>
            <th>Shares</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {BACKTEST_TICKERS.map((t) => {
            const price = historicalPrices[t][0][1];
            const shares = allocation.shares[t];
            return (
              <tr key={t}>
                <td>{t}</td>
                <td>{currencyPrecise(price)}</td>
                <td>{shares}</td>
                <td>{currencyPrecise(shares * price)}</td>
              </tr>
            );
          })}
          <tr>
            <td>Cash left over</td>
            <td></td>
            <td></td>
            <td>{currencyPrecise(allocation.cash)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
