import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Methodology from './pages/Methodology.jsx';
import Results from './pages/Results.jsx';
import Reflection from './pages/Reflection.jsx';
import { EditModeProvider, useEditMode } from './context/EditModeContext.jsx';

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

function EditModeToolbar() {
  const { editMode, toggleEditMode, getEditsAsText } = useEditMode();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = getEditsAsText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt('Copy this text:', text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="edit-mode-toolbar">
      <button
        className={editMode ? 'edit-mode-toggle active' : 'edit-mode-toggle'}
        onClick={toggleEditMode}
      >
        {editMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}
      </button>
      {editMode && (
        <button className="edit-mode-copy" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy edited content'}
        </button>
      )}
    </div>
  );
}

function AppContent() {
  const [page, setPage] = useState(pageFromHash);
  const Page = PAGES[page];
  const { editMode } = useEditMode();

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
        <EditModeToolbar />
      </nav>
      <main className={editMode ? 'edit-mode-active' : ''}>
        <Page />
      </main>
    </>
  );
}

export default function App() {
  return (
    <EditModeProvider>
      <AppContent />
    </EditModeProvider>
  );
}
