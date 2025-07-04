import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    // Optionally log error to an external service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f8ff] to-[#e0c3fc] dark:from-[#1a0036] dark:to-[#3a0ca3] text-center p-8">
          <h1 className="text-4xl font-bold text-[#ff6ec4] mb-4">Something went wrong.</h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">An unexpected error occurred. Please try refreshing the page.</p>
          {this.state.error && (
            <details className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap mt-4">
              {this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
