import React, { useEffect, useState, useCallback } from 'react';

import './styles.css';
import './hooks';
import { THead } from './types';
import { QueryParams } from '../../API/types';
import { SortType } from '../../API/types';
import { BaseType } from '../../types/base';

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

export const Table = <T extends BaseType>(props: ITableProps<T>) => {
  const { headers, rows, fetchData, limits, loading } = props;
  const dataKeys = headers.map((header: THead) => header.dataKey);
  const [limit, setLimit] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sortTarget, setSortTarget] = useState<SortTarget | null>(null);
  const [chosenRows, setChosenRows] = useState<T[]>([]);

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
      const row = rows.find((r) => r.id === id);

      if (row) {
        if (e.target.checked) {
          setChosenRows((oldChosenRows) => [...oldChosenRows, row]);
          return;
        }
        setChosenRows((oldChosenRows) =>
          oldChosenRows.filter((r) => r.id !== id)
        );
      }
    },
    [rows]
  );

  // Refetch
  useEffect(() => {
    setChosenRows([]);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, limit, page, sortTarget]);

  useEffect(() => {
    const chosenArea = document.getElementById('chosenArea');

    if (chosenArea) {
      const text =
        chosenRows.length > 0
          ? `${JSON.stringify(chosenRows)}`
          : 'No chosen rows';
      chosenArea.innerHTML = text;
    }
  }, [chosenRows]);

  return loading ? (
    <span>Loading...</span>
  ) : rows.length === 0 ? (
    <span>No Data</span>
  ) : (
    <div>
      <table
        style={{
          width: 800,
          height: 500,
          margin: 'auto',
          border: 'medium solid black',
          padding: 20,
        }}
      >
        <tr>
          <th></th>
          {headers.map((header: THead) => (
            <th style={{ border: 'medium solid black' }} key={header.key}>
              {header.title}
            </th>
          ))}
        </tr>
        {rows.map((row: any) => (
          <tr key={row.id}>
            <td>
              <input type="checkbox" onChange={(e) => handleCheck(e, row.id)} />
            </td>
            {dataKeys.map((key: string) => (
              <td key={`${row.id}_${key}`}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </table>
      <div>Chosen rows</div>
      <br />
      <div id="chosenArea"></div>
      <br />
    </div>
  );
};
