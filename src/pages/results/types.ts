import { IItem } from 'api/items/types';

export type Order = 'asc' | 'desc';

export interface ITableHeadCell {
  id: keyof IItem;
  label: string;
}

export interface ITableHead {
  onRequestSort: (property: keyof IItem) => void;
  order: Order;
  orderBy: string;
  headCells: ITableHeadCell[];
}

export interface IGetEmptyRows {
  pageNumber: number;
  resultsLength: number;
  rowsPerPage: number;
}
