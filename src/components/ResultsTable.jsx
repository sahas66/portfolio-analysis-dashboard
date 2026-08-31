const currency = (n) =>
  n == null ? 'N/A' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function ResultsTable({ rows }) {
  if (!rows.length) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Portfolio A (Long-Term)</th>
          <th>Portfolio B (Short-Term)</th>
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
