import { useMutation, useQuery } from 'react-query'

import { RespTask, RespTodo } from 'src/types/todo.types'
import { getFromServer, patchToServer } from 'vn.starlingTech/api/AppNetworking'

import { ENDPOINT, parseAPIParams, QUERY_KEYS } from '../endpoint'

type Params_TodoList = {
  status: 'Active' | 'Completed' | 'All' | string
  offset: number
  limit: number
  name?: string;
  due_date?: string | null;
  created_date?: string | null;
  priority?: null;
  contact_id?: null;
  user_id?: null;
}

export function useTodo(params: Params_TodoList, onSuccess) {
  return useQuery(
    [QUERY_KEYS.todoList],
    (): Promise<RespTodo> => getFromServer({ url: ENDPOINT.todoList, params }),
    {
      onSuccess,
    },
  )
}

type Params_UpdateTask = {
  id: string | number
  params: {
    text: string
    time_scheduled: string
    reminder: string | number
    priority: string | number
    status: string
    user_id: string | number
  }
}

export function useTaskUpdate() {
  return useMutation((item: Params_UpdateTask) =>
    patchToServer({
      url: parseAPIParams(ENDPOINT.taskById, { id: item.id }),
      params: item.params,
    }),
  )
}

export function useTaskInfo(id: string | number) {
  return useQuery(
    [QUERY_KEYS.taskInfo + id, id],
    (): Promise<RespTask> =>
      getFromServer({ url: parseAPIParams(ENDPOINT.taskById, { id }) }),
  )
}
