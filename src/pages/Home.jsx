import Editable from '../components/Editable.jsx';

export default function Home() {
  return (
    <section className="space-y-5">
      <Editable
        page="Home"
        id="title"
        as="h1"
        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        text="Portfolio Analysis Dashboard"
      />
      <Editable
        page="Home"
        id="intro"
        className="leading-relaxed text-slate-300"
        text={
          "Description of IB Personal Project: My aim was to discover if " +
          "actively trading stocks based on a set rule (Portfolio B, Short-Term) " +
          "actually outperforms a simple buy-and-hold approach (Portfolio A, " +
          "Long-Term) over time. " +
          "I'm testing this using the Investopedia Stock Simulator, so all the " +
          "trades use real market prices but simulated money, and no actual " +
          "financial risk."
        }
      />
      <Editable
        page="Home"
        id="allocation"
        className="leading-relaxed text-slate-300"
        text={
          "Both portfolios started with $100,000 on July 14, 2026. I " +
          "invested $25,000 evenly across the same 7 stocks and ETFs in each " +
          "portfolio, and kept the remaining $75,000 as cash. Keeping the two " +
          "portfolios identical at the start was intentional, and it means any " +
          "difference in performance later can be traced back to the trading " +
          "strategy itself, not just different stock picks."
        }
      />
      <Editable
        page="Home"
        id="outro"
        className="leading-relaxed text-slate-300"
        text={
          "This site walks through my methodology, tracks results as they " +
          "come in, and reflects on what the comparison actually shows."
        }
      />
    </section>
  );
}
