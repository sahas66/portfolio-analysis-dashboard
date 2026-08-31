export default function Methodology() {
  return (
    <section>
      <h1>Methodology</h1>

      <p>
        For my IB Personal Project, I'm comparing two ways of investing:
        just buying and holding (Portfolio A, Long-Term) vs. actively
        trading based on some rules I set (Portfolio B, Short-Term). I'm
        doing this on the
        Investopedia Stock Simulator so I don't need real money.
      </p>

      <p>
        I started both portfolios with $100,000 on August 24, 2026. I
        split $25,000 evenly across 7 stocks and ETFs: VOO, BND, AAPL,
        JNJ, PG, XOM, and COIN. About $3,571 went into each one. I
        kept the other $75,000 as cash.
      </p>

      <h2>Portfolio A (Long-Term)</h2>
      <p>
        I just hold these and don't trade them. The only rule: if a stock
        drops 15% or more below what I paid for it, I'm allowed to sell it.
      </p>

      <h2>Portfolio B (Short-Term)</h2>
      <p>
        This one follows a simple rule I made up: buy more of a stock if
        it's priced below its own 5-day average, and sell it once it goes
        up 3% or down 3% from what I paid.
      </p>

      <p>
        I'm checking on both portfolios every week and comparing them to
        each other and to the S&amp;P 500 (SPY) as a benchmark.
      </p>

      <p>
        I also added a chart of real price history from mid-July 2026
        onward for all 7 stocks, just for context. The actual experiment
        with my trading rules didn't start until August 24, 2026.
      </p>

      <p>
        I also built a "backtest" that runs both portfolios' rules on that
        same real price data starting mid-July, just to see what
        would've happened. For the backtest, I had to make a few
        decisions since my rules didn't cover everything:
      </p>
      <ul>
        <li>Each portfolio starts with 10 shares of each stock (same as my real trades)</li>
        <li>Once I sell something, I don't buy it back later</li>
        <li>Portfolio B (Short-Term) only buys more shares using cash freed up from its own sells, not new money</li>
        <li>I need 5 days of price history before the 5-day-average rule can even apply</li>
      </ul>
    </section>
  );
}
