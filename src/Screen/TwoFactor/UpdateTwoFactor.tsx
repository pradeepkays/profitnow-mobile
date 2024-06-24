import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import {navigate} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService';
import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';
import {AppBlock, AppText} from '@starlingtech/element';

import Header from '../../Component/Header';
import {color, font} from '../../Component/Styles';
import {API} from '../../Privet';
import CheckBox from '@react-native-community/checkbox';
import {isEnabled} from 'react-native/Libraries/Performance/Systrace';
import {SvgXml} from 'react-native-svg';
import OtpInput from './OTPScreen.component';

export default class UpdateTwoFactor extends Component<AppScreenProps> {
  state = {
    isLoading: false,
    otp: '',
    type: this?.props?.route?.params?.type || '',
    svg_image: this?.props?.route?.params?.svg_image || '',
  };

  verify2FA(type, otp) {
    let url;
    let bodyData;

    if (type === 'EMAIL') {
      url = API.verifyOtp;
      bodyData = {
        '2fa_status': '1',
        '2fa_type': 'EMAIL',
        otp: otp,
      };
    } else if (type === 'GOOGLE') {
      url = API.verifyGoogle;
      bodyData = {
        '2fa_status': '1',
        '2fa_type': 'GOOGLE',
        otp: otp,
      };
    } else {
      console.error('Invalid 2FA type');
      return;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        access_token: useAppStore.getState().accessToken,
        'Content-Type': 'application/json',
        Cookie: 'PHPSESSID=atstkn638',
      },
      body: JSON.stringify(bodyData),
    })
      .then(response => response.json())
      .then(data => {
        NavigationService.navigate('More');
        this.setState({isLoading: false});
      })
      .catch(error => {
        this.setState({isLoading: false});
        console.error('Error:', error);
      });
  }

  handleClick = type => {
    this.setState({isLoading: true});

    if (this.state.otp.length == 6) {
      if (type === 'GOOGLE') {
        this.verify2FA('GOOGLE', this.state.otp);
      } else {
        this.verify2FA('EMAIL', this.state.otp);
      }
    } else {
      Alert.alert('Please enter OTP.');
    }
  };

  render() {
    const {type, isLoading} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header
          title="2FA"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
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
              <AppText size={14} mt={10} color={color.fontblack}>
                Please enter 6-digit OTP code from your Google Autheticator App
              </AppText>
              <AppText size={12} mt={10} mb={5} color={color.fontblack}>
                Scan QR Code from Google Autheticator App to get the code
              </AppText>
              <AppBlock center mt={10} mb={15}>
                <Image
                  source={{uri: this?.props?.route?.params?.svg_image}}
                  style={styles.qrCode}
                />
              </AppBlock>
            </AppBlock>
          )}
          <AppBlock center mh={26} mb={15}>
            <OtpInput onChange={value => this.setState({otp: value})} />
          </AppBlock>
        </AppBlock>

        <TouchableOpacity
          onPress={() => this.handleClick(type)}
          style={styles.btn}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.btnTxt}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

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
  btnShowPass: {
    alignItems: 'center',
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  btnTxt: {color: '#fff', fontFamily: font.semi, fontSize: 15},
  container: {backgroundColor: '#eff2f7', flex: 1},
  qrCode: {
    width: 200,
    height: 200,
  },
});
