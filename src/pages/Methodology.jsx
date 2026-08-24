export default function Methodology() {
  return (
    <section>
      <h1>Methodology</h1>

      <p>
        Portfolio Analysis Dashboard is an IB Personal Project comparing a
        long-term buy-and-hold strategy (Portfolio A) against a short-term
        rules-based trading strategy (Portfolio B), simulated using the
        Investopedia Stock Simulator.
      </p>

      <p>
        Both portfolios started with $100,000, of which $25,000 was invested
        equally across 7 assets on August 24, 2026: VOO, BND, AAPL, JNJ, PG,
        XOM, and COIN (approximately $3,571 per asset), with the remaining
        $75,000 held in cash.
      </p>

      <h2>Portfolio A</h2>
      <p>
        Holds these positions without active trading, except a risk rule:
        any position falling 15% or more below entry price may be sold.
      </p>

      <h2>Portfolio B</h2>
      <p>
        Follows a mechanical rule: buy when a position's price is below its
        5-day average, sell when it rises 3% above or falls 3% below entry
        price.
      </p>

      <p>
        Performance is tracked weekly and compared against each other and a
        benchmark (SPY, S&amp;P 500).
      </p>
    </section>
  );
}
