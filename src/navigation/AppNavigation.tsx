import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

//Auth

import AuthLoading from 'src/Auth/AuthLoading'
import ForgotPassword from 'src/Auth/ForgotPassword'
import Login from 'src/Auth/Login'
import Register from 'src/Auth/Register'
import ResetPassword from 'src/Auth/ResetPassword'
import VerifyTwoFactor from 'src/Auth/VerifyTwoFactor'

//Screen
import UserEmailSmsDetails from 'src/Component/UserProfileComponent/UserEmailSmsDetails'
import AddCompany from 'src/Screen/AddCompany'
import AddContact from 'src/Screen/AddContact/AddContact'
import AddNote from 'src/Screen/AddNote'
import AddTicket from 'src/Screen/AddTicket'
import AddTask from 'src/Screen/AskTask/AddTask'
import CalendarScreen from 'src/Screen/CalendarScreen/CalendarScreen'
import Companies from 'src/Screen/Companies'
import CompanyDetails from 'src/Screen/CompanyDetails/CompanyDetails'
import { RelatedContacts } from 'src/Screen/CompanyDetails/RelatedContacts'
import ContactCustomerSupport from 'src/Screen/ContactCustomerSupport'
import UserDetails from 'src/Screen/ContactDetail/UserDetails'
import ContactCompany from 'src/Screen/Contacts/ContactCompany'
import CreateNewTicket from 'src/Screen/CreateNewTicket'
import CurrentSequence from 'src/Screen/CurrentSequence'
import CustomerList from 'src/Screen/CustomerList/CustomerList'
import Email from 'src/Screen/Email'
import ComposeMail from 'src/Screen/Email/composeMail'
import Home from 'src/Screen/Inbox/Home'
import Lead from 'src/Screen/Lead'
import More from 'src/Screen/More'
import Note from 'src/Screen/Note'
import Notification from 'src/Screen/Notification'
import Pipelines from 'src/Screen/Pipelines/Pipelines'
import Project from 'src/Screen/Project'
import Purchases from 'src/Screen/Purchases'
import Search from 'src/Screen/Search/Search'
import SelectContact from 'src/Screen/SelectContact'
import Settings from 'src/Screen/Settings'
import ComposeSms from 'src/Screen/Sms/composeSms'
import SupportTicket from 'src/Screen/SupportTicket'
import SupportTicketDetail from 'src/Screen/SupportTicketDetail'
import SupportTickets from 'src/Screen/SupportTickets'
import SwitchAccount from 'src/Screen/SwitchAccount/SwitchAccount'
import Task from 'src/Screen/Task'
import TaskDetail from 'src/Screen/TaskDetail'
import TicketDetails from 'src/Screen/TicketDetails'
import HomeWithCalender from 'src/Screen/Today/HomeWithCalender'
import { TodoScreen } from 'src/Screen/Todo/TodoScreen'
import { UpdateTaskScreen } from 'src/Screen/Todo/UpdateTaskScreen'
import TwoFactor from 'src/Screen/TwoFactor/TwoFactor'
import VideoPlay from 'src/Screen/VideoPlay'
import VideoScreen from 'src/Screen/VideoScreen'
import WebScreen from 'src/Screen/webScreen'

const AppStack = createStackNavigator(
  {
    HomeWithCalender,
    Home,
    Search,
    Lead,
    Project,
    Notification,
    More,
    UserDetails,
    TaskDetail,
    CompanyDetails,
    Settings,
    TwoFactor,
    SwitchAccount,
    SupportTicket,
    SupportTicketDetail,
    CreateNewTicket,
    ContactCustomerSupport,
    Email,
    CustomerList,
    ContactCompany,
    Note,
    AddNote,
    UserEmailSmsDetails,
    Pipelines,
    Companies,
    CurrentSequence,
    SupportTickets,
    Purchases,
    VideoScreen,
    VideoPlay,
    Task,
    CalendarScreen,
    AddContact,
    AddTicket,
    AddTask,
    SelectContact,
    TicketDetails,
    ComposeMail,
    ComposeSms,
    WebScreen,
    AddCompany,
    TodoScreen,
    UpdateTaskScreen,
    RelatedContacts,
  },
  { headerMode: 'none' },
)
const AuthStack = createStackNavigator(
  { Login, Register, ForgotPassword, ResetPassword, VerifyTwoFactor },
  { headerMode: 'none' },
)

export const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
)
