const WIDTH = 640;
const HEIGHT = 280;
const PADDING = 32;

function buildPath(rows, key, xScale, yScale) {
  return rows
    .map((row, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(row[key])}`)
    .join(' ');
}

export default function ResultsChart({ rows }) {
  if (!rows.length) {
    return null;
  }

  const values = rows.flatMap((row) => [row.portfolioA, row.portfolioB]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const xScale = (i) =>
    rows.length === 1
      ? WIDTH / 2
      : PADDING + (i / (rows.length - 1)) * (WIDTH - PADDING * 2);
  const yScale = (v) => HEIGHT - PADDING - ((v - min) / range) * (HEIGHT - PADDING * 2);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Portfolio value over time">
      <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#8884" />
      <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#8884" />
      <path d={buildPath(rows, 'portfolioA', xScale, yScale)} fill="none" stroke="#2563eb" strokeWidth="2" />
      <path d={buildPath(rows, 'portfolioB', xScale, yScale)} fill="none" stroke="#dc2626" strokeWidth="2" />
      <g className="chart-legend">
        <circle cx={WIDTH - 200} cy={PADDING} r="4" fill="#2563eb" />
        <text x={WIDTH - 190} y={PADDING + 4} fontSize="12">Portfolio A (Long-Term)</text>
        <circle cx={WIDTH - 200} cy={PADDING + 18} r="4" fill="#dc2626" />
        <text x={WIDTH - 190} y={PADDING + 22} fontSize="12">Portfolio B (Short-Term)</text>
      </g>
    </svg>
  );
}
