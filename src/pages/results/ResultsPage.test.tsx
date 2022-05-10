import React from 'react';

import { useQuery } from 'react-query';
import { render, screen } from '@testing-library/react';

import { mockItems } from 'api/fixtures';
import { ResultsPage } from './ResultsPage';
import { useItems } from 'api/items';
import { LightTheme } from 'theme';
import { ThemeProvider } from 'styled-components';

jest.mock('api/items', () => ({
  useItems: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    login: 'foo',
  }),
}));

describe('ResultsPage', () => {
  it('shows loading state when api is loading', async () => {
    (useItems as jest.Mock).mockReturnValue({
      items: mockItems.items,
      error: undefined,
      isLoading: true,
    });

    render(
      <ThemeProvider theme={LightTheme}>
        <ResultsPage />
      </ThemeProvider>
    );

    const loadingDots = screen.getByTestId('loading-dots');

    expect(loadingDots).toBeInTheDocument();
  });

  it('shows error state when api fails', async () => {
    (useItems as jest.Mock).mockReturnValue({
      items: undefined,
      error: {},
      isLoading: false,
    });

    render(
      <ThemeProvider theme={LightTheme}>
        <ResultsPage />
      </ThemeProvider>
    );

    const errorMessage = screen.getByText('Sorry, something went wrong with the request.');

    expect(errorMessage).toBeInTheDocument();
  });

  it('shows correct state when api returns correctly', async () => {
    (useItems as jest.Mock).mockReturnValue({
      items: mockItems.items,
      error: undefined,
      isLoading: false,
    });

    render(
      <ThemeProvider theme={LightTheme}>
        <ResultsPage />
      </ThemeProvider>
    );

    const loadingDots = screen.queryByTestId('loading-dots');
    const tableTitle = screen.getByText('Items');

    expect(loadingDots).not.toBeInTheDocument();
    expect(tableTitle).toBeInTheDocument();
  });
});
