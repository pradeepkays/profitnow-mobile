import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useAppStore from 'src/store/appStore';
import {AppBlock, AppText} from '@starlingtech/element';
import Header from '../../Component/Header';
import {color, font} from '../../Component/Styles';
import {API} from '../../Privet';
import IconChecked from 'assets/svg/IconChecked';
import IconSquare from 'assets/svg/IconSquare';
import {useProfile} from 'src/service/user/user';
import {User} from 'src/types/user.types';
import {showFlashMessageError} from '@vn.starlingTech/helpers/flashMessageHelper';

const TwoFactor = props => {
  const navigation = useNavigation();
  const {mutate: getProfile} = useProfile();

  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [authType, setAuthType] = useState('');

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    setIsProfileLoading(true);
    getProfile(undefined, {
      onSuccess: data => {
        setAuthType(data['2fa_type']);
        setIsEnabled(data['2fa_status'] == 0 ? false : true);
        setIsProfileLoading(false);
      },
      onError: () => {
        setIsProfileLoading(false);
        showFlashMessageError('Something went wrong');
      },
    });
  };

  const handleClick = () => {

    let data = {'2fa_status': isEnabled ? 1 : 0, '2fa_type': authType}; 
    setIsLoading(true);

    fetch(`${API.updateTwoFactor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        setIsLoading(false);

        if (response?.['2fa_status'] == 1) {
          navigation.navigate('UpdateTwoFactor', {
            type: response?.['2fa_type'],
            svg_image: response?.['svg_image'],
          });
        } else {
          navigation.goBack();
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title="2FA"
        Limg={require('assets/img/back.png')}
        Lpress={() => navigation.goBack()}
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}>
        <AppBlock row center mt={100} mb={10}>
          <AppText size={14} weight="500" color={color.fontblack}>
            Two factor Authentication
          </AppText>
          <Switch
            trackColor={{
              false: color.lightGaryBackground,
              true: color.primeColor,
            }}
            thumbColor={color.whiteColor}
            ios_backgroundColor={color.primeColor}
            onValueChange={() => setIsEnabled(!isEnabled)}
            value={isEnabled}
          />
        </AppBlock>

        {isEnabled && (
          <>
            <TouchableOpacity
              style={styles.tickItem}
              onPress={() => setAuthType('EMAIL')}>
              {authType === 'EMAIL' ? (
                <IconChecked opacity={0.7} />
              ) : (
                <IconSquare opacity={0.3} />
              )}
              <AppText color={color.fontblack} ml={12}>
                Email
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tickItem}
              onPress={() => setAuthType('GOOGLE')}>
              {authType === 'GOOGLE' ? (
                <IconChecked opacity={0.7} />
              ) : (
                <IconSquare opacity={0.3} />
              )}
              <AppText color={color.fontblack} ml={12}>
                Google Authenticator
              </AppText>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={handleClick} style={styles.btn}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.btnTxt}>Update Setting</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      {isProfileLoading && (
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <ActivityIndicator color={'blue'} />
        </View>
      )}
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
  },
  btnShowPass: {
    alignItems: 'center',
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  btnTxt: {
    color: '#fff',
    fontFamily: font.semi,
    fontSize: 15,
  },
  container: {
    backgroundColor: '#eff2f7',
    flex: 1,
  },
  tickItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default TwoFactor;
