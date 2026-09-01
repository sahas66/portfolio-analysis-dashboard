export default function Reflection() {
  return (
    <section>
      <h1>Reflection</h1>
      <p>
        I was on vacation for May and June, including an unplanned trip
        for most of June, which wasn't ideal for creating and monitoring
        stock portfolios. In order to utilize my time, I extended my
        knowledge on coding languages and researched stock data to help
        me build a strong foundation for creating my product. That's
        honestly why my real portfolio experiment starts July 14, 2026
        instead of earlier, since that's when I actually got back and
        could start creating and monitoring the actual portfolios.
      </p>
      <p>
        This project taught me a lot more than I expected going in. On the
        technical side, I got real hands-on exposure to HTML, JavaScript,
        and React, mostly by reading, testing, and tweaking code rather
        than stubbornly trying to write every line myself from scratch
        with no prior experience. I also got a lot better at using GitHub,
        including debugging real deployment issues like permission errors
        and figuring out why builds were silently failing. I learned what
        it actually takes to design a fair experiment too: locking in
        trading rules before I see any results, keeping both portfolios
        identical at the start so only the strategy differs, and being
        honest about what's a real tracked result versus a backtest
        estimate.
      </p>
      <p>
        Dealing with problems along the way was honestly a big part of the
        project too. Deployment issues, trading logic bugs, building the
        site, and just learning new things as I went all pushed me to get
        better at adapting when something didn't work the first time.
      </p>
      <p>
        Beyond the technical side, this project also taught me a lot about
        balancing everything going on in my life at once: sports, other
        extracurriculars, an internship, a vacation that cut into my
        original plan, and still finding time to learn something genuinely
        new. I had to adjust my plan more than once, including simplifying
        my approach when I ran into real technical roadblocks, and I think
        that adaptability was as much a part of this project as the coding
        or the finance was.
      </p>
      <p className="placeholder">
        TODO: I still need to write this once I have real results. I want
        to talk about what Portfolio A (Long-Term) vs. Portfolio B
        (Short-Term) actually showed, what surprised me, and what I'd
        change if I did this again.
      </p>

      <h2>Development Timeline</h2>
      <p>
        A few milestones from my commit history. Full history is on{' '}
        <a
          href="https://github.com/sahas66/portfolio-analysis-dashboard/commits/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <ul>
        <li>Aug 24, 2026: Initial commit</li>
        <li>Aug 24, 2026: Converted the site to a static React app instead of using a backend</li>
        <li>Aug 24, 2026: Filled in the Methodology and Home content for the Investopedia simulation</li>
        <li>Aug 30, 2026: Added a historical price chart using real market data</li>
        <li>Aug 30, 2026: Added a backtested strategy comparison chart using real historical prices</li>
        <li>Aug 30, 2026: Corrected the real experiment start date to July 14, 2026</li>
        <li>Aug 30, 2026: Reran the backtest using the real $25,000 allocation instead of a flat share count</li>
        <li>Aug 31, 2026: Added my reflection on what I learned from this project</li>
      </ul>
    </section>
  );
}
