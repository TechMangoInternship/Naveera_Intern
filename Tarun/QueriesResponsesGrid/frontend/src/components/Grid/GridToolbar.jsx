/**
 * GridToolbar — search bar, row count, and Add Row button.
 */
export default function GridToolbar({ searchTerm, onSearch, onAddRow, rowCount }) {
  return (
    <div className="grid-toolbar">
      <div className="grid-toolbar__left">
        {/* Search */}
        <div className="grid-toolbar__search">
          <svg className="grid-toolbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="grid-toolbar__search-input"
            placeholder="Search queries and responses…"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            id="grid-search-input"
          />
          {searchTerm && (
            <button
              className="grid-toolbar__search-clear"
              onClick={() => onSearch('')}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Row count */}
        <span className="grid-toolbar__count">
          {rowCount} {rowCount === 1 ? 'row' : 'rows'}
        </span>
      </div>

      <div className="grid-toolbar__right">
        <button
          className="grid-toolbar__add-btn"
          onClick={onAddRow}
          id="add-row-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Row
        </button>
      </div>
    </div>
  );
}
