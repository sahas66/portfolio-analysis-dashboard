import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

  // Hidden from visitors by default. Toggle with Ctrl+Shift+E (Cmd+Shift+E on
  // Mac) — see the shortcut listener in AppContent. Once on, this toolbar
  // appears so it can be switched off again without the shortcut.
  if (!editMode) {
    return null;
  }

  return (
    <div className="ml-auto flex gap-2">
      <button
        className="rounded-lg border border-brand-amber bg-brand-amber px-3 py-1.5 text-sm font-medium text-white transition-colors"
        onClick={toggleEditMode}
      >
        Edit Mode: ON
      </button>
      <button
        className="rounded-lg border border-brand-green px-3 py-1.5 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green/10"
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : 'Copy edited content'}
      </button>
    </div>
  );
}

function EditModeBanner() {
  return (
    <div className="mb-6 rounded-lg border border-brand-amber bg-brand-amber/10 px-4 py-3 text-sm text-brand-amber">
      Edit Mode is ON — changes here are local only and will NOT save
      automatically. Use "Copy edited content" and paste it to Claude to
      actually save and deploy.
    </div>
  );
}

function AppContent() {
  const [page, setPage] = useState(pageFromHash);
  const Page = PAGES[page];
  const { editMode, toggleEditMode } = useEditMode();

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Secret shortcut to reveal Edit Mode: Ctrl+Shift+E (Cmd+Shift+E on Mac).
  // The toggle button stays hidden from regular visitors otherwise.
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        toggleEditMode();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleEditMode]);

  return (
    <div className="mx-auto max-w-content px-6 py-10">
      <nav className="mb-10 flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {Object.keys(PAGES).map((name) => (
          <button
            key={name}
            className={name === page ? 'nav-link nav-link-active' : 'nav-link'}
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
      <main>
        {editMode && <EditModeBanner />}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Page />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <EditModeProvider>
      <AppContent />
    </EditModeProvider>
  );
}
