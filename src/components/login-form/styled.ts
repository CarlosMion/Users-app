import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  button {
    margin-top: 16px;
  }
`;

export const LoginTextField = styled(TextField)`
  border-radius: 8px;
`;
