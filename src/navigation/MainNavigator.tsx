import React from 'react';
import {Easing, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';

// Auth
import AuthLoading from 'src/Auth/AuthLoading';
import ForgotPassword from 'src/Auth/ForgotPassword';
import Login from 'src/Auth/Login';
import Register from 'src/Auth/Register';
import ResetPassword from 'src/Auth/ResetPassword';
import NavigationService from 'src/utils/NavigationService';
import VerifyTwoFactor from 'src/Auth/VerifyTwoFactor';

// create stack navigator
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer
      ref={navigator => NavigationService.setTopLevelNavigator(navigator)}>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{
          // animation: 'slide_from_right',
          // animationDuration: 200,
          headerTitleStyle: {
            color: '#444',
          },
        }}>
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoading}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={({navigation}) => ({
            headerShown: false,
            title: '',
          })}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={({navigation}) => ({
            headerShown: false,
            title: '',
          })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: '',
          }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="VerifyTwoFactor"
          component={VerifyTwoFactor}
          options={{
            headerShown: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
