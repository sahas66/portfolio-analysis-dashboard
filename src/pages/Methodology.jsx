import Editable from '../components/Editable.jsx';

export default function Methodology() {
  return (
    <section>
      <Editable page="Methodology" id="title" as="h1" text="Methodology" />

      <Editable
        page="Methodology"
        id="intro"
        text={
          "For my IB Personal Project, I'm comparing two ways of investing: " +
          "just buying and holding (Portfolio A, Long-Term) vs. actively " +
          "trading based on some rules I set (Portfolio B, Short-Term). I'm " +
          "doing this on the " +
          "Investopedia Stock Simulator so I don't need real money."
        }
      />

      <Editable
        page="Methodology"
        id="allocation"
        text={
          "I started both portfolios with $100,000 on July 14, 2026. I " +
          "split $25,000 evenly across 7 stocks and ETFs: VOO, BND, AAPL, " +
          "JNJ, PG, XOM, and COIN. About $3,571 went into each one. I " +
          "kept the other $75,000 as cash."
        }
      />

      <Editable page="Methodology" id="portfolioAHeading" as="h2" text="Portfolio A (Long-Term)" />
      <Editable
        page="Methodology"
        id="portfolioARule"
        text={
          "I just hold these and don't trade them. The only rule: if a stock " +
          "drops 15% or more below what I paid for it, I'm allowed to sell it."
        }
      />

      <Editable page="Methodology" id="portfolioBHeading" as="h2" text="Portfolio B (Short-Term)" />
      <Editable
        page="Methodology"
        id="portfolioBRule"
        text={
          "This one follows a simple rule I made up: buy more of a stock if " +
          "it's priced below its own 5-day average, and sell it once it goes " +
          "up 3% or down 3% from what I paid."
        }
      />

      <Editable
        page="Methodology"
        id="checking"
        text={
          "I'm checking on both portfolios every week and comparing them to " +
          "each other and to the S&P 500 (SPY) as a benchmark."
        }
      />

      <Editable
        page="Methodology"
        id="chartNote"
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
      <ul>
        <Editable
          page="Methodology"
          id="backtestRule1"
          as="li"
          text="Each portfolio starts with the real $25,000, split evenly across the 7 stocks and rounded down to whole shares, with the leftover kept as cash"
        />
        <Editable
          page="Methodology"
          id="backtestRule2"
          as="li"
          text="Once I sell something, I don't buy it back later"
        />
        <Editable
          page="Methodology"
          id="backtestRule3"
          as="li"
          text="Portfolio B (Short-Term) only buys more shares using cash freed up from rounding down or its own sells, not new money"
        />
        <Editable
          page="Methodology"
          id="backtestRule4"
          as="li"
          text="I need 5 days of price history before the 5-day-average rule can even apply"
        />
      </ul>
    </section>
  );
}
