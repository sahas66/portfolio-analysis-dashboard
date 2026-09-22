import { useEditMode } from '../context/EditModeContext.jsx';

const EDITABLE_CLASSES =
  'cursor-text rounded outline-dashed outline-2 outline-offset-2 outline-brand-amber focus:bg-brand-green/10 focus:outline-brand-green';

export default function Editable({ page, id, as: Tag = 'p', text, className = '' }) {
  const { editMode, edits, setEditText } = useEditMode();
  const value = edits[page]?.[id] ?? text;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={`${className} ${EDITABLE_CLASSES}`.trim()}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => setEditText(page, id, e.currentTarget.innerText)}
    >
      {value}
    </Tag>
  );
}
