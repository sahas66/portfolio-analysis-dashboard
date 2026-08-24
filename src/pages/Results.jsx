import { results } from '../data/results.js';
import ResultsTable from '../components/ResultsTable.jsx';
import ResultsChart from '../components/ResultsChart.jsx';

export default function Results() {
  return (
    <section>
      <h1>Results</h1>
      <p className="placeholder">
        Data below is filled in manually from Investopedia — edit{' '}
        <code>src/data/results.js</code> to add rows.
      </p>
      <ResultsChart rows={results} />
      <ResultsTable rows={results} />
    </section>
  );
}
