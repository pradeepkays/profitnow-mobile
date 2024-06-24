import { CONTACT_ORDER_BY } from 'src/store/contactsStore'

const titleFilter = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
]

const emailFilter = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
  { label: 'I', value: 'I' },
  { label: 'J', value: 'J' },
  { label: 'K', value: 'K' },
  { label: 'L', value: 'L' },
  { label: 'M', value: 'M' },
  { label: 'N', value: 'N' },
  { label: 'O', value: 'O' },
  { label: 'P', value: 'P' },
  { label: 'Q', value: 'Q' },
  { label: 'R', value: 'R' },
  { label: 'S', value: 'S' },
  { label: 'T', value: 'T' },
  { label: 'U', value: 'U' },
  { label: 'V', value: 'V' },
  { label: 'W', value: 'W' },
  { label: 'X', value: 'X' },
  { label: 'Y', value: 'Y' },
  { label: 'Z', value: 'Z' },
]
const cityFilter = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
  { label: 'I', value: 'I' },
  { label: 'J', value: 'J' },
  { label: 'K', value: 'K' },
  { label: 'L', value: 'L' },
  { label: 'M', value: 'M' },
  { label: 'N', value: 'N' },
  { label: 'O', value: 'O' },
  { label: 'P', value: 'P' },
  { label: 'Q', value: 'Q' },
  { label: 'R', value: 'R' },
  { label: 'S', value: 'S' },
  { label: 'T', value: 'T' },
  { label: 'U', value: 'U' },
  { label: 'V', value: 'V' },
  { label: 'W', value: 'W' },
  { label: 'X', value: 'X' },
  { label: 'Y', value: 'Y' },
  { label: 'Z', value: 'Z' },
]
const stateFilter = [
  { label: 'AL', value: 'AL' },
  { label: 'AK', value: 'AK' },
  { label: 'AZ', value: 'AZ' },
  { label: 'AR', value: 'AR' },
  { label: 'CO', value: 'CO' },
  { label: 'CA', value: 'CA' },
  { label: 'CT', value: 'CT' },
  { label: 'DE', value: 'DE' },
]
const employeeFilter = [
  { label: '1-10', value: '1-10' },
  { label: '11-50', value: '11-50' },
  { label: '51-100', value: '51-100' },
  { label: '101-200', value: '101-200' },
  { label: '201-500', value: '201-500' },
  { label: '501+', value: '501++' },
]
const confidenceFilter = [
  { label: '10%', value: '10' },
  { label: '20%', value: '20' },
  { label: '30%', value: '30' },
  { label: '40%', value: '40' },
  { label: '50%', value: '50' },
  { label: '60%', value: '60' },
  { label: '70%', value: '70' },
  { label: '80%', value: '80' },
  { label: '90%', value: '90' },
  { label: '100%', value: '100' },
]

// contacts filter
const contactStatus = [
  { label: 'Customer', value: 'Customer' },
  { label: 'Opportunities', value: 'Opportunities' },
  { label: 'Leads', value: 'Leads' },
]
const contactList = [
  { label: 'VB_Doctor', value: '1' },
  { label: 'test', value: '2' },
  { label: 'TEst', value: '3' },
  { label: 'TEst', value: '4' },
  { label: 'PN List', value: '5' },
  { label: 'new Test', value: '6' },
  { label: 'INSTAGRAM', value: '7' },
  { label: 'GusImportTest', value: '8' },
  { label: 'Gus Demo', value: '9' },
  { label: 'Developer Contact', value: '9' },
  { label: 'DemoListTestource', value: '10' },
  { label: 'DEmo', value: '11' },
  { label: 'demo', value: '12' },
  { label: 'CompanyDemo', value: '13' },
  { label: 'Chiro', value: '14' },
  { label: 'Chiro', value: '15' },
  { label: 'Beta', value: '16' },
  { label: '222', value: '17' },
]
const companyList = [
  { label: 'Google Inc22', value: '1' },
  { label: 'Wilson Health Services', value: '2' },
  {
    label: 'Lifelong Health Chiropatric',
    value: '3',
  },
  { label: 'Synergy Healthcare', value: '4' },
  { label: 'chiropatric', value: '5' },
  { label: 'Total Health Chiropatric', value: '6' },
  {
    label: 'Craig Chiropatric and Kinesiology',
    value: '6',
  },
  { label: 'Sweet Family Chiropatric', value: '7' },
  { label: 'Active care test', value: '8' },
  { label: 'Balanced Care Chiropatric', value: '8' },
  { label: 'org01', value: '9' },
  { label: 'org01', value: '10' },
  { label: 'Array', value: '10' },
  { label: 'Array', value: '11' },
]
const locationtList = [
  { label: 'New York', value: 'New York' },
  { label: 'London', value: 'London' },
  { label: 'Detroit', value: 'Detroit' },
]
const socialContent = [
  { label: 'Free Oil Change', value: 'Free Oil Change' },
  { label: 'Oil Change', value: 'Oil Change' },
  { label: 'DemoContent', value: 'DemoContent' },
]
//pending
const assignedUser = [
  { label: 'Super Admin', value: '1' },
  { label: 'Fb Verification', value: '2 ' },
  { label: 'Vadym Testings', value: '3 Testings' },
  { label: 'Regular User', value: '4' },
  { label: 'Manage User', value: '5' },
  { label: 'Admin User', value: '6' },
  { label: 'Gus Skarlis', value: '7' },
  { label: 'Sebastian Delon', value: '8' },
  { label: 'Arul Ananth', value: '9' },
  // { label: "Patrick Leonard", value: "A" },
  // { label: "Andrew Testing", value: "B" },
  // { label: "Patrick Leonard", value: "C" },
]
const showList = [
  { label: 'All', value: 'All' },
  { label: 'Subscribers', value: 'Subscribers' },
  { label: 'Unsubscribers', value: 'Unsubscribers' },
]

