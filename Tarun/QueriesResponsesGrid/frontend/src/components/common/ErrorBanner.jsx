/**
 * ErrorBanner — dismissible error banner with retry button.
 */
export default function ErrorBanner({ message, onRetry, onDismiss }) {
  return (
    <div className="error-banner" role="alert">
      <div className="error-banner__content">
        <svg className="error-banner__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="error-banner__message">{message}</span>
      </div>
      <div className="error-banner__actions">
        {onRetry && (
          <button className="error-banner__retry-btn" onClick={onRetry}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
            Retry
          </button>
        )}
        {onDismiss && (
          <button className="error-banner__dismiss-btn" onClick={onDismiss} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
