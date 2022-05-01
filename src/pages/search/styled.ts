import styled from 'styled-components';
import { mediaQueries } from 'utils/media-queries';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};

  ${mediaQueries.desktop} {
  }
`;

export const DesktopSideImage = styled.img`
  display: none;
  ${mediaQueries.desktop} {
    display: flex;
    height: 100%;
    flex: 3;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
`;
