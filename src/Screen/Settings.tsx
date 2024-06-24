import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// import { navigate } from 'src/navigation/navigation'
import NavigationService from 'src/utils/NavigationService'
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'

export default class Settings extends Component<AppScreenProps> {
  state = {
    isLoading: false,
  }

  connectEmail() {
    this.setState({ isLoading: true })
    fetch(`${API.emailConnect}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          this.setState({ isLoading: false })
          NavigationService.navigate('WebScreen', { url: response.url })
          // this.refs.Snacknbar.show('Note successfully added.');
          // setTimeout(() => { this.props.navigation.goBack(); }, 1000);
        } else {
          this.setState({ isLoading: false })
          // this.refs.Snacknbar.show('Something is wrong.');
        }
      })
      .catch(() => {})
  }

  render() {
    const { isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Settings"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Image
              source={require('assets/img/usersetting.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                tintColor: color.fontcolor,
              }}
            />
            <Text
              style={{
                flex: 1,
                textAlignVertical: 'center',
                fontFamily: font.reg,
                color: color.fontcolor,
                marginLeft: 25,
                fontSize: 16,
              }}
            >
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Image
              source={require('assets/img/mailsetting.png')}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                tintColor: color.fontcolor,
              }}
            />
            <Text
              style={{
                flex: 1,
                textAlignVertical: 'center',
                fontFamily: font.reg,
                color: color.fontcolor,
                marginLeft: 25,
                fontSize: 16,
              }}
            >
              Email
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.connectEmail()
              }}
              style={{
                height: 40,
                width: 100,
                backgroundColor: color.primeColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>Connect</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
        {isLoading && (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}
          >
            <ActivityIndicator color={'blue'} />
          </View>
        )}
      </View>
    )
  }
}
