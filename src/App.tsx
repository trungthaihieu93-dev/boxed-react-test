import React, { useState, useCallback } from 'react';
import { QueryParams, defaultQueryParams } from './core/API/types';

import { Table } from './core/components/Table';
import { THead } from './core/components/Table/types';
import { ITask } from './core/interfaces/tasks';
import { getTasks } from './services/tasks';

const headers: THead[] = [
  { dataKey: 'id', key: 'id', title: 'Id' },
  { dataKey: 'title', key: 'title', title: 'Title' },
  { dataKey: 'description', key: 'description', title: 'Description' },
  { dataKey: 'createdAt', key: 'createdAt', title: 'Created At' },
  { dataKey: 'expiredAt', key: 'expiredAt', title: 'Expired At' },
];
const limits: number[] = [5, 10, 15];

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Pre-fetch
  const fetchTasks = useCallback(async (queryParams?: QueryParams) => {
    try {
      setLoading(true);
      const queriedTasks = await getTasks(queryParams || defaultQueryParams);

      setTasks(queriedTasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to Table App</h2>
      </header>
      <div style={{ height: 700 }}>
        <Table<ITask>
          headers={headers}
          rows={tasks}
          limits={limits}
          loading={loading}
          fetchData={fetchTasks}
        />
      </div>
    </div>
  );
}

export default App;
