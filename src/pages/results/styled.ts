import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { mediaQueries } from 'utils/media-queries';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  ${mediaQueries.desktop} {
    justify-content: unset;
  }
`;

export const ConstrainedTableCell = styled(TableCell)`
  white-space: nowrap;
  max-height: 53px;
`;

export const CenteredContainer = styled(Box)`
  height: 100%;
  display: grid;
  place-items: center;
`;

export const MobileHidden = styled(Box)`
  display: none;

  ${mediaQueries.desktop} {
    display: flex;
  }
`;
