import React, { Component } from 'react'
import {
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
import NavigationService from 'src/utils/NavigationService'

type State = {
  email: string
}

const { width } = Dimensions.get('window')

export default class ForgotPassword extends Component<AppScreenProps, State> {
  snackbar: SnackBar | null = null
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      email: '',
    }
  }

  forgotPassword() {
    const { email } = this.state
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    Keyboard.dismiss()
    if (!email) {
      this.snackbar?.show('Enter email.')
    } else if (!reg.test(email)) {
      this.snackbar?.show('Enter valid email.')
    } else {
      this.props.navigation.navigate('ResetPassword', { email: email })
    }
  }

  componentDidMount() {
    useAppStore.setState({ isTabBar: false })
  }

  render() {
    const { email } = this.state
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: '#eff2f7' }}
        // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
                Forgot Password{' '}
              </Text>
              <View
                style={{
                  width: 25,
                  height: 25,
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
              Enter your email and we'll send you instructions to reset your
              password
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
                marginBottom: 30,
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
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(_email) => this.setState({ email: _email })}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.forgotPassword()}
              style={{
                backgroundColor: color.primeColor,
                height: 38,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: font.semi,
                  color: '#fff',
                  fontSize: 15,
                  letterSpacing: 0.5,
                }}
              >
                FORGOT PASSWORD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => NavigationService.navigate('Login')}
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
