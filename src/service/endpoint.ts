export const ENDPOINT_URI = 'https://app.profitnow.io/api/v1/'
// export const ENDPOINT_URI = 'https://appprofitnow.kaysharbor.com/api/v1/'
// export const ENDPOINT_URI = 'http://appprofitnow.kaysharbor.com/api/v1/';


export const ENDPOINT = {
  login: 'login2',
  profile: 'account/profile',
  logout: 'logout',
  reset_password: 'reset-password',
  dashboard: 'dashboard',
  contacts: 'contacts',
  contactsNew: 'contacts/new',
  contactById: 'contacts/{id}',
  contactStatus: 'contacts/{id}/changecustomerstatus',
  common_appstate: 'common/app-state',
  calendar: 'dashboard/calendar',
  activities: 'activities',
  communicationnotescontact: 'communication/notes/contact',
  media_videos: 'media/videos',
  purchases: 'purchases',
  support: 'support',
  organizations: 'organizations',
  filterContact: 'contacts?',
  calendarCustomer: 'calendar',
  supportticket: 'support/tickets',
  supportTicket: 'support/ticket',
  companytags: 'company/tags',
  companyDepartments: 'company/departments',
  companyUsers: 'company/users',
  companylocations: 'company/locations',
  companypipelines: 'company/pipeline-tree',
  contactMessage: 'communication/sms/contact',
  newContacts: 'contacts/new',
  newOrganisation: 'organizations/new',
  getTwilioToken: 'common/app-user-settings',
  communicationEmail: 'communication/emails/contact',
  emailConnect: 'social/email/connect-url',
  supportTickets: 'support/contacts',
  supportingTicket: 'support/tickets',
  messageTemplate: 'support/messagetemplates',
  supportTypes: 'support/types',
  deleteNotes: 'communication/notes',
  emailTemplateList: 'templates/for-email',
  smsTemplateList: 'templates/for-text',
  templateCategory: 'templates/categories',
  taskCreate: 'communication/tasks/contact/{contact_id}',
  createTicket: 'support/ticket/create',
  addIosToken: 'profile/firebase-token',
  //
  emailTemplateCategory: 'templates/categories/email',
  emailTemplateMessage: 'templates/for-email/{id}',
  emailSend: 'communication/emails/contact/{id}',
  appUserSettings: 'common/app-user-settings',
  smsTemplateCategory: 'templates/categories/text',
  smsTemplateMessage: 'templates/for-text/{id}',
  smsSend: 'communication/sms/contact/{id}',
  pipelines: 'company/pipeline-tree',
  todoList: 'communication/tasks/todos',
  taskById: 'communication/tasks/{id}',
  locationList: 'company/locations',
  noteAdding: 'communication/notes/contact/{contact_id}',
}

export const QUERY_KEYS = {
  appUserSetting: 'queryKeys.appUserSetting',
  pipelines: 'queryKeys.pipelines',
  contacts: 'queryKeys.contacts-',
  contactId: 'queryKeys.contact-',
  companyUsers: 'queryKeys.companyUsers',
  emailTemplateCategory: 'queryKeys.emailTemplateCategory',
  emailTemplateMessage: 'queryKeys.emailTemplateMessage.',
  smsTemplateCategory: 'queryKeys.smsTemplateCategory.',
  smsTemplateMessage: 'queryKeys.smsTemplateMessage.',
  todoList: 'queryKeys.todoList.',
  locationList: 'queryKeys.locationList.',
  organization: 'queryKeys.organization-',
  taskInfo: 'queryKeys.taskInfo-',
}

export function parseAPIParams(
  uri: string,
  params: { [key: string]: string | number },
) {
  const keys = Object.keys(params)
  let tmpUri = uri
  keys.map((key) => {
    tmpUri = tmpUri.replace(`{${key}}`, params[key]?.toString())
  })
  return tmpUri
}
