// components/ErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button'; // Ensure Button is in the same directory
import { ExclamationTriangleIcon } from './icons'; // Ensure icon is available

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-charcoal-dark text-off-white p-6 font-sans">
          <ExclamationTriangleIcon className="w-16 h-16 text-error mb-6" />
          <h1 className="text-3xl font-bold text-amber mb-4">Cosmic Anomaly Detected</h1>
          <p className="text-lg text-off-white-dim mb-2 text-center max-w-md">
            A quantum fluctuation has occurred in the IdeaForge. Apologies for this brief journey
            into the unexpected.
          </p>
          <p className="text-sm text-off-white-dim mb-8 text-center max-w-md">
            Try re-igniting the forge (reload). If the anomaly persists, consult the star-charts
            (console) or consider a full data dissolution if corruption is suspected.
          </p>

          <Button onClick={this.handleReload} variant="default" size="lg">
            Reload Application
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 p-4 bg-charcoal-light rounded-lg text-left max-w-xl w-full overflow-auto">
              <summary className="cursor-pointer text-amber hover:text-amber-light">
                Anomaly Report (Dev Sector)
              </summary>
              <pre className="mt-2 text-xs text-off-white whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
