import React from 'react';

import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';

import { LightTheme } from 'theme';

import { SearchPage } from './SearchPage';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SearchPage', () => {
  it('renders form component', async () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <SearchPage />
      </ThemeProvider>
    );

    const loginForm = screen.getByTestId('login-form');

    expect(loginForm).toBeInTheDocument();
  });
});
