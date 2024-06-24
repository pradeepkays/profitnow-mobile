import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {API} from 'src/Privet';
import {color, font} from 'components/Styles';
import Header from 'components/Header';
import {AppBlock, AppText} from '@starlingtech/element';
import OtpInput from 'src/Screen/TwoFactor/OTPScreen.component';
import {User} from 'src/types/user.types';
import useAppStore from 'src/store/appStore';
import {storage, storageKeys} from 'src/storage/storage';
import {showFlashMessageError} from '@vn.starlingTech/helpers/flashMessageHelper';
import {initHeader} from '@vn.starlingTech/api/AppNetworking';
import {useProfile} from 'src/service/user/user';

const VerifyTwoFactor = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [type, setType] = useState(route.params?.type || '');
  const [svgImage, setSvgImage] = useState(route.params?.svg_image || '');

  const {mutate: getProfile} = useProfile();

  useEffect(() => {
    console.log('Params:', route.params);
  }, []);

  const verify2FA = (type, otp) => {
    let url;
    let bodyData;

    if (type === 'EMAIL') {
      url = API.verifyLoginOtp;
      bodyData = {
        email: route.params?.email,
        otp: otp,
      };
    } else if (type === 'GOOGLE') {
      url = API.verifyLoginGoogle;
      bodyData = {
        email: route.params?.email,
        otp: otp,
      };
    } else {
      console.error('Invalid 2FA type');
      return;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: 'PHPSESSID=atstkn638',
      },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('--->> resp-->> ', data);
        if (data?.access_token) {
          storage.set(storageKeys.accessToken, data?.access_token);
          useAppStore.setState({accessToken: data?.access_token});
          initHeader(data?.access_token);
          // updateFcmToken()
          getProfile(undefined, {
            onSuccess: data => {
              setIsLoading(false);
              console.log(' ---data---> ', data);
              const user: User = {
                ...data,
                additional: data.additional[1].value,
              };
              useAppStore.setState({user});
              navigation.navigate('BottomTabNavigator', {
                screen: 'TodayStack',
              });
              console.log(' ------> ');
              storage.set(
                storageKeys.allUsers,
                JSON.stringify([{user, accessToken: data?.access_token}]),
              );
              storage.set(storageKeys.twoFactorStatus, data['2fa_status']);
              if (data['2fa_type'] !== null) {
                storage.set(storageKeys.twoFactorType, data['2fa_type']);
              }
            },
            onError: () => {
              showFlashMessageError('Something went wrong');
              setIsLoading(false);
            },
          });
        } else {
          Alert.alert(data?.message);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  const handleClick = type => {
    setIsLoading(true);
    console.log(' ----this.state.otp--> ', otp);

    if (otp.length === 6) {
      console.log(' ----if--> ');
      verify2FA(type, otp);
    } else {
      console.log(' ---else---> ');
      Alert.alert('Please enter OTP.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title="2FA"
        Limg={require('assets/img/back.png')}
        Lpress={() => navigation.goBack()}
      />
      <AppBlock ml={20} mh={10}>
        {type === 'EMAIL' ? (
          <AppBlock mt={100}>
            <AppText
              size={20}
              weight="500"
              color={color.fontblack}
              numberOfLines={1}>
              Verify OTP
            </AppText>
            <AppText size={14} mt={10} mb={26} color={color.fontblack}>
              Please enter 6-digit OTP code sent to your Email
            </AppText>
          </AppBlock>
        ) : (
          <AppBlock mt={100}>
            <AppText
              size={20}
              weight="500"
              color={color.fontblack}
              numberOfLines={1}>
              Verify Google Auth Code
            </AppText>
            <AppText size={14} mt={10} mb={15} color={color.fontblack}>
              Please enter 6-digit OTP code from your Google Authenticator App
            </AppText>
          </AppBlock>
        )}
        <AppBlock center mh={26} mb={15}>
          <OtpInput onChange={value => setOtp(value)} />
        </AppBlock>
      </AppBlock>
      <TouchableOpacity onPress={() => handleClick(type)} style={styles.btn}>
        {isLoading ? (
          <ActivityIndicator color={'#fff'} />
        ) : (
          <Text style={styles.btnTxt}>Confirm</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
    marginBottom: 35,
    width: 200,
    alignSelf: 'center',
  },
  btnTxt: {color: '#fff', fontFamily: font.semi, fontSize: 15},
  qrCode: {
    width: 200,
    height: 200,
  },
});

export default VerifyTwoFactor;
