import { useEditMode } from '../context/EditModeContext.jsx';

export default function Editable({ page, id, as: Tag = 'p', text, className = '' }) {
  const { editMode, edits, setEditText } = useEditMode();
  const value = edits[page]?.[id] ?? text;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={`${className} editable-field`.trim()}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => setEditText(page, id, e.currentTarget.innerText)}
    >
      {value}
    </Tag>
  );
}
