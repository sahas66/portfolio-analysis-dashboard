import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Methodology from './pages/Methodology.jsx';
import Results from './pages/Results.jsx';
import Reflection from './pages/Reflection.jsx';

const PAGES = {
  Home,
  Methodology,
  Results,
  Reflection,
};

function pageFromHash() {
  const name = window.location.hash.replace('#', '');
  return PAGES[name] ? name : 'Home';
}

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const Page = PAGES[page];

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <nav>
        {Object.keys(PAGES).map((name) => (
          <button
            key={name}
            className={name === page ? 'active' : ''}
            onClick={() => {
              window.location.hash = name;
              setPage(name);
            }}
          >
            {name}
          </button>
        ))}
      </nav>
      <main>
        <Page />
      </main>
    </>
  );
}
