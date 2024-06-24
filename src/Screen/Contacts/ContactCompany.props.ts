export type ContactsCompanyType = {
  active: 'Contacts' | 'Companies'
  isReloadAgain: boolean
  companyFilter: boolean
  contactsFilter: boolean
  filteredContacts: []
  filteredCompanies: []
  stageList: { label: string; value: string }[]
  stageName: any
  isLoading: boolean

  //pickers
  titleValue: any
  phoneValue: ''
  emailValue: any
  citylValue: any
  stateValue: any
  employeeValue: any
  confidenceValue: any
  companyAssignedUser: any
  open: boolean
  value: []
  tags: any
  companyValue: any

  statusValue: ''
  contactValue: ''
  locationValue: any
  socialValue: ''
  assignedValue: any

  showValue: any
  addedValue: any
  touchesValue: ''
  sortByValue: any
  sortByConfidenceValue: any
  itemPerPageValue: any
  dateBefore: ''
  afterDate: ''
  contactFound: boolean
}
