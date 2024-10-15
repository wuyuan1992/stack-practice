import React, { ReactNode } from 'react';

// 定义 Props 接口
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  message?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorIndicate message={this.props.message} />;
    }

    return this.props.children;
  }
}

export function ErrorIndicate({ message = 'Error happens' }: { message?: string }) {
  return <div className="w-full h-full flex items-center justify-center">{message}</div>;
}
