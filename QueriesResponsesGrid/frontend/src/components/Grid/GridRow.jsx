import GridCell from './GridCell';

/**
 * GridRow — renders a single row with cells and action buttons.
 */
export default function GridRow({ row, columns, onUpdate, onDelete, isSaving, index }) {
  return (
    <div className={`grid-row ${isSaving ? 'grid-row--saving' : ''}`} style={{ animationDelay: `${index * 30}ms` }}>
      {/* Row number */}
      <div className="grid-row__number">
        {index + 1}
      </div>

      {/* Data cells */}
      {columns.map((col) => (
        <GridCell
          key={col.key}
          value={row.data[col.key] || ''}
          field={col.key}
          rowId={row._id}
          onUpdate={onUpdate}
          isSaving={isSaving}
        />
      ))}

      {/* Actions */}
      <div className="grid-row__actions">
        <button
          className="grid-row__delete-btn"
          onClick={() => onDelete(row._id)}
          title="Delete row"
          aria-label="Delete row"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
}
