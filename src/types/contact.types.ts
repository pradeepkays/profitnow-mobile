import { RespLocation_Data } from './location.types'
import { Pagination } from './service.types'

export interface RespContact {
  id: number
  initials: string
  first_name: string
  last_name: string
  address_formatted: string
  address: Address
  phones: Phones[]
  email: string
  status: string
  stage: string
  value: number
  contact_status: 'Active' | 'Inactive'
  arr: string
  mrr: string
  title: string
  PSA: string
  awaiting_feature: string
  demo_reporting: string
  confidence_level: string
  deal_close_date: string
  assigned_user: AssignedUser
  organization: Organization
  permissions: { [key: string]: boolean }
  show_status?: boolean
  show_stage?: boolean
  facebook_url?: string
  twitter_url?: string
  linkedin_url?: string
  instagram_url?: string
  location?: RespLocation_Data
}

export interface Address {
  street_address: string
  city: string
  state: string
  zip: string
  country: string
}

export interface AssignedUser {
  id: number
  name: string
  title?:string
}

export interface Organization {
  id: number
  title: string
  url: string
}

export interface RespContacts {
  data: RespContacts_Data[]
  pagination: Pagination
}

export interface RespContacts_Data {
  id: number
  initials: string
  name: string
  phone: string
  email: string
  status: string
  stage: string
  title: string
  value: number
  contact_status: ContactStatus
  ARR: Arr
  MRR: Arr
  show_status: boolean
  show_stage: boolean
}

export enum Arr {
  The000 = '$0.00',
}

export enum ContactStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface Phones {
  type: string
  phone_formatted: string
  prefix: string
  short_phone: string
  country: string
  extension: string
}
