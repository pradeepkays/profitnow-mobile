// old
const bash_url = 'https://app.profitnow.io/api/v1/'
// const bash_url = 'https://appprofitnow.kaysharbor.com/api/v1/';
// const bash_url = 'http://appprofitnow.kaysharbor.com/api/v1/';

// new
// const bash_url = "https://app.webpail.com/api/v1/";
export const API = {
  // Auth API
  login: bash_url + 'login',
  accountprofile: bash_url + 'account/profile',
  logout: bash_url + 'logout',
  reset_password: bash_url + 'reset-password',
  dashboard: bash_url + 'dashboard',
  contacts: bash_url + 'contacts',
  common_appstate: bash_url + 'common/app-state',
  calendar: bash_url + 'dashboard/calendar',
  activities: bash_url + 'activities',
  communicationnotescontact: bash_url + 'communication/notes/contact',
  media_videos: bash_url + 'media/videos',
  purchases: bash_url + 'purchases',
  support: bash_url + 'support',
  organizations: bash_url + 'organizations',
  filterContact: bash_url + 'contacts?',
  calendarCustomer: bash_url + 'calendar',
  supportticket: bash_url + 'support/tickets',
  supportTicket: bash_url + 'support/ticket',
  companytags: bash_url + 'company/tags',
  companyDepartments: bash_url + 'company/departments',
  companyusers: bash_url + 'company/users',
  companylocations: bash_url + 'company/locations',
  companypipelines: bash_url + 'company/pipeline-tree',
  contactMessage: bash_url + 'communication/sms/contact',
  newContacts: bash_url + 'contacts/new',
  newOrganisation: bash_url + 'organizations/new',
  getTwilioToken: bash_url + 'common/app-user-settings',
  communicationEmail: bash_url + 'communication/emails/contact',
  emailConnect: bash_url + 'social/email/connect-url',
  supportTickets: bash_url + 'support/contacts',
  supportingTicket: bash_url + 'support/tickets',
  messageTemplate: bash_url + 'support/messagetemplates',
  supportTypes: bash_url + 'support/types',
  // supportTicketsDetail: bash_url + "support/contacts/",
  deleteNotes: bash_url + 'communication/notes',
  emailTemplateList: bash_url + 'templates/for-email',
  smsTemplateList: bash_url + 'templates/for-text',
  templateCategory: bash_url + 'templates/categories',
  createTask: bash_url + 'communication/tasks/contact',
  createTicket: bash_url + 'support/ticket/create',
  status: bash_url + 'support/statuses',
  addIosToken: bash_url + 'system/push/firebase/ios',
  updateTwoFactor: bash_url + 'profile/mfa/update',
  verifyOtp: bash_url + 'profile/mfa/verify-otp',
  verifyGoogle: bash_url + 'profile/mfa/verify-google-auth',
  verifyLoginOtp: bash_url + 'login/mfa/verify-otp',
  verifyLoginGoogle: bash_url + 'login/mfa/verify-google-auth',
  todoList: 'communication/tasks/todos',
}

export const User = {
  user_id: '',
}
