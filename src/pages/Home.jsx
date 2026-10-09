import Editable from '../components/Editable.jsx';

const QUICK_FACTS = [
  { value: '$25,000', label: 'Starting balance', note: 'each portfolio' },
  { value: 'Jul 14, 2026', label: 'Start date', note: 'both portfolios funded' },
  { value: '7', label: 'Stocks & ETFs', note: 'split evenly' },
  { value: '2', label: 'Portfolios', note: 'long-term vs. short-term' },
];

const TICKERS = ['VOO', 'BND', 'AAPL', 'JNJ', 'PG', 'XOM', 'COIN'];

const LONG_TERM_STRATEGIES = [
  'Buy-and-hold — buy once and leave positions alone, no active trading',
  'Diversification — spread across 7 stocks and ETFs to reduce single-stock risk',
  'Stop-loss discipline — only sell if a position drops 15% or more below cost',
];

const SHORT_TERM_STRATEGIES = [
  'Mean reversion — buy when a stock trades below its own 5-day average price',
  'Fixed take-profit / stop-loss — sell once a position moves 3% up or down',
  'Active rebalancing — check and adjust positions weekly instead of holding',
];

export default function Home() {
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <Editable
          page="Home"
          id="eyebrow"
          className="text-xs font-semibold uppercase tracking-widest text-slate-500"
          text="IB Personal Project"
        />
        <Editable
          page="Home"
          id="title"
          as="h1"
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          text="Portfolio Analysis Dashboard"
        />
        <Editable
          page="Home"
          id="aim"
          className="text-lg leading-relaxed text-slate-200"
          text={
            "My aim was to discover if actively trading stocks based on a set " +
            "rule (Portfolio B, Short-Term) actually outperforms a simple " +
            "buy-and-hold approach (Portfolio A, Long-Term) over time."
          }
        />
      </header>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Quick Facts</h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_FACTS.map((f) => (
            <div key={f.label} className="card space-y-1 !p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{f.label}</dt>
              <dd className="text-xl font-semibold text-white">{f.value}</dd>
              <dd className="text-xs text-slate-500">{f.note}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Stocks &amp; ETFs</span>
          {TICKERS.map((t) => (
            <span
              key={t}
              className="rounded-md border border-slate-700/60 bg-slate-900/60 px-2 py-0.5 font-mono text-xs text-slate-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">The Setup</h2>
        <Editable
          page="Home"
          id="allocation"
          className="leading-relaxed text-slate-300"
          text={
            "Both portfolios started with $25,000 on July 14, 2026, invested " +
            "evenly across the same 7 stocks and ETFs in each portfolio. " +
            "Keeping the two portfolios identical at the start was " +
            "intentional, and it means any difference in performance later " +
            "can be traced back to the trading strategy itself, not just " +
            "different stock picks."
          }
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Strategies Used</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card border-t-2 border-t-brand-blue">
            <h3 className="mb-2 font-semibold text-brand-blue">Long-Term (Portfolio A)</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
              {LONG_TERM_STRATEGIES.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-t-2 border-t-brand-red">
            <h3 className="mb-2 font-semibold text-brand-red">Short-Term (Portfolio B)</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
              {SHORT_TERM_STRATEGIES.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">How It Works</h2>
        <Editable
          page="Home"
          id="simulator"
          className="leading-relaxed text-slate-300"
          text={
            "I'm testing this using the Investopedia Stock Simulator, so all the " +
            "trades use real market prices but simulated money, and no actual " +
            "financial risk."
          }
        />
      </div>

      <Editable
        page="Home"
        id="outro"
        className="border-t border-slate-800 pt-6 leading-relaxed text-slate-400"
        text={
          "This site walks through my methodology, tracks results as they " +
          "come in, and reflects on what the comparison actually shows."
        }
      />
    </section>
  );
}
