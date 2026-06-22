import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Search, Save, X } from 'lucide-react';

const EditableGrid = ({ rows, columns, onAddRow, onUpdateRow, onDeleteRow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editState, setEditState] = useState({}); // Tracks changes per row ID

  // Filter rows based on search term
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    const lowerTerm = searchTerm.toLowerCase();
    return rows.filter(row => {
      // Check all data values in the row for the search term
      return Object.values(row.data || {}).some(val => 
        String(val).toLowerCase().includes(lowerTerm)
      );
    });
  }, [rows, searchTerm]);

  // Handle cell change
  const handleCellChange = (rowId, column, value) => {
    setEditState(prev => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        [column]: value
      }
    }));
  };

  // Get current value (either from edit state or original row data)
  const getCellValue = (row, column) => {
    if (editState[row._id] && editState[row._id][column] !== undefined) {
      return editState[row._id][column];
    }
    return row.data[column] || '';
  };

  // Check if a row has unsaved changes
  const hasChanges = (rowId) => {
    return editState[rowId] && Object.keys(editState[rowId]).length > 0;
  };

  // Save changes for a row
  const handleSave = (row) => {
    if (!hasChanges(row._id)) return;
    
    const updatedData = {
      ...row.data,
      ...editState[row._id]
    };
    
    onUpdateRow(row._id, updatedData);
    
    // Clear edit state for this row
    setEditState(prev => {
      const newState = { ...prev };
      delete newState[row._id];
      return newState;
    });
  };

  // Cancel edits for a row
  const handleCancel = (rowId) => {
    setEditState(prev => {
      const newState = { ...prev };
      delete newState[rowId];
      return newState;
    });
  };

  return (
    <div className="card">
      <div className="grid-controls">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search grid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={onAddRow}>
          <Plus size={16} />
          Add Row
        </button>
      </div>

      <div className="table-container">
        {filteredRows.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? 'No results found for your search.' : 'Grid is empty. Add a row to get started.'}
          </div>
        ) : (
          <table className="editable-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => (
                <tr key={row._id}>
                  {columns.map(col => (
                    <td key={`${row._id}-${col}`}>
                      <input
                        type="text"
                        className="cell-input"
                        value={getCellValue(row, col)}
                        onChange={(e) => handleCellChange(row._id, col, e.target.value)}
                        onBlur={() => handleSave(row)} // Auto-save on blur
                      />
                    </td>
                  ))}
                  <td className="actions-cell">
                    <div className="actions-wrapper">
                      {hasChanges(row._id) && (
                        <>
                          <button 
                            className="btn-icon success" 
                            onClick={() => handleSave(row)}
                            title="Save Changes"
                          >
                            <Save size={16} />
                          </button>
                          <button 
                            className="btn-icon danger" 
                            onClick={() => handleCancel(row._id)}
                            title="Cancel Edits"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button 
                        className="btn-icon danger" 
                        onClick={() => onDeleteRow(row._id)}
                        title="Delete Row"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EditableGrid;
