import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { IUser } from 'api/users/types';
import { useUsers } from 'api/users';
import { IEnhancedTableProps, IUserTableHeadCell, Order } from './types';
import { useParams } from 'react-router';
import { ROWS_PER_PAGE_NUMBER } from './constants';
import { TableHeader } from 'components/table-header';
import { Container } from './styled';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]?: string }, b: { [key in Key]?: string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly IUserTableHeadCell[] = [
  {
    id: 'login',
    numeric: false,
    disablePadding: false,
    label: 'Login',
  },
  {
    id: 'avatar_url',
    numeric: false,
    disablePadding: false,
    label: 'Avatar URL',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
];

function EnhancedTableHead(props: IEnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof IUser) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IUser) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE_NUMBER - users.length) : 0;

  return (
    <Container>
      <TableHeader title={'Users'} />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={'medium'}>
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
                    <TableCell align="right">{user.login}</TableCell>
                    <TableCell align="right">{user.avatar_url}</TableCell>
                    <TableCell align="right">{user.type}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 73 * emptyRows + 1,
                }}
              >
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users?.length}
        rowsPerPageOptions={[]} //to not show the option
        rowsPerPage={ROWS_PER_PAGE_NUMBER}
        page={page}
        onPageChange={handleChangePage}
      />
    </Container>
  );
};
