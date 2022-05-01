export interface IUsersResult {
  total_count?: number;
  incomplete_results?: boolean;
  items: IUser[];
}

export interface IUser {
  avatar_url?: string;
  login?: string;
  type?: string;
}

export interface IUserVariables {
  login?: string;
}