const userAssigned = [
  { label: 'Super Admin', value: '1' },
  { label: 'Fb Verification', value: '2' },
  { label: 'Vadym Testings', value: '3' },
  { label: 'Regular User', value: '4' },
  { label: 'Manager User', value: '5' },
  { label: 'Admin User', value: '6' },
  { label: 'Gus Skarlis', value: '7' },
  { label: 'Sebastian Delon', value: '8' },
  { label: 'Arul Ananth', value: '9' },
]
const addedTimeList = [
  { label: 'All', value: 'All' },
  { label: 'Day', value: 'Day' },
  { label: 'Week', value: 'Week' },
  { label: 'Two Week', value: 'Two Week' },
  { label: 'Month', value: 'Month' },
]
const sortByMr = [
  { label: 'MRR High to Low', value: 'MRR High to Low' },
  { label: 'MRR Low to High', value: 'MRR Low to High' },
  { label: 'ARR High to Low', value: 'ARR High to Low' },
  { label: 'ARR Low to High', value: 'ARR Low to High' },
]
const sortByConfidence = [
  { label: 'Confidence High to Low', value: 'Confidence High to Low' },
  { label: 'Confidence Low to High', value: 'Confidence Low to High' },
]
const itemPerPage = [
  { label: '15', value: 15 },
  { label: '30', value: 30 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
  { label: '1000', value: 1000 },
]
const PriorityData = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]
const StatusData = [
  { label: 'Active', value: 'Active' },
  { label: 'Closed', value: 'Closed' },
]

export const orderByData: { value: CONTACT_ORDER_BY; title: string }[] = [
  {
    value: CONTACT_ORDER_BY.arr,
    title: 'ARR High to Low',
  },
  {
    value: CONTACT_ORDER_BY.arr_desc,
    title: 'ARR Low to High',
  },
  {
    value: CONTACT_ORDER_BY.mrr,
    title: 'MRR High to Low',
  },
  {
    value: CONTACT_ORDER_BY.mrr_desc,
    title: 'MRR Low to High',
  },
  {
    value: CONTACT_ORDER_BY.confidence_level,
    title: 'Confidence High To Low',
  },
  {
    value: CONTACT_ORDER_BY.confidence_level_desc,
    title: 'Confidence Low to High',
  },
  {
    value: CONTACT_ORDER_BY.title,
    title: 'Title ASC',
  },
  {
    value: CONTACT_ORDER_BY.title_desc,
    title: 'Title DESC',
  },
  {
    value: CONTACT_ORDER_BY.demo_recording,
    title: 'Demo Recording ASC',
  },
  {
    value: CONTACT_ORDER_BY.demo_recording_desc,
    title: 'Demo Recording DESC',
  },
  {
    value: CONTACT_ORDER_BY.awaiting_feature,
    title: 'Awaiting Feature ASC',
  },
  {
    value: CONTACT_ORDER_BY.awaiting_feature_desc,
    title: 'Awaiting Feature DESC',
  },
]

export default {
  titleFilter,
  emailFilter,
  cityFilter,
  stateFilter,
  employeeFilter,
  confidenceFilter,
  userAssigned,
  contactStatus,
  contactList,
  companyList,
  locationtList,
  socialContent,
  assignedUser,
  showList,
  addedTimeList,
  sortByMr,
  sortByConfidence,
  itemPerPage,
  PriorityData,
  StatusData,
}
