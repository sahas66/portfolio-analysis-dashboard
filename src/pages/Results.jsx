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
        I add this data by hand from Investopedia, so it's not here yet —
        I'll edit <code>src/data/results.js</code> once I actually have
        results to add.
      </p>
      <div className="card">
        <ResultsChart rows={results} />
        <ResultsTable rows={results} />
      </div>

      <h2>Backtest: what my rules would've done</h2>
      <BacktestChart />

      <h2>Real price history (for context)</h2>
      <HistoricalPriceChart />
    </section>
  );
}
