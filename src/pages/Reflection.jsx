import Editable from '../components/Editable.jsx';

export default function Reflection() {
  return (
    <section className="space-y-8">
      <div className="space-y-5">
        <Editable
          page="Reflection"
          id="title"
          as="h1"
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          text="Reflection"
        />
        <Editable
          page="Reflection"
          id="vacation"
          className="leading-relaxed text-slate-300"
          text={
            "I was on vacation for May and June, including an unplanned trip " +
            "for most of June, which wasn't ideal for creating and monitoring " +
            "stock portfolios. In order to utilize my time, I extended my " +
            "knowledge on coding languages and researched stock data to help " +
            "me build a strong foundation for creating my product. That's " +
            "honestly why my real portfolio experiment starts July 14, 2026 " +
            "instead of earlier, since that's when I actually got back and " +
            "could start creating and monitoring the actual portfolios."
          }
        />
        <Editable
          page="Reflection"
          id="technical"
          className="leading-relaxed text-slate-300"
          text={
            "This project taught me a lot more than I expected going in. On the " +
            "technical side, I got real hands-on exposure to HTML, JavaScript, " +
            "and React, mostly by reading, testing, and tweaking code rather " +
            "than stubbornly trying to write every line myself from scratch " +
            "with no prior experience. I also got a lot better at using GitHub, " +
            "including debugging real deployment issues like permission errors " +
            "and figuring out why builds were silently failing. I learned what " +
            "it actually takes to design a fair experiment too: locking in " +
            "trading rules before I see any results, keeping both portfolios " +
            "identical at the start so only the strategy differs, and being " +
            "honest about what's a real tracked result versus a backtest " +
            "estimate."
          }
        />
        <Editable
          page="Reflection"
          id="problems"
          className="leading-relaxed text-slate-300"
          text={
            "Dealing with problems along the way was honestly a big part of the " +
            "project too. Deployment issues, trading logic bugs, building the " +
            "site, and just learning new things as I went all pushed me to get " +
            "better at adapting when something didn't work the first time."
          }
        />
        <Editable
          page="Reflection"
          id="balance"
          className="leading-relaxed text-slate-300"
          text={
            "Beyond the technical side, this project also taught me a lot about " +
            "balancing everything going on in my life at once: sports, other " +
            "extracurriculars, an internship, a vacation that cut into my " +
            "original plan, and still finding time to learn something genuinely " +
            "new. I had to adjust my plan more than once, including simplifying " +
            "my approach when I ran into real technical roadblocks, and I think " +
            "that adaptability was as much a part of this project as the coding " +
            "or the finance was."
          }
        />
        <div className="space-y-2">
          <Editable
            page="Reflection"
            id="resultsHeading"
            as="h3"
            className="text-base font-semibold text-white"
            text="What the results showed"
          />
          <Editable
            page="Reflection"
            id="resultsBody"
            className="leading-relaxed text-slate-300"
            text={
              "By the end, Portfolio A (Long-Term) was worth $25,914.25, up " +
              "about 3.7% from where it started. Portfolio B (Short-Term) " +
              "ended up slightly ahead at $26,036.35, up about 4.2%. So the " +
              "short-term strategy won, but only by a little over $100, which " +
              "was pretty close to what I expected going in."
            }
          />
        </div>
        <div className="space-y-2">
          <Editable
            page="Reflection"
            id="surprisedHeading"
            as="h3"
            className="text-base font-semibold text-white"
            text="What surprised me"
          />
          <Editable
            page="Reflection"
            id="surprisedBody"
            className="leading-relaxed text-slate-300"
            text={
              "Honestly, what surprised me most was just how well both " +
              "strategies actually worked. I knew going in that professional, " +
              "rule-based investment strategies were effective, but seeing " +
              "almost $1,000 in gains on both sides made that a lot more real " +
              "than just reading about it. I predicted short-term trading " +
              "would win, but I thought the gap would be closer than it " +
              "turned out to be. The gap ended up being about the size I " +
              "expected, just with the two strategies switched from what I " +
              "guessed."
            }
          />
        </div>
        <div className="space-y-2">
          <Editable
            page="Reflection"
            id="changeHeading"
            as="h3"
            className="text-base font-semibold text-white"
            text="What I'd change if I did this again"
          />
          <Editable
            page="Reflection"
            id="changeBody"
            className="leading-relaxed text-slate-300"
            text={
              "If I could do this over, the biggest thing would honestly be " +
              "having more time. Losing most of June and part of July to " +
              "being busy really cut into how long I could actually run the " +
              "experiment. If I had more time, I'd want to experiment with " +
              "different rule thresholds instead of just sticking with my " +
              "first set of numbers, check in on both portfolios more often, " +
              "and maybe add a few more tickers to see if the results held up " +
              "across a bigger mix of stocks."
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <Editable
          page="Reflection"
          id="timelineHeading"
          as="h2"
          className="text-lg font-semibold text-white"
          text="Development Timeline"
        />
        <Editable
          page="Reflection"
          id="timelineIntro"
          className="text-slate-300"
          text="A few milestones from my commit history."
        />
        <ol className="card space-y-2 border-l-2 border-l-slate-700 text-sm text-slate-300">
          <li className="pl-3">Jun-Jul 2026: Researched Python and JavaScript, brainstormed project ideas, and started journaling</li>
          <li className="pl-3">Jun-Jul 2026: Journaled my brainstorming process and prepared for the portfolio experiment</li>
          <li className="pl-3">Jul 14, 2026: Started the portfolio experiment</li>
          <li className="pl-3">Aug 24, 2026: Made the initial commit</li>
          <li className="pl-3">Aug 25, 2026: Converted the site to a static React application instead of using a backend</li>
          <li className="pl-3">Aug 27, 2026: Completed the Methodology and Home page content for the Investopedia simulation</li>
          <li className="pl-3">Aug 30, 2026: Added a historical price chart using real market data</li>
          <li className="pl-3">Aug 31, 2026: Added a backtested strategy comparison chart using real historical prices</li>
          <li className="pl-3">Sep 3, 2026: Corrected the actual experiment start date to July 14, 2026</li>
          <li className="pl-3">Sep 5, 2026: Reran the backtest using the actual $25,000 portfolio allocation instead of a flat share count</li>
          <li className="pl-3">Sep 10, 2026: Added my reflection on what I learned from the project</li>
          <li className="pl-3">Sep 12, 2026: Polished the site and fixed formatting and presentation issues</li>
          <li className="pl-3">Sep 15-24, 2026: Worked on getting all project materials into ManageBac and coordinated with my advisor</li>
        </ol>
      </div>
    </section>
  );
}
