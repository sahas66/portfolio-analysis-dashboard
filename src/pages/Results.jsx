import { useEffect, useState } from 'react';
import { results } from '../data/results.js';
import ResultsTable from '../components/ResultsTable.jsx';
import ResultsChart from '../components/ResultsChart.jsx';
import HistoricalPriceChart from '../components/HistoricalPriceChart.jsx';
import BacktestChart from '../components/BacktestChart.jsx';
import Editable from '../components/Editable.jsx';
import portfolioAScreenshot from '../assets/investopedia-portfolio-a.png';
import portfolioBScreenshot from '../assets/investopedia-portfolio-b.png';

const screenshots = [
  { src: portfolioAScreenshot, alt: 'Investopedia Portfolio A account summary', caption: 'Portfolio A' },
  { src: portfolioBScreenshot, alt: 'Investopedia Portfolio B account summary', caption: 'Portfolio B' },
];

export default function Results() {
  const [zoomedShot, setZoomedShot] = useState(null);

  useEffect(() => {
    if (!zoomedShot) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedShot(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedShot]);

  return (
    <section>
      <Editable page="Results" id="title" as="h1" text="Results" />
      {results.length > 0 && (
        <div className="card">
          <ResultsChart rows={results} />
          <ResultsTable rows={results} />
        </div>
      )}

      <Editable page="Results" id="whatHappenedHeading" as="h2" text="Results: What happened" />
      <BacktestChart />

      <Editable page="Results" id="priceHistoryHeading" as="h2" text="Real price history (for context)" />
      <HistoricalPriceChart />

      <Editable page="Results" id="screenshotsHeading" as="h2" text="Investopedia Simulator Portfolio" />
      <div className="screenshot-row">
        {screenshots.map((shot) => (
          <figure className="screenshot-figure" key={shot.caption}>
            <img
              src={shot.src}
              alt={shot.alt}
              className="screenshot-thumb"
              onClick={() => setZoomedShot(shot)}
            />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>

      {zoomedShot && (
        <div className="lightbox-overlay" onClick={() => setZoomedShot(null)}>
          <button
            className="lightbox-close"
            aria-label="Close"
            onClick={() => setZoomedShot(null)}
          >
            ×
          </button>
          <img
            src={zoomedShot.src}
            alt={zoomedShot.alt}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
