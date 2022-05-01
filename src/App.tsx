import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ErrorBoundary } from 'components/error-boundary';

import { ThemeProvider } from 'styled-components';
import { LightTheme } from 'theme';

import { Router } from './routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={LightTheme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
