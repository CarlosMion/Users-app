import { IUser } from 'api/users/types';

export type Order = 'asc' | 'desc';

export interface ITableHeadCell {
  id: keyof IUser;
  label: string;
}

export interface ITableHead {
  onRequestSort: (property: keyof IUser) => void;
  order: Order;
  orderBy: string;
  headCells: ITableHeadCell[];
}

export interface IGetEmptyRows {
  pageNumber: number;
  resultsLength: number;
  rowsPerPage: number;
}
