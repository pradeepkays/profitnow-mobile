import { Pagination } from './service.types'

export interface RespTemplateSmsCategory {
  id: number
  title: string
  count: number
}

export interface RespTemplateSmsMessage {
  data: RespTemplateSmsMessage_Data[]
  pagination: Pagination
}

export interface RespTemplateSmsMessage_Data {
  id: number
  text: string
  type_title: string
  type_title_color: string
  image: {
    url: string
    thumbnail_url: string
  }
}
