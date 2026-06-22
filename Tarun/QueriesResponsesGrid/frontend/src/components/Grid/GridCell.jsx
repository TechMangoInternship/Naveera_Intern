import { useState, useRef, useEffect } from 'react';

/**
 * GridCell — an inline-editable cell with click-to-edit behavior.
 * Switches between display mode (text) and edit mode (textarea).
 * Triggers auto-save on blur via the onUpdate callback.
 */
export default function GridCell({ value, field, rowId, onUpdate, isSaving }) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const textareaRef = useRef(null);

  // Sync with prop changes (e.g., after rollback)
  useEffect(() => {
    if (!editing) {
      setLocalValue(value);
    }
  }, [value, editing]);

  // Auto-focus textarea when entering edit mode
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at end
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    if (localValue !== value) {
      onUpdate(rowId, field, localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setLocalValue(value);
      setEditing(false);
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      textareaRef.current?.blur();
    }
    // Tab moves to next cell naturally
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  return (
    <div className={`grid-cell ${editing ? 'grid-cell--editing' : ''} ${isSaving ? 'grid-cell--saving' : ''}`}>
      {editing ? (
        <textarea
          ref={textareaRef}
          className="grid-cell__input"
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={1}
        />
      ) : (
        <div
          className="grid-cell__display"
          onClick={handleClick}
          tabIndex={0}
          onFocus={handleClick}
          role="button"
          aria-label={`Edit ${field}`}
        >
          {localValue || <span className="grid-cell__placeholder">Click to edit…</span>}
        </div>
      )}
      {isSaving && (
        <div className="grid-cell__saving-indicator" title="Saving…">
          <div className="grid-cell__saving-dot" />
        </div>
      )}
    </div>
  );
}
