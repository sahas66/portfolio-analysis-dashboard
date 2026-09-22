import { createContext, useContext, useState } from 'react';

const EditModeContext = createContext(null);

export function EditModeProvider({ children }) {
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits] = useState({});

  const setEditText = (page, id, text) => {
    setEdits((prev) => ({
      ...prev,
      [page]: { ...prev[page], [id]: text },
    }));
  };

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const getEditsAsText = () => {
    const pages = Object.keys(edits).filter(
      (page) => Object.keys(edits[page] || {}).length > 0
    );
    if (pages.length === 0) {
      return 'No edits made yet.';
    }
    return pages
      .map((page) => {
        const fields = edits[page];
        const fieldLines = Object.keys(fields)
          .map((id) => `[${id}]\n${fields[id]}`)
          .join('\n\n');
        return `=== ${page} ===\n${fieldLines}`;
      })
      .join('\n\n');
  };

  return (
    <EditModeContext.Provider
      value={{ editMode, toggleEditMode, edits, setEditText, getEditsAsText }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return ctx;
}
