import React from 'react';

import { ThemeProvider } from 'styled-components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LightTheme } from 'theme';

import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginForm', () => {
  it('calls navigate on input foo and click search', async () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <LoginForm />
      </ThemeProvider>
    );

    const loginTextInput: HTMLInputElement = screen.getByLabelText('Login');
    const searchButton = screen.getByRole('button');

    userEvent.type(loginTextInput, 'foo');
    userEvent.click(searchButton);

    expect(useNavigate).toHaveBeenCalled();
  });

  it('shows error messages when fail validations', async () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <LoginForm />
      </ThemeProvider>
    );
    const submitButton = screen.getByRole('button');

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });
});
