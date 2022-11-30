import { get } from '../core/API';
import { TASKS } from '../core/API/endpoints';
import { QueryParams } from '../core/API/types';
import { ITask } from '../core/interfaces/tasks';
import { parseUrl } from '../utils/api';

export const getTasks = async (queryParams?: QueryParams) =>
  (await get<ITask[]>(parseUrl(TASKS, queryParams))).data;
