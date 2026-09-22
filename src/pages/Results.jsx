import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <section className="space-y-8">
      <Editable
        page="Results"
        id="title"
        as="h1"
        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        text="Results"
      />
      {results.length > 0 && (
        <div className="card space-y-4">
          <ResultsChart rows={results} />
          <ResultsTable rows={results} />
        </div>
      )}

      <div className="space-y-3">
        <Editable
          page="Results"
          id="whatHappenedHeading"
          as="h2"
          className="text-lg font-semibold text-white"
          text="Results: What happened"
        />
        <BacktestChart />
      </div>

      <div className="space-y-3">
        <Editable
          page="Results"
          id="priceHistoryHeading"
          as="h2"
          className="text-lg font-semibold text-white"
          text="Real price history (for context)"
        />
        <HistoricalPriceChart />
      </div>

      <div className="space-y-3">
        <Editable
          page="Results"
          id="screenshotsHeading"
          as="h2"
          className="text-lg font-semibold text-white"
          text="Investopedia Simulator Portfolio"
        />
        <div className="flex flex-wrap gap-4">
          {screenshots.map((shot) => (
            <figure className="m-0 min-w-[280px] flex-1" key={shot.caption}>
              <img
                src={shot.src}
                alt={shot.alt}
                className="w-full cursor-zoom-in rounded-lg border border-slate-800 transition-transform hover:scale-[1.01]"
                onClick={() => setZoomedShot(shot)}
              />
              <figcaption className="mt-2 text-center text-sm text-slate-400">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoomedShot && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
            onClick={() => setZoomedShot(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              className="fixed right-6 top-4 text-4xl leading-none text-white"
              aria-label="Close"
              onClick={() => setZoomedShot(null)}
            >
              ×
            </button>
            <motion.img
              src={zoomedShot.src}
              alt={zoomedShot.alt}
              className="max-h-[90vh] max-w-[90vw] shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
