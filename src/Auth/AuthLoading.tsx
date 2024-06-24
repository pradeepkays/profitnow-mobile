import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {initHeader} from '@vn.starlingTech/api/AppNetworking';

import {useProfile} from 'src/service/user/user';
import {storage, storageKeys} from 'src/storage/storage';
import useAppStore from 'src/store/appStore';
import {User} from 'src/types/user.types';
import {color} from 'components/Styles';

export default function AuthLoadingScreen({navigation}: any) {
  const {mutate: getProfile} = useProfile();

  const handleLogin = () => {
    storage.delete(storageKeys.accessToken);
    navigation.navigate('Login');
  };

  useEffect(() => {
    const accessToken = storage.getString(storageKeys.accessToken)
    if (accessToken) {
      initHeader(accessToken)
      getProfile(undefined, {
        onSuccess: (data) => {
          const user: User = {
            ...data,
            additional: data.additional[1].value,
          }
          useAppStore.setState({ user })
          navigation.navigate('BottomTabNavigator')
        },
        onError: () => {
          handleLogin()
        },
      })
    } else {
      handleLogin()
    }
  }, [])

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        color={color.bottomNavColor}
        style={styles.loadingIndicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  loadingIndicator: {height: 80, width: 80},
});
