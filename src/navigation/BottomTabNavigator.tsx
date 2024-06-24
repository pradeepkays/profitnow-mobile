import React from 'react';
import {View, Pressable, Dimensions, StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationIcon from './NavigationIcon';

// Screen
import UserEmailSmsDetails from 'src/Component/UserProfileComponent/UserEmailSmsDetails';
import AddCompany from 'src/Screen/AddCompany';
import AddContact from 'src/Screen/AddContact/AddContact';
import AddNote from 'src/Screen/AddNote';
import AddTicket from 'src/Screen/AddTicket'; // not in use
import AddTask from 'src/Screen/AskTask/AddTask';
import CalendarScreen from 'src/Screen/CalendarScreen/CalendarScreen';
import Companies from 'src/Screen/Companies'; // not in use
import CompanyDetails from 'src/Screen/CompanyDetails/CompanyDetails';
import {RelatedContacts} from 'src/Screen/CompanyDetails/RelatedContacts';
import ContactCustomerSupport from 'src/Screen/ContactCustomerSupport';
import UserDetails from 'src/Screen/ContactDetail/UserDetails';
import ContactCompany from 'src/Screen/Contacts/ContactCompany';
import CreateNewTicket from 'src/Screen/CreateNewTicket';
import CurrentSequence from 'src/Screen/CurrentSequence';
import CustomerList from 'src/Screen/CustomerList/CustomerList'; // not in use
import Email from 'src/Screen/Email'; // not in use
import ComposeMail from 'src/Screen/Email/composeMail';
import Home from 'src/Screen/Inbox/Home';
import Lead from 'src/Screen/Lead'; // not in use
import More from 'src/Screen/More';
import Note from 'src/Screen/Note';
import Notification from 'src/Screen/Notification';
import Pipelines from 'src/Screen/Pipelines/Pipelines';
import Project from 'src/Screen/Project';
import Purchases from 'src/Screen/Purchases';
import Search from 'src/Screen/Search/Search';
import SelectContact from 'src/Screen/SelectContact';
import Settings from 'src/Screen/Settings';
import ComposeSms from 'src/Screen/Sms/composeSms';
import SupportTicket from 'src/Screen/SupportTicket';
import SupportTicketDetail from 'src/Screen/SupportTicketDetail';
import SupportTickets from 'src/Screen/SupportTickets'; // not in use
import SwitchAccount from 'src/Screen/SwitchAccount/SwitchAccount';
import Task from 'src/Screen/Task';
import TaskDetail from 'src/Screen/TaskDetail';
import TicketDetails from 'src/Screen/TicketDetails';
import HomeWithCalender from 'src/Screen/Today/HomeWithCalender';
import {TodoScreen} from 'src/Screen/Todo/TodoScreen';
import {UpdateTaskScreen} from 'src/Screen/Todo/UpdateTaskScreen';
import VideoPlay from 'src/Screen/VideoPlay';
import VideoScreen from 'src/Screen/VideoScreen';
import WebScreen from 'src/Screen/webScreen';
import {color, font} from 'components/Styles';
import TwoFactor from 'src/Screen/TwoFactor/TwoFactor';
import UpdateTwoFactor from 'src/Screen/TwoFactor/UpdateTwoFactor';

const Stack = createNativeStackNavigator();

type BottomTabNavigatorTabBarIconProps = {
  color: string;
  focused: boolean;
  size: number;
};

// create bottom tab navigator
const BottomTab = createBottomTabNavigator();

const TodayStack = (props: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeWithCalender"
        component={HomeWithCalender}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="SelectContact"
        component={SelectContact}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTask}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="ComposeSms"
        component={ComposeSms}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="ComposeMail"
        component={ComposeMail}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="Note"
        component={Note}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNote}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />

      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
    </Stack.Navigator>
  );
};

