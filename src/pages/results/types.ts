import { IUser } from 'api/users/types';

export type Order = 'asc' | 'desc';

export interface IUserTableHeadCell {
  disablePadding: boolean;
  id: keyof IUser;
  label: string;
  numeric: boolean;
}

export interface IEnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IUser
  ) => void;
  order: Order;
  orderBy: string;
}
