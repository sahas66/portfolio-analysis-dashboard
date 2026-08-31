import { results } from '../data/results.js';
import ResultsTable from '../components/ResultsTable.jsx';
import ResultsChart from '../components/ResultsChart.jsx';
import HistoricalPriceChart from '../components/HistoricalPriceChart.jsx';
import BacktestChart from '../components/BacktestChart.jsx';

export default function Results() {
  return (
    <section>
      <h1>Results</h1>
      <p className="placeholder">
        Data below is filled in manually from Investopedia — edit{' '}
        <code>src/data/results.js</code> to add rows.
      </p>
      <div className="card">
        <ResultsChart rows={results} />
        <ResultsTable rows={results} />
      </div>

      <h2>Backtested Strategy Comparison</h2>
      <BacktestChart />

      <h2>Historical Price Context</h2>
      <HistoricalPriceChart />
    </section>
  );
}
