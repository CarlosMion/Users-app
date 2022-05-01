import React from 'react';

import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import { ITableHeader } from './types';

export const TableHeader = ({ title }: ITableHeader) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
    </Toolbar>
  );
};
