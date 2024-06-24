import { Pagination } from './service.types'

export interface RespTodo {
  data: RespTodo_Data[]
  pagination: Pagination
}

export interface RespTodo_Data {
  id: number
  time_scheduled: string
  priority: Priority
  status: Status
  text: string
}

export enum Priority {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
}

export enum Status {
  Active = 'Active',
  Completed = 'Completed',
}

export interface RespTask {
  id: number
  contact_id: number
  user_id: number
  time_created: string
  time_scheduled: string
  priority: string
  status: string
  text: string
}
