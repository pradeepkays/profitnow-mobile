export interface User extends Omit<RespProfile, 'additional'> {
  additional: string
}

export interface RespLogin {
  access_token: string
  type: any;
  svg_image: string
}

export interface RespProfile {
  id: number
  initials: string
  first_name: string
  last_name: string
  phone: string
  twilio_phone: string
  email: string
  additional: Additional[]
  permissions: { [key: string]: boolean }
}

export interface Additional {
  title: string
  value: string
}
