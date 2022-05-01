import React from 'react';

import { ITableHeader } from './types';
import { Container, Title } from './styled';

export const TableTitle = ({ title }: ITableHeader) => {
  return (
    <Container>
      <Title variant="h6" id="tableTitle">
        {title}
      </Title>
    </Container>
  );
};
