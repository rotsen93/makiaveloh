import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'monospace',
          color: '#e5e7eb',
          background: '#0a0f1b',
        }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Something went wrong</h1>
          <p style={{ color: '#9ca3af' }}>The page hit an unexpected error. Reload to continue.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #f472b6',
              background: 'transparent',
              color: '#f472b6',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
