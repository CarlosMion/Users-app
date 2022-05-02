import React from 'react';

import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { IUser } from 'api/users/types';
import { useUsers } from 'api/users';
import { TableTitle } from 'components/table-title';
import { TableHeader } from 'components/table-header/TableHeader';
import { LoadingDots } from 'components/loading-dots';

import { headCells, ROWS_PER_PAGE_NUMBER } from './constants';
import { CenteredContainer, ConstrainedTableCell, Container, MobileHidden } from './styled';
import { Order } from './types';
import { getComparator, getEmptyRows } from './utils';

export const ResultsPage = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IUser>('login');
  const [page, setPage] = React.useState(0);

  const { login } = useParams<{
    login?: string;
  }>();

  const {
    users,
    error: apiError,
    isLoading,
  } = useUsers({
    login,
  });

  const handleRequestSort = (property: keyof IUser) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const emptyRows = getEmptyRows({
    pageNumber: page,
    resultsLength: users.length,
    rowsPerPage: ROWS_PER_PAGE_NUMBER,
  });

  if (apiError) {
    return <CenteredContainer>Sorry, something went wrong with the request.</CenteredContainer>;
  }

  return (
    <Container>
      {!isLoading ? (
        <>
          <Box>
            <TableTitle title={'Users'} />
            <TableContainer>
              <Table aria-labelledby="tableTitle" size={'medium'}>
                <TableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={headCells}
                />
                <TableBody>
                  {users
                    .slice(
                      page * ROWS_PER_PAGE_NUMBER,
                      page * ROWS_PER_PAGE_NUMBER + ROWS_PER_PAGE_NUMBER
                    )
                    .sort(getComparator(order, orderBy))
                    .map(user => {
                      return (
                        <TableRow hover tabIndex={-1} key={user.login}>
                          <ConstrainedTableCell>{user.login}</ConstrainedTableCell>
                          <ConstrainedTableCell>{user.avatar_url}</ConstrainedTableCell>
                          <ConstrainedTableCell>{user.type}</ConstrainedTableCell>
                        </TableRow>
                      );
                    })}
                  <MobileHidden>
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
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
            count={users?.length}
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
