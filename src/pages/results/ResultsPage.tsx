import React from 'react';

import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { IItem } from 'api/items/types';
import { useItems } from 'api/items';
import { TableTitle } from 'components/table-title';
import { TableHeader } from 'components/table-header/TableHeader';
import { LoadingDots } from 'components/loading-dots';

import { headCells, ROWS_PER_PAGE_NUMBER, TABLE_ROW_HEIGHT } from './constants';
import { CenteredContainer, ConstrainedTableCell, Container, MobileHidden } from './styled';
import { Order } from './types';
import { getComparator, getEmptyRows } from './utils';

export const ResultsPage = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IItem>('login');
  const [page, setPage] = React.useState(0);

  const { login } = useParams<{
    login?: string;
  }>();

  const {
    items,
    error: apiError,
    isLoading,
  } = useItems({
    login,
  });

  const handleRequestSort = (property: keyof IItem) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (apiError) {
    return <CenteredContainer>Sorry, something went wrong with the request.</CenteredContainer>;
  }

  const emptyRows = getEmptyRows({
    pageNumber: page,
    resultsLength: items.length,
    rowsPerPage: ROWS_PER_PAGE_NUMBER,
  });

  return (
    <Container>
      {!isLoading ? (
        <>
          <Box>
            <TableTitle title={'Items'} />
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={'medium'}>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={headCells}
                />
                <TableBody>
                  {items
                    .slice(
                      page * ROWS_PER_PAGE_NUMBER,
                      page * ROWS_PER_PAGE_NUMBER + ROWS_PER_PAGE_NUMBER
                    )
                    .sort(getComparator(order, orderBy))
                    .map((item: IItem) => {
                      return (
                        <TableRow hover tabIndex={-1} key={item.login}>
                          <ConstrainedTableCell>{item.login}</ConstrainedTableCell>
                          <ConstrainedTableCell>{item.avatar_url}</ConstrainedTableCell>
                          <ConstrainedTableCell>{item.type}</ConstrainedTableCell>
                        </TableRow>
                      );
                    })}
                  <MobileHidden>
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: TABLE_ROW_HEIGHT * emptyRows,
                        }}
                      >
                        <ConstrainedTableCell colSpan={3} />
                      </TableRow>
                    )}
                  </MobileHidden>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TablePagination
            component="div"
            count={items.length}
            rowsPerPageOptions={[]} //to not show the option
            rowsPerPage={ROWS_PER_PAGE_NUMBER}
            page={page}
            onPageChange={handleChangePage}
          />
        </>
      ) : (
        <CenteredContainer>
          <LoadingDots />
        </CenteredContainer>
      )}
    </Container>
  );
};
