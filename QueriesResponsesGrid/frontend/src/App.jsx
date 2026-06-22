import Grid from './components/Grid/Grid';
import './App.css';

/**
 * App — root component with header and grid content.
 */
function App() {
  return (
    <div className="app">
      {/* Background decorations */}
      <div className="app-bg" aria-hidden="true">
        <div className="app-bg__gradient-1" />
        <div className="app-bg__gradient-2" />
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="app-header__brand">
          <div className="app-header__logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
          </div>
          <div>
            <h1 className="app-header__title">Queries &amp; Responses</h1>
            <p className="app-header__subtitle">Dynamic editable grid</p>
          </div>
        </div>

        <div className="app-header__badge">
          <span className="app-header__badge-dot" />
          Auto-save enabled
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main" style={{ position: 'relative', zIndex: 1 }}>
        <Grid />
      </main>
    </div>
  );
}

export default App;
