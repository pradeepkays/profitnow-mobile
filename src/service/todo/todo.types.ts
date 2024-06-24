import { Pagination } from 'src/types/service.types'

export interface RespCompanyUsers {
  data: RespCompanyUser[]
  pagination: Pagination
}

export interface RespCompanyUser {
  id: number
  title: string
}
