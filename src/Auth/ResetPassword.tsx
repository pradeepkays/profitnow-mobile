import React, { Component } from 'react'
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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import SnackBar from '../Component/SnackBar'
import { color, font, shadow } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  newPassword: string
  confirmPassword: string
  newPasswordshow: boolean
  confirmPasswordshow: boolean
  email: string
  isLoading: boolean
}

const { width } = Dimensions.get('window')

export default class ForgotPassword extends Component<AppScreenProps, State> {
  snackbar: SnackBar | null = null
  password: TextInput | null = null
  state = {
    newPassword: '',
    confirmPassword: '',
    newPasswordshow: true,
    confirmPasswordshow: true,
    email: this.props?.route?.params?.email,
    isLoading: false,
  }

  componentDidMount() {
    useAppStore.setState({ isTabBar: false })
  }

  resetPassword() {
    const { newPassword, confirmPassword } = this.state
    Keyboard.dismiss()
    if (!newPassword) {
      this.snackbar?.show('Enter new password.')
    } else if (!confirmPassword) {
      this.snackbar?.show('Enter confirm password.')
    } else if (newPassword !== confirmPassword) {
      this.snackbar?.show('Both password shoud be same.')
    } else {
      this.resetApi()
    }
  }

  resetApi() {
    const { newPassword, email } = this.state
    var data = { password: newPassword, email: email }
    this.setState({ isLoading: true })
    fetch(API.reset_password, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response?.message !== '') {
          this.setState({ isLoading: false })
          this.snackbar?.show(response.message)
          setTimeout(() => {
            this.props.navigation.goBack()
          }, 1500)
        } else {
          this.setState({ isLoading: false })
        }
      })
      .catch((e) => {
        console.log('eeror: ', e)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const {
      newPassword,
      newPasswordshow,
      confirmPassword,
      confirmPasswordshow,
      isLoading,
    } = this.state
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#eff2f7' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={{ backgroundColor: '#F4F5FA' }} />
        <StatusBar backgroundColor={'#F4F5FA'} barStyle="dark-content" />
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              ...shadow,
              marginHorizontal: 20,
              backgroundColor: '#fff',
              borderRadius: 6,
              paddingHorizontal: 25,
            }}
          >
            <View
              style={{
                height: width * 0.085,
                width: '100%',
                alignSelf: 'center',
                marginVertical: 45,
              }}
            >
              <Image
                source={require('assets/img/logo.png')}
                style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontFamily: font.bold,
                  color: 'rgba(58, 53, 65, 0.87)',
                  fontSize: 24,
                  marginBottom: 10,
                  letterSpacing: 0.1,
                }}
              >
                Reset Password{' '}
              </Text>
              <View
                style={{
                  height: 25,
                  width: 25,
                  marginTop: Platform.OS === 'ios' ? 0 : 3.5,
                }}
              >
                <Image
                  source={require('assets/img/lock.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>

            <Text
              style={{
                fontFamily: font.reg,
                color: 'rgba(58, 53, 65, 0.68)',
                fontSize: 15,
                marginBottom: 25,
              }}
            >
              Your new password must be different from previously used passwords
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'rgba(58, 53, 65, 0.23)',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 6,
                paddingHorizontal: 15,
                paddingVertical: 2,
                marginBottom: 15,
              }}
            >
              <TextInput
                placeholderTextColor="rgba(58, 53, 65, 0.38)"
                style={{
                  fontFamily: font.reg,
                  color: '#000',
                  fontSize: 15,
                  flex: 1,
                }}
                placeholder="New Password"
                value={newPassword}
                secureTextEntry={newPasswordshow}
                onChangeText={(_newPassword) =>
                  this.setState({ newPassword: _newPassword })
                }
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={() => this.password?.focus()}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ newPasswordshow: !newPasswordshow })
                }
                style={{
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('assets/img/eye.png')}
                  style={{ height: '80%', width: '80%', resizeMode: 'contain' }}
                />
                {!newPasswordshow ? (
                  <View
                    style={{
                      borderWidth: 1,
                      height: 25,
                      position: 'absolute',
                      transform: [{ rotate: '230deg' }],
                      borderColor: color.lableColor,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'rgba(58, 53, 65, 0.23)',
                borderRadius: 6,
                paddingHorizontal: 15,
                paddingVertical: 2,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 30,
              }}
            >
              <TextInput
                ref={(ref) => (this.password = ref)}
                placeholderTextColor="rgba(58, 53, 65, 0.38)"
                style={{
                  fontFamily: font.reg,
                  color: '#000',
                  fontSize: 15,
                  flex: 1,
                  marginRight: 5,
                }}
                placeholder="Confirm Password"
                secureTextEntry={confirmPasswordshow}
                value={confirmPassword}
                autoCapitalize="none"
                onChangeText={(_confirmPassword) =>
                  this.setState({ confirmPassword: _confirmPassword })
                }
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ confirmPasswordshow: !confirmPasswordshow })
                }
                style={{
                  height: 25,
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('assets/img/eye.png')}
                  style={{ height: '80%', width: '80%', resizeMode: 'contain' }}
                />
                {!confirmPasswordshow ? (
                  <View
                    style={{
                      borderWidth: 1,
                      height: 25,
                      position: 'absolute',
                      transform: [{ rotate: '230deg' }],
                      borderColor: color.lableColor,
                    }}
                  />
                ) : null}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this.resetPassword()}
              style={{
                backgroundColor: color.primeColor,
                height: 38,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: '#fff',
                    fontSize: 15,
                    letterSpacing: 0.5,
                  }}
                >
                  RESET PASSWORD
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={{
                paddingVertical: 15,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 35,
                flexDirection: 'row',
              }}
            >
              <Image
                source={require('assets/img/back_drop_down_icon.png')}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  tintColor: color.secondColor,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontFamily: font.semi,
                  color: color.secondColor,
                  fontSize: 16,
                  textAlign: 'center',
                  marginLeft: 15,
                }}
              >
                Back to login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <SnackBar
          ref={(ref) => {
            this.snackbar = ref
          }}
        />
      </KeyboardAwareScrollView>
    )
  }
}
