import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  LogBox,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {shallow} from 'zustand/shallow';
import AppProvider from '@vn.starlingTech/context/AppProvider';
import AppStyles from '@vn.starlingTech/elements/AppStyles';
import AddLeadModal from 'src/Component/AddLeadModal';
import AddOpportunityModal from 'src/Component/AddOpportunityModal';
import AddProjectModal from 'src/Component/AddProjectModal';
import CreateNew from 'src/Component/CreateNew';
import NavItem from 'src/Component/NavItem';
import {color} from 'src/Component/Styles';
import {AppContainer} from 'src/navigation/AppNavigation';
import MainNavigator from 'src/navigation/MainNavigator';
import {navigate, navigationRef} from 'src/navigation/navigation';
import useAppStore from 'src/store/appStore';
import {showNotification} from '@vn.starlingTech/helpers/flashMessageHelper';
import PushNotification, {
  pushNotificationRef,
} from 'src/Screen/PushNotification';
import {enableScreens} from 'react-native-screens';

enableScreens();
// TODO: Remove when fixed
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  'Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.',
  'Non-serializable values were found in the navigation state.',
  'new NativeEventEmitter',
  'ReactImageView: Image source "null" doesn\'t exist',
  'Warning: A props object containing a "key" prop is being spread into JSX:',
]);

const App = () => {
  const refAddLeadModal = useRef<any>(null);
  const refAddProjectModal = useRef<any>(null);
  const refAddOpportunityModal = useRef<any>(null);

  // ReactImageView: Image source "null" doesn't exist
  const [isTabBar, activeRoute] = useAppStore(
    s => [s.isTabBar, s.activeRoute],
    shallow,
  );

  const [state, setAppState] = useState({
    isConnected: true,
    visible: false,
    loginUser: {},
    filterData: [],
    isLoading: false,
  });

  const setState = (a: object) => {
    setAppState(prev => ({...prev, ...a}));
  };

  // const onPress = (routName = '') => {
  //   setState({visible: false});
  //   useAppStore.setState({activeRoute: routName});
  //   navigate(routName);
  // };

  const onClick = (item: any) => {
    if (item.status === 'customers' || item.status === 'leads') {
      refAddLeadModal?.current?.show();
    } else if (item.status === 'opportunities') {
      refAddOpportunityModal?.current?.show();
    }
  };

  const {isLoading, visible, filterData} = state;

  return (
    <AppProvider>
      <PushNotification />
      <View style={AppStyles.fill}>
        <View style={AppStyles.fill}>
          <MainNavigator />
        </View>

        {isLoading && (
          <View style={styles.isLoading}>
            <ActivityIndicator
              color={color.bottomNavColor}
              style={styles.indicator}
            />
          </View>
        )}

        <Modal
          animationType="slide"
          transparent
          visible={visible && filterData.length > 0}
          onRequestClose={() => {
            setState({visible: false});
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setState({visible: false})}
            style={styles.btnCreateNew}>
            <TouchableWithoutFeedback>
              <CreateNew
                handleClose={() => setState({visible: false})}
                data={filterData}
                handleSelect={v => onClick(v)}
              />
            </TouchableWithoutFeedback>
            <SafeAreaView />
          </TouchableOpacity>
          <AddLeadModal ref={refAddLeadModal} />
          <AddProjectModal ref={refAddProjectModal} />
          <AddOpportunityModal ref={refAddOpportunityModal} />
        </Modal>
      </View>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  btnCreateNew: {
    backgroundColor: color.lableColor,
    flex: 1,
    justifyContent: 'flex-end',
  },
  indicator: {height: 80, width: 80},
  isLoading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  tabBar: {
    backgroundColor: color.bottomNavColor,
    flexDirection: 'row',
    height: 70,
    paddingTop: 18,
  },
});
