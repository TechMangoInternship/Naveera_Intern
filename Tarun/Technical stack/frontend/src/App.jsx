import React from 'react';
import { LayoutGrid } from 'lucide-react';
import TechnicalStackGrid from './components/TechnicalStackGrid';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <div className="header-icon">
            <LayoutGrid size={20} />
          </div>
          <div className="header-text">
            <h1 className="app-title">Technical Stack Directory</h1>
            <p className="app-subtitle">Dynamic editable grid</p>
          </div>
        </div>
        <div className="header-right">
          <span className="status-badge">
            <span className="status-dot"></span>
            Auto-save enabled
          </span>
        </div>
      </header>
      
      <main className="main-content">
        <TechnicalStackGrid />
      </main>
    </div>
  );
}

export default App;
