import React from 'react';

import { render, screen } from '@testing-library/react';

import { LightTheme } from 'theme';
import { ThemeProvider } from 'styled-components';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders', async () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <NotFoundPage />
      </ThemeProvider>
    );

    const errorMessage = screen.getByText("OOps, something wen't wrong!");

    expect(errorMessage).toBeInTheDocument();
  });
});
