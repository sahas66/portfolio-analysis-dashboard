import Editable from '../components/Editable.jsx';

export default function Methodology() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <Editable
          page="Methodology"
          id="title"
          as="h1"
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          text="Methodology"
        />
        <Editable
          page="Methodology"
          id="intro"
          className="leading-relaxed text-slate-300"
          text={
            "For my IB Personal Project, I'm comparing two ways of investing: " +
            "just buying and holding (Portfolio A, Long-Term) vs. actively " +
            "trading based on some rules I set (Portfolio B, Short-Term). I'm " +
            "doing this on the " +
            "Investopedia Stock Simulator so I don't need real money."
          }
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">The Setup</h2>
        <Editable
          page="Methodology"
          id="allocation"
          className="leading-relaxed text-slate-300"
          text={
            "I started both portfolios with $100,000 on July 14, 2026. I " +
            "split $25,000 evenly across 7 stocks and ETFs: VOO, BND, AAPL, " +
            "JNJ, PG, XOM, and COIN. About $3,571 went into each one. I " +
            "kept the other $75,000 as cash."
          }
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">The Two Portfolios</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card border-t-2 border-t-brand-blue">
            <Editable
              page="Methodology"
              id="portfolioAHeading"
              as="h3"
              className="mb-2 font-semibold text-brand-blue"
              text="Portfolio A (Long-Term)"
            />
            <Editable
              page="Methodology"
              id="portfolioARule"
              className="leading-relaxed text-slate-300"
              text={
                "I just hold these and don't trade them. The only rule: if a stock " +
                "drops 15% or more below what I paid for it, I'm allowed to sell it."
              }
            />
          </div>
          <div className="card border-t-2 border-t-brand-red">
            <Editable
              page="Methodology"
              id="portfolioBHeading"
              as="h3"
              className="mb-2 font-semibold text-brand-red"
              text="Portfolio B (Short-Term)"
            />
            <Editable
              page="Methodology"
              id="portfolioBRule"
              className="leading-relaxed text-slate-300"
              text={
                "This one follows a simple rule I made up: buy more of a stock if " +
                "it's priced below its own 5-day average, and sell it once it goes " +
                "up 3% or down 3% from what I paid."
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Tracking &amp; Benchmarking</h2>
        <Editable
          page="Methodology"
          id="checking"
          className="leading-relaxed text-slate-300"
          text={
            "I'm checking on both portfolios every week and comparing them to " +
            "each other and to the S&P 500 (SPY) as a benchmark."
          }
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Charts &amp; the Backtest</h2>
        <Editable
          page="Methodology"
          id="chartNote"
          className="leading-relaxed text-slate-300"
          text={
            "I also added a chart of real price history starting July 14, 2026, " +
            "for all 7 stocks. It uses real market prices for context, separate " +
            "from my actual tracked results, which I add by hand from " +
            "Investopedia on the Results page."
          }
        />
        <Editable
          page="Methodology"
          id="backtestNote"
          className="leading-relaxed text-slate-300"
          text={
            "I also built a \"backtest\" that runs both portfolios' rules " +
            "automatically on that same real price data, day by day starting " +
            "July 14, just to see what would've happened. It's different from " +
            "my real results because my actual trades are checked and made by " +
            "hand once a week, not simulated every single day. For the " +
            "backtest, I had to make a few decisions since my rules didn't " +
            "cover everything:"
          }
        />
        <ul className="card space-y-2 text-slate-300">
          <Editable
            page="Methodology"
            id="backtestRule1"
            as="li"
            className="flex gap-2 leading-relaxed before:content-['•'] before:text-brand-amber"
            text="Each portfolio starts with the real $25,000, split evenly across the 7 stocks and rounded down to whole shares, with the leftover kept as cash"
          />
          <Editable
            page="Methodology"
            id="backtestRule2"
            as="li"
            className="flex gap-2 leading-relaxed before:content-['•'] before:text-brand-amber"
            text="Once I sell something, I don't buy it back later"
          />
          <Editable
            page="Methodology"
            id="backtestRule3"
            as="li"
            className="flex gap-2 leading-relaxed before:content-['•'] before:text-brand-amber"
            text="Portfolio B (Short-Term) only buys more shares using cash freed up from rounding down or its own sells, not new money"
          />
          <Editable
            page="Methodology"
            id="backtestRule4"
            as="li"
            className="flex gap-2 leading-relaxed before:content-['•'] before:text-brand-amber"
            text="I need 5 days of price history before the 5-day-average rule can even apply"
          />
        </ul>
      </div>
    </section>
  );
}
