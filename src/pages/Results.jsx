import { results } from '../data/results.js';
import ResultsTable from '../components/ResultsTable.jsx';
import ResultsChart from '../components/ResultsChart.jsx';
import HistoricalPriceChart from '../components/HistoricalPriceChart.jsx';
import BacktestChart from '../components/BacktestChart.jsx';
import portfolioAScreenshot from '../assets/investopedia-portfolio-a.png';
import portfolioBScreenshot from '../assets/investopedia-portfolio-b.png';

export default function Results() {
  return (
    <section>
      <h1>Results</h1>
      {results.length > 0 && (
        <div className="card">
          <ResultsChart rows={results} />
          <ResultsTable rows={results} />
        </div>
      )}

      <h2>Results: What happened</h2>
      <BacktestChart />

      <h2>Real price history (for context)</h2>
      <HistoricalPriceChart />

      <h2>Investopedia Simulator Portfolio</h2>
      <div className="screenshot-row">
        <figure className="screenshot-figure">
          <img src={portfolioAScreenshot} alt="Investopedia Portfolio A account summary" />
          <figcaption>Portfolio A</figcaption>
        </figure>
        <figure className="screenshot-figure">
          <img src={portfolioBScreenshot} alt="Investopedia Portfolio B account summary" />
          <figcaption>Portfolio B</figcaption>
        </figure>
      </div>
    </section>
  );
}
