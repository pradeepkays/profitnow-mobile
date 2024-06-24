export interface RespAppUserSettings {
  twilio: Twilio
  contact_section: Section
  organization_section: Section
  default_status_view: string
}

export interface Section {
  show_status: boolean
  show_stage: boolean
  set_status: boolean
  set_stage: boolean
}

export interface Twilio {
  AccountSid: string
  AuthToken: string
  from_number: string
  twiml_app_sid: string
  json_token_url: string
  json_access_token_url: string
}
