import { Pagination } from './service.types'

export interface RespTemplateEmailCategory {
  id: number
  title: string
  count: number
}

export interface RespTemplateEmailMessage {
  data: RespTemplateEmailMessage[]
  pagination: Pagination
}

export interface RespTemplateEmailMessage_Data {
  id: number
  text?: string
  subject: string
  body: string
  type_title: string
  type_title_color: string
}
