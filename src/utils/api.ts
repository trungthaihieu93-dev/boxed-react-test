import { QueryParams } from '../core/API/types';

export const parseUrl = (endpoint: string, queryParams?: QueryParams) => {
  if (!queryParams) {
    return endpoint;
  }

  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(queryParams)) {
    params.append(key, `${val}`);
  }

  return `${endpoint}?${params.toString()}`;
};
