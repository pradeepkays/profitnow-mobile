import React, {useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {initHeader} from '@vn.starlingTech/api/AppNetworking';

// import {navigate} from 'src/navigation/navigation';
import {storage, storageKeys} from 'src/storage/storage';
import useAppStore from 'src/store/appStore';

import CustomAlert from '../Component/CustomAlert';
import Header from '../Component/Header';
import {color, font} from '../Component/Styles';
import {API} from '../Privet';
import IconTodo from 'assets/svg/IconTodo';
import {appSize} from '@vn.starlingTech/config/AppConstant';

export default function More({navigation}: any) {
  const refLogout = useRef<CustomAlert>(null);

  useEffect(() => {
    useAppStore.setState({isTabBar: true, activeRoute: 'More'});
  }, []);

  const willFocus = () => {
    useAppStore.setState({isTabBar: true, activeRoute: 'More'});
  };

  const logout = () => {
    initHeader('');
    storage.delete(storageKeys.accessToken);
    storage.delete(storageKeys.allUsers);
    navigation.navigate('Login');
    fetch(API.logout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="More" _onWillFocus={() => willFocus()} />
      <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, paddingHorizontal: 5, paddingTop: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeWithCalender')}
            style={styles.item}>
            <Image
              source={require('assets/img/check-mark.png')}
              style={styles.icon}
            />
            <Text style={styles.label}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TodoScreen')}
            style={[styles.item, {marginLeft: appSize(14)}]}>
            <IconTodo width={30} />
            <Text style={styles.label}>To Do</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/notificationHome.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
                tintColor: color.fontcolor,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              Activities
            </Text>
          </TouchableOpacity>
          {/* <View borderColor={color.borderColor} style={{ borderWidth: .5, marginHorizontal: -20 }} /> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/setting.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('TwoFactor')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/setting.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              2FA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SupportTicket')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/DateRangeold.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              Support Tickets
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/help.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              Help & Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SwitchAccount');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/importcontact.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              Switch Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              refLogout.current?.onShow(
                'Are you sure you want to logout!',
                'Logout',
              )
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
              marginBottom: 20,
            }}>
            <Image
              source={require('assets/img/logout.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginLeft: 20,
              }}
            />
            <Text
              style={{
                color: color.fontcolor,
                fontFamily: font.reg,
                fontSize: 16,
                textAlignVertical: 'center',
                flex: 1,
                marginLeft: 20,
              }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomAlert ref={refLogout} onPressOk={() => logout()} cancel />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 25,
    marginLeft: 20,
    resizeMode: 'contain',
    width: 25,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
  label: {
    color: color.fontcolor,
    flex: 1,
    fontFamily: font.reg,
    fontSize: 16,
    marginLeft: 20,
    textAlignVertical: 'center',
  },
});
