import { useState } from 'react';
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

export default function App() {
  const [page, setPage] = useState('Home');
  const Page = PAGES[page];

  return (
    <div className="app-shell">
      <nav>
        {Object.keys(PAGES).map((name) => (
          <button
            key={name}
            className={name === page ? 'active' : ''}
            onClick={() => setPage(name)}
          >
            {name}
          </button>
        ))}
      </nav>
      <main>
        <Page />
      </main>
    </div>
  );
}
