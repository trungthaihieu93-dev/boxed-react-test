import { PAGE, LIMIT, SORT, SEARCH } from './constants';

export type SortType = 'asc' | 'desc';

export type QueryParams = {
  [PAGE]?: number;
  [LIMIT]?: number;
  [SORT]?: SortType;
  [SEARCH]?: string;
};

export const defaultQueryParams: QueryParams = {
  page: 1,
  limit: 5,
  sortBy: 'desc',
};
