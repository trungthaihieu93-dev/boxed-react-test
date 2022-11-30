import { PAGE, LIMIT, SORT } from './constants';

export type QueryParams = {
  [PAGE]: number;
  [LIMIT]: number;
  [SORT]: number;
};
