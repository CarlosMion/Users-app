import React from 'react';

import scalioImage from 'assets/scalio.png';

import { Container, DesktopSideImage, FormContainer } from './styled';
import { LoginForm } from 'components/login-form';

export const SearchPage = () => {
  return (
    <Container>
      <DesktopSideImage src={scalioImage} alt="Scalio logo, Tech forward. Human focused." />
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </Container>
  );
};
