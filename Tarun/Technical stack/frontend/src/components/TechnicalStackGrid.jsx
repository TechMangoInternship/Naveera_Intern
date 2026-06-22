import React, { useState, useEffect } from 'react';
import { gridService } from '../services/api';
import EditableGrid from './EditableGrid';

const GRID_NAME = 'Technical Stack';

// Dynamic initial columns - this can be expanded without database changes
const INITIAL_COLUMNS = [
  'Technical Stack',
  'Version',
  'Description',
  'Proficiency'
];

const TechnicalStackGrid = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    try {
      setLoading(true);
      const data = await gridService.getRows(GRID_NAME);
      setRows(data);
      setError(null);
    } catch (err) {
      setError('Failed to load grid data. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRow = async () => {
    try {
      // Create empty row data based on columns
      const emptyData = INITIAL_COLUMNS.reduce((acc, col) => {
        acc[col] = '';
        return acc;
      }, {});

      const newRow = await gridService.addRow(GRID_NAME, emptyData);
      setRows(prev => [...prev, newRow]);
    } catch (err) {
      console.error('Failed to add row', err);
      alert('Failed to add row');
    }
  };

  const handleUpdateRow = async (id, updatedData) => {
    try {
      const updatedRow = await gridService.updateRow(id, updatedData);
      setRows(prev => prev.map(row => (row._id === id ? updatedRow : row)));
    } catch (err) {
      console.error('Failed to update row', err);
      alert('Failed to update row');
      fetchRows(); // Refresh to get valid state
    }
  };

  const handleDeleteRow = async (id) => {
    if (!window.confirm('Are you sure you want to delete this row?')) return;
    
    try {
      await gridService.deleteRow(id);
      setRows(prev => prev.filter(row => row._id !== id));
    } catch (err) {
      console.error('Failed to delete row', err);
      alert('Failed to delete row');
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchRows} style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <EditableGrid
      rows={rows}
      columns={INITIAL_COLUMNS}
      onAddRow={handleAddRow}
      onUpdateRow={handleUpdateRow}
      onDeleteRow={handleDeleteRow}
    />
  );
};

export default TechnicalStackGrid;
