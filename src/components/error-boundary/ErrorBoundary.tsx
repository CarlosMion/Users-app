import React, { Component, ErrorInfo, ReactNode } from 'react';

import { NotFoundPage } from 'pages/not-found-page';

import { MainTemplate } from './styled';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    return <MainTemplate>{this.props.children}</MainTemplate>;
  }
}

export default ErrorBoundary;
