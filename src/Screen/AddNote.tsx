import React, { Component } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import SnackBar from '../Component/SnackBar'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'

export default class AddNote extends Component<AppScreenProps> {
  state = {
    note: '',
    contactId: this.props?.route?.params?.contactId,
    isLoading: false,
  }
  snackBar: SnackBar | null = null

  addNote() {
    const { note, contactId } = this.state
    Keyboard.dismiss()
    if (!note) {
      this.snackBar?.show('Enter your note.')
    }
    var data = { text: note }
    this.setState({ isLoading: true })

    fetch(`${API.communicationnotescontact}/${contactId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response?.id) {
          this.setState({ isLoading: false })
          this.snackBar?.show('Note successfully added.')
          setTimeout(() => {
            this.props.navigation.goBack()
          }, 1000)
        } else {
          this.setState({ isLoading: false })
          this.snackBar?.show('Something is wrong.')
        }
      })
      .catch((e) => {
        this.setState({ isLoading: false })
        console.log('eeror: ', e)
      })
  }

  render() {
    const { note, isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Create Notes"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ height: '70%' }}>
              <TextInput
                multiline
                placeholder="Type something..."
                placeholderTextColor={'#9A9A9A'}
                style={{
                  color: '#000',
                  marginHorizontal: 20,
                  marginTop: 30,
                  fontFamily: font.reg,
                  fontSize: 18,
                }}
                autoFocus
                value={note}
                onChangeText={(_note) => this.setState({ note: _note })}
                onFocus={() => useAppStore.setState({ isTabBar: false })}
                onBlur={() => useAppStore.setState({ isTabBar: true })}
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={() => this.addNote()}
          style={{
            marginHorizontal: 20,
            backgroundColor: color.secondColor,
            height: 38,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text
              style={{ fontFamily: font.semi, color: '#fff', fontSize: 15 }}
            >
              ADD NOTE
            </Text>
          )}
        </TouchableOpacity>
        <SnackBar ref={(ref) => (this.snackBar = ref)} />
      </View>
    )
  }
}
