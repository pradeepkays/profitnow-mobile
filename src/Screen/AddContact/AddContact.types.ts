import { RespLocation_Data } from 'src/types/location.types'
import { RespPipeline, Stage } from 'src/types/pipeline.types'

export type State = {
  firstname: string
  lastname: string
  cellphone: string
  email: string
  value: string
  streetnumber: string
  city: string
  state: string
  zip: string
  country: string
  facebook: string
  twitter: string
  linkdin: string
  instagram: string
  note: string
  id: string | number
  forceRender: boolean
  phones: {
    prefix: string
    short_phone: string
    country: string
    type: string
    ext: string
  }[]
  compaignList: any[]
  compaignName: any[]

  contactList: any[]
  contactName: any[]

  tagList: any[]
  tagName: any[]

  showSecondPhone: boolean

  CountryList: { stage: string; title: string }[]
  countryName: ''

  companyList: any[]
  companyName: any

  assignUserList: any[]
  assignUserId: string | number

  isLoading: boolean
  visible?: boolean
  title: string
  psa: string
  awaiting_feature: string
  demo_reporting: string
  status: RespPipeline | undefined
  stage: Stage | undefined
  location: RespLocation_Data | undefined
}