const ContactsStack = (props: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactCompany"
        component={ContactCompany}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="AddCompany"
        component={AddCompany}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="CompanyDetails"
        component={CompanyDetails}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="RelatedContacts"
        component={RelatedContacts}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="ContactCustomerSupport"
        component={ContactCustomerSupport}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="CurrentSequence"
        component={CurrentSequence}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Purchases"
        component={Purchases}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="TicketDetails"
        component={TicketDetails}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="VideoPlay"
        component={VideoPlay}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const PipelinesStack = (props: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pipelines"
        component={Pipelines}
        options={{
          headerShown: false,
          title: 'Pipelines',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const InboxStack = (props: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: 'Home',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="UserEmailSmsDetails"
        component={UserEmailSmsDetails}
        options={{
          headerShown: false,
          title: 'UserEmailSmsDetails',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MoreStack = (props: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
          title: 'More',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          title: 'Notification',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="TodoScreen"
        component={TodoScreen}
        options={{
          headerShown: false,
          title: 'Todo',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="UpdateTaskScreen"
        component={UpdateTaskScreen}
        options={{
          headerShown: false,
          title: 'Update Task',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          title: 'Settings',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="TwoFactor"
        component={TwoFactor}
        options={{
          headerShown: false,
          title: 'Settings',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="UpdateTwoFactor"
        component={UpdateTwoFactor}
        options={{
          headerShown: false,
          title: 'Settings',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="SupportTicket"
        component={SupportTicket}
        options={{
          headerShown: false,
          title: 'Support Tickets',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="CreateNewTicket"
        component={CreateNewTicket}
        options={{
          headerShown: false,
          title: 'Create Tickets',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="SupportTicketDetail"
        component={SupportTicketDetail}
        options={{
          headerShown: false,
          title: 'Ticket Details',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="SwitchAccount"
        component={SwitchAccount}
        options={{
          headerShown: false,
          title: 'Switch Account',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="WebScreen"
        component={WebScreen}
        options={{
          headerShown: false,
          title: 'Web View',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SupportStack = (props: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SupportTicket"
        component={SupportTicket}
        options={{
          headerShown: false,
          title: 'Support Tickets',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="CreateNewTicket"
        component={CreateNewTicket}
        options={{
          headerShown: false,
          title: 'Create Tickets',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
      <Stack.Screen
        name="SupportTicketDetail"
        component={SupportTicketDetail}
        options={{
          headerShown: false,
          title: 'Ticket Details',
          headerTitleStyle: {
            fontSize: 20,
            // fontFamily: DEFAULT_FONT,
          },
        }}
      />
    </Stack.Navigator>
  );
};

// BottomTabNavigator
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="TodayStack"
      backBehavior="initialRoute"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <BottomTab.Screen
        name="TodayStack"
        component={TodayStack}
        options={
          {
            // unmountOnBlur: true,
          }
        }
      />
      <BottomTab.Screen
        name="ContactsStack"
        component={ContactsStack}
        options={
          {
            // unmountOnBlur: true,
          }
        }
      />
      <BottomTab.Screen
        name="PipelinesStack"
        component={PipelinesStack}
        options={
          {
            // unmountOnBlur: true,
          }
        }
      />
      <BottomTab.Screen
        name="InboxStack"
        component={InboxStack}
        options={
          {
            // unmountOnBlur: true,
          }
        }
      />
      <BottomTab.Screen
        name="SupportStack"
        component={SupportStack}
        options={
          {
            // unmountOnBlur: true,
          }
        }
      />
      <BottomTab.Screen
        name="MoreStack"
        component={MoreStack}
        options={
          {
            // unmountOnBlur: true,
          }
        }
      />
    </BottomTab.Navigator>
  );
};

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={[styles.mainContainer]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={[styles.mainItemContainer]}>
            <Pressable
              onPress={onPress}
              style={{
                borderRadius: 20,
              }}>
              <View style={styles.iconAndTextContainer}>
                <NavigationIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.bottomNavColor,
    flexDirection: 'row',
    height: 90,
    paddingTop: 18,
  },
  mainItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconAndTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
