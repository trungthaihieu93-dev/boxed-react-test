import React, { useState, useCallback } from 'react';
import { QueryParams, defaultQueryParams } from './core/API/types';

import { Table } from './core/components/Table';
import { THead } from './core/components/Table/types';
import { ITask } from './core/interfaces/tasks';
import { getTasks } from './services/tasks';

const headers: THead[] = [];
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
      <body>
        <Table<ITask>
          headers={headers}
          rows={tasks}
          limits={limits}
          loading={loading}
          fetchData={fetchTasks}
        />
      </body>
      <footer>This is a Footer</footer>
    </div>
  );
}

export default App;
