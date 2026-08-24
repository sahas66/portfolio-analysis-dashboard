const currency = (n) =>
  n == null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function ResultsTable({ rows }) {
  if (!rows.length) return <p className="placeholder">No data yet — add rows to src/data/results.js.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Portfolio A</th>
          <th>Portfolio B</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.date}>
            <td>{row.date}</td>
            <td>{currency(row.portfolioA)}</td>
            <td>{currency(row.portfolioB)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
