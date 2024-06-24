import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import messaging from '@react-native-firebase/messaging';
import {getBuildNumber, getVersion} from 'react-native-device-info';

import {showFlashMessageError} from '@vn.starlingTech/helpers/flashMessageHelper';

import {useLogin} from 'src/service/user/auth';
import {useFcmToken, useProfile} from 'src/service/user/user';
import {storage, storageKeys} from 'src/storage/storage';
import useAppStore from 'src/store/appStore';
import {User} from 'src/types/user.types';
import {initHeader} from 'vn.starlingTech/api/AppNetworking';

import SnackBar from '../Component/SnackBar';
import {color, font, shadow} from '../Component/Styles';

const {width} = Dimensions.get('window');

export default function Login({navigation}: any) {
  const snackbar = useRef<SnackBar>(null);
  const refPassword = useRef<TextInput>(null);

  const [showPass, setShowPass] = useState(false);
  const [state, dispatchState] = useState({
    check: false,
    email: __DEV__ ? 'patrickl@mspprocess.com' : '',
    password: __DEV__ ? 'Wind1fall' : '',
    isLoading: false,
  });

  const setState = (obj: object) => {
    dispatchState(prev => ({...prev, ...obj}));
  };

  const {mutate: mutateLogin} = useLogin();
  // const { mutate: muteFcmToken } = useFcmToken()
  const {mutate: getProfile} = useProfile();

  useEffect(() => {
    useAppStore.setState({isTabBar: false});
  }, []);

  const onTogglePass = () => {
    setShowPass(!showPass);
  };

  const onLoginPress = () => {
    const {email, password} = state;

    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    Keyboard.dismiss();

    if (!email) {
      snackbar?.current?.show('Enter email.');
    } else if (!reg.test(email)) {
      snackbar?.current?.show('Enter valid email.');
    } else if (!password) {
      snackbar?.current?.show('Enter password.');
    } else {
      const params = {
        login: email,
        password: password,
        device_name: `${Platform.OS}${getVersion()}(${getBuildNumber()})`,
      };

      setState({isLoading: true});

      mutateLogin(params, {
        onSuccess: data => {
          if (data?.access_token) {
            storage.set(storageKeys.accessToken, data?.access_token);
            useAppStore.setState({accessToken: data?.access_token});
            initHeader(data?.access_token);
            // updateFcmToken()
            getProfile(undefined, {
              onSuccess: data => {
                setState({isLoading: false});
                const user: User = {
                  ...data,
                  additional: data.additional[1].value,
                };
                useAppStore.setState({user});
                navigation.navigate('BottomTabNavigator', {
                  screen: 'TodayStack',
                });
                storage.set(
                  storageKeys.allUsers,
                  JSON.stringify([{user, accessToken: data?.access_token}]),
                );
              },
              onError: () => {
                showFlashMessageError('Something went wrong');
                setState({isLoading: false});
              },
            });
          } else {
            setState({isLoading: false});
            navigation.navigate('VerifyTwoFactor', {
              type: data.type,
              svg_image: data.svg_image,
              email,
            });
          }
        },
        onError: (_error: any) => {
          setState({isLoading: false});
          const {message} = JSON.parse(_error.message);
          showFlashMessageError(message);
        },
      });
    }
  };

  // const updateFcmToken = () => {
  //   const fcmToken = storage.getString(storageKeys.fcmToken)
  //   if (!fcmToken) {
  //     messaging()
  //       .getToken()
  //       .then((token) => {
  //         muteFcmToken(token)
  //       })
  //   } else {
  //     muteFcmToken(fcmToken)
  //   }
  // }

  const {email, password, isLoading} = state;
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.safeView} />
      <StatusBar backgroundColor={'#F4F5FA'} barStyle="dark-content" />
      <ScrollView bounces={false} contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.logoBox}>
            <Image
              source={require('assets/img/logo.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Welcome to ProfitNow!</Text>
          <Text style={styles.subTitle}>
            Please sign-in to your account and start the adventure
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholderTextColor="rgba(58, 53, 65, 0.38)"
              style={styles.inputEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={_email => setState({email: _email})}
              returnKeyType="next"
              onSubmitEditing={() => refPassword?.current?.focus()}
            />
          </View>
          <View style={styles.passwordBox}>
            <TextInput
              ref={refPassword}
              placeholderTextColor="rgba(58, 53, 65, 0.38)"
              style={styles.inputPassword}
              placeholder="Password"
              secureTextEntry={showPass}
              value={password}
              autoCapitalize="none"
              onChangeText={txt => setState({password: txt})}
            />
            <TouchableOpacity onPress={onTogglePass} style={styles.btnShowPass}>
              <Image
                source={require('assets/img/eye.png')}
                style={styles.eye}
              />
              {!showPass ? <View style={styles.line} /> : null}
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPassBox}>
            <Text
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPass}>
              Forgot Password?
            </Text>
          </View>

          <TouchableOpacity onPress={onLoginPress} style={styles.btn}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={styles.btnTxt}>LOGIN</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SnackBar ref={snackbar} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
    marginBottom: 35,
  },
  btnShowPass: {
    alignItems: 'center',
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  btnTxt: {color: '#fff', fontFamily: font.semi, fontSize: 15},
  container: {backgroundColor: '#eff2f7', flex: 1},
  content: {
    ...shadow,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginHorizontal: 20,
    paddingHorizontal: 25,
  },
  eye: {height: '85%', resizeMode: 'contain', width: '85%'},
  forgotPass: {
    color: color.secondColor,
    fontFamily: font.semi,
    fontSize: 14,
  },
  forgotPassBox: {alignItems: 'flex-end', marginBottom: 30},
  inputBox: {
    borderColor: 'rgba(58, 53, 65, 0.23)',
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  inputEmail: {color: '#000', fontFamily: font.reg, fontSize: 15, height: 50},
  inputPassword: {
    color: '#000',
    flex: 1,
    fontFamily: font.reg,
    fontSize: 15,
    marginRight: 5,
    height: 50,
  },
  line: {
    borderColor: 'black',
    borderWidth: 2,
    height: 25,
    position: 'absolute',
    transform: [{rotate: '230deg'}],
  },
  logo: {height: '100%', resizeMode: 'contain', width: '100%'},
  logoBox: {
    alignSelf: 'center',
    height: width * 0.085,
    marginVertical: 45,
    width: '100%',
  },
  passwordBox: {
    alignItems: 'center',
    borderColor: 'rgba(58, 53, 65, 0.23)',
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  safeView: {backgroundColor: '#F4F5FA'},
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  subTitle: {
    color: color.lableColor,
    fontFamily: font.reg,
    fontSize: 15,
    marginBottom: 25,
  },
  title: {
    color: 'rgba(58, 53, 65, 0.87)',
    fontFamily: font.bold,
    fontSize: 24,
    letterSpacing: 0.1,
    marginBottom: 10,
  },
});
