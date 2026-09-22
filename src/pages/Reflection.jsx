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
        <Editable
          page="Reflection"
          id="placeholder"
          className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 italic leading-relaxed text-slate-400"
          text={
            "TODO: I still need to write this once I have real results. I want " +
            "to talk about what Portfolio A (Long-Term) vs. Portfolio B " +
            "(Short-Term) actually showed, what surprised me, and what I'd " +
            "change if I did this again."
          }
        />
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
          <li className="pl-3">Jun-Jul, 2026: Researched Python and JavaScript, and brainstormed ideas</li>
          <li className="pl-3">Jul 14, 2026: Started portfolio experiment</li>
          <li className="pl-3">Aug 24, 2026: Initial commit</li>
          <li className="pl-3">Aug 24, 2026: Converted the site to a static React app instead of using a backend</li>
          <li className="pl-3">Aug 24, 2026: Filled in the Methodology and Home content for the Investopedia simulation</li>
          <li className="pl-3">Aug 30, 2026: Added a historical price chart using real market data</li>
          <li className="pl-3">Aug 30, 2026: Added a backtested strategy comparison chart using real historical prices</li>
          <li className="pl-3">Aug 30, 2026: Corrected the real experiment start date to July 14, 2026</li>
          <li className="pl-3">Aug 30, 2026: Reran the backtest using the real $25,000 allocation instead of a flat share count</li>
          <li className="pl-3">Aug 31, 2026: Added my reflection on what I learned from this project</li>
        </ol>
      </div>
    </section>
  );
}
