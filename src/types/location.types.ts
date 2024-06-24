import { Pagination } from 'src/types/service.types'
export interface RespLocation {
  data: RespLocation_Data[]
  pagination: Pagination
}

export interface RespLocation_Data {
  id: number
  title: string
}
