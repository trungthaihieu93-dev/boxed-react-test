import React, { useEffect, useState, useCallback } from 'react';

import { THead } from './types';
import { QueryParams } from '../../API/types';
import { SortType } from '../../API/types';
import { BaseType } from '../../types/base';

import './styles.css';
import './hooks';

let searchTimeout: any;

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
  const [tempSearchValue, setTempSearchValue] = useState<string>('');
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

  const handleSort = useCallback(
    (key: string) => {
      const { key: oldKey, type: oldType } = sortTarget || {};

      if (!oldKey) {
        setSortTarget({ key, type: 'desc' });
      } else {
        if (key === oldKey) {
          setSortTarget({ key, type: oldType === 'asc' ? 'desc' : 'asc' });
        } else {
          setSortTarget({ key, type: 'desc' });
        }
      }
    },
    [sortTarget]
  );

  useEffect(() => () => clearTimeout(searchTimeout), []);

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => setSearchValue(tempSearchValue), 1000);
  }, [tempSearchValue]);

  const handleSearchValue = useCallback((val: string) => {
    setTempSearchValue(val);
  }, []);

  // Refetch
  useEffect(() => {
    setChosenRows([]);
    fetchData({
      limit,
      page,
      sortBy: sortTarget?.key,
      order: sortTarget?.type,
      search: searchValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sortTarget, searchValue]);

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

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          width: 200,
        }}
      >
        <input
          type="text"
          placeholder="Keyword..."
          value={tempSearchValue}
          onChange={(e) => handleSearchValue(e.target.value)}
        />
        <select
          style={{ width: 100, height: 50, marginLeft: 20 }}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        >
          {limits.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          style={{ width: 100, height: 50, marginLeft: 20 }}
          onClick={() => setPage((prevPage) => prevPage - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <div
          style={{
            width: 100,
            height: 50,
            marginLeft: 20,
            textAlign: 'center',
            lineHeight: 3,
            verticalAlign: 'center',
          }}
        >
          {page}
        </div>
        <button
          style={{ width: 100, height: 50, marginLeft: 20 }}
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          {' '}
          Next
        </button>
      </div>
      <div style={{ marginTop: 30 }}>
        {loading ? (
          <div style={{ height: 50, width: 100, margin: 'auto' }}>
            Loading...
          </div>
        ) : rows.length === 0 ? (
          <div style={{ height: 50, width: 100, margin: 'auto' }}>
            No data...
          </div>
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
                  <th
                    style={{ border: 'medium solid black', cursor: 'pointer' }}
                    key={header.key}
                    onClick={() => handleSort(header.key)}
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
              {rows.map((row: any) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e, row.id)}
                    />
                  </td>
                  {dataKeys.map((key: string) => (
                    <td key={`${row.id}_${key}`}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </table>
            <div style={{ padding: 30, width: 800, margin: 'auto' }}>
              <b>Chosen rows</b>
              <br />
              <div id="chosenArea"></div>
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
