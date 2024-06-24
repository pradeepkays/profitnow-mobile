// import { NavigationStackScreenProps } from '@react-navigation/native-stack'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack/src/types';

type NavParamsRootStack = {};

export type AppScreenProps<RouteName extends keyof any = keyof any> =
  NativeStackScreenProps<any, RouteName>;

export type AppNavigationProps<
  RouteName extends keyof NavParamsRootStack = keyof NavParamsRootStack,
> = NativeStackNavigationProp<NavParamsRootStack, RouteName>;
