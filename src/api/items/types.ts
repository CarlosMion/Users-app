export interface IItemsResult {
  total_count?: number;
  incomplete_results?: boolean;
  items: IItem[];
}

export interface IItem {
  avatar_url?: string;
  login?: string;
  type?: string;
}

export interface IItemsVariables {
  login?: string;
}
