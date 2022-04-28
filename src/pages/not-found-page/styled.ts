import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
`;
