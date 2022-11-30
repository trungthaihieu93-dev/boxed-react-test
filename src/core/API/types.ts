import { PAGE, LIMIT, SEARCH, SORT_BY, ORDER } from './constants';

export type SortType = 'asc' | 'desc';

export type QueryParams = {
  [PAGE]?: number;
  [LIMIT]?: number;
  [SORT_BY]?: string;
  [ORDER]?: SortType;
  [SEARCH]?: string;
};

export const defaultQueryParams: QueryParams = {
  page: 1,
  limit: 5,
  sortBy: 'id',
  order: 'desc',
};
