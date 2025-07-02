
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from './Button'; // Assuming Button component is in the same directory or accessible
import { ExclamationTriangleIcon } from './icons'; // Assuming an icon component

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
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-theme-bg-primary text-theme-text-primary p-6 font-sans">
          <ExclamationTriangleIcon className="w-16 h-16 text-status-error mb-6" />
          <h1 className="text-3xl font-bold text-theme-accent-primary mb-4">Cosmic Anomaly Detected</h1>
          <p className="text-lg text-theme-text-secondary mb-2 text-center max-w-md">
            A quantum fluctuation has occurred in the forge. We apologize for the inconvenience.
          </p>
          <p className="text-sm text-theme-text-secondary mb-8 text-center max-w-md">
            Try reloading the application. If the problem persists, check the developer console for more information.
          </p>
          
          <Button onClick={this.handleReload} variant="default" size="lg">
            Reload Application
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-8 p-4 bg-theme-bg-secondary rounded-lg text-left max-w-xl w-full overflow-auto border border-theme-border-primary">
              <summary className="cursor-pointer text-theme-accent-primary hover:opacity-80">Error Details (Development)</summary>
              <pre className="mt-2 text-xs text-theme-text-primary whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
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
