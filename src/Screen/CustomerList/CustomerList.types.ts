export type State = {
  //Main List
  customerList: any[]
  // ContactListFilter
  contactListDropdown: any[]
  contactListDropdownName: any
  // CompanyFilter
  companyList: any
  companyName: any
  // tagListFilter
  tagList: any[]
  tagListName: any[]
  // userListFilter
  userList: any[]
  userListName: any
  // StageListFilter
  stageList: { name: string }[]
  stageListName: any
  name: string
  phone: string
  isLoading: boolean
  totalSend: number
  page: number
  visible: boolean
  searchBar: boolean
  text: string
  search: boolean
  datatype: string
  contactList?: any[]
}
