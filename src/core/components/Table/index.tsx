import React, { useEffect, useState } from 'react';

import './styles.css';
import './hooks';
import { THead } from './types';
import { QueryParams } from '../../API/types';
import { SortType } from '../../API/types';

export type SortTarget = {
  key: string;
  type: SortType;
};
export interface ITableProps<T> {
  headers: THead[];
  rows: T[];
  limits: number[];
  loading: boolean;
  fetchData: (queryParams?: QueryParams) => void;
}

export const Table = <T,>(props: ITableProps<T>) => {
  const { headers, rows, fetchData, limits, loading } = props;
  const dataKeys = headers.map((header: THead) => header.dataKey);
  const [limit, setLimit] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);

  // Refetch
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, limit, page, sortTarget]);

  return loading ? (
    <span>Loading...</span>
  ) : rows.length === 0 ? (
    <span>No Data</span>
  ) : (
    <table>
      <thead>
        <th>
          {headers.map((header: THead) => (
            <td key={header.key}>{header.title}</td>
          ))}
        </th>
      </thead>
      <tbody>
        {rows.map((row: any) => (
          <tr>
            {dataKeys.map((key: string) => (
              <td>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
