import { useGrid } from '../../hooks/useGrid';
import GridToolbar from './GridToolbar';
import GridRow from './GridRow';
import Loader from '../common/Loader';
import ErrorBanner from '../common/ErrorBanner';
import Toast from '../common/Toast';
import './Grid.css';

/**
 * Grid — main container component for the editable spreadsheet grid.
 * Orchestrates toolbar, header, rows, and state overlays.
 */
export default function Grid() {
  const {
    grid,
    rows,
    loading,
    error,
    searchTerm,
    savingRows,
    toasts,
    addRow,
    updateRow,
    deleteRow,
    handleSearch,
    retry,
    dismissToast,
  } = useGrid();

  if (loading) {
    return (
      <div className="grid-wrapper">
        <Loader />
      </div>
    );
  }

  if (error && !grid) {
    return (
      <div className="grid-wrapper">
        <ErrorBanner message={error} onRetry={retry} />
      </div>
    );
  }

  const columns = grid?.columns || [];

  return (
    <div className="grid-wrapper">
      {/* Inline error (non-fatal) */}
      {error && grid && (
        <ErrorBanner message={error} onRetry={retry} onDismiss={() => {}} />
      )}

      {/* Toolbar */}
      <GridToolbar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onAddRow={addRow}
        rowCount={rows.length}
      />

      {/* Grid Table */}
      <div className="grid-container">
        <div className="grid-table" role="grid">
          {/* Header */}
          <div className="grid-header" role="row">
            <div className="grid-header__num" role="columnheader">#</div>
            {columns.map((col) => (
              <div className="grid-header__cell" role="columnheader" key={col.key}>
                <span className="grid-header__label">{col.label}</span>
                {col.required && <span className="grid-header__required">*</span>}
              </div>
            ))}
            <div className="grid-header__actions" role="columnheader">
              <span className="sr-only">Actions</span>
            </div>
          </div>

          {/* Body */}
          <div className="grid-body" role="rowgroup">
            {rows.length === 0 ? (
              <div className="grid-empty">
                <div className="grid-empty__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="3" y1="15" x2="21" y2="15" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </div>
                <p className="grid-empty__title">No rows yet</p>
                <p className="grid-empty__subtitle">
                  {searchTerm
                    ? 'No results match your search. Try different keywords.'
                    : 'Click "Add Row" to get started.'}
                </p>
                {!searchTerm && (
                  <button className="grid-empty__add-btn" onClick={addRow}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add your first row
                  </button>
                )}
              </div>
            ) : (
              rows.map((row, index) => (
                <GridRow
                  key={row._id}
                  row={row}
                  columns={columns}
                  onUpdate={updateRow}
                  onDelete={deleteRow}
                  isSaving={savingRows.has(row._id)}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div className="grid-footer">
        <span className="grid-footer__stat">
          {rows.length} {rows.length === 1 ? 'row' : 'rows'}
          {searchTerm && ` matching "${searchTerm}"`}
        </span>
        <span className="grid-footer__hint">
          Click a cell to edit · Enter to save · Esc to cancel · Shift+Enter for new line
        </span>
      </div>

      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
