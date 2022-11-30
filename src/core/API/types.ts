import { PAGE, LIMIT, SORT } from './constants';

export type SortType = 'asc' | 'desc';

export type QueryParams = {
  [PAGE]?: number;
  [LIMIT]?: number;
  [SORT]?: SortType;
};

export const defaultQueryParams: QueryParams = {
  page: 1,
  limit: 5,
  sortBy: 'desc',
};
