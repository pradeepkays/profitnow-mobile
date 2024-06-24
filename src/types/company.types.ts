import { Pagination } from 'src/types/service.types'

export interface RespOrganization {
  data: RespOrganization_Data[]
  pagination: Pagination
  totalcounts: [{
    totalARR: any;
    totalMRR: any
  }]
}

export interface RespOrganization_Data {
  id: number
  title: string
  initials: string
  phone: string
  email: null | string
  status: Status
  stage: Stage
  address_formatted: string
  website: string
  value: number
  ARR: Arr
  MRR: Arr
  show_status: boolean
  show_stage: boolean
}

export enum Arr {
  The000 = '$0.00',
}

export enum Stage {
  NewLead = 'New Lead',
}

export enum Status {
  Leads = 'Leads',
}
