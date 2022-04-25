import React from 'react';

import { ThemeProvider } from 'styled-components';
import { LightTheme } from 'theme';

import { Router } from './routes';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
