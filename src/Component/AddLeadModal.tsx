import React, { Component } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useAppStore from 'src/store/appStore'

import { color, font } from './Styles'
import { API } from '../Privet'

type Props = {
  isLoadEnd?(): void
}

export default class AddLeadModal extends Component<Props> {
  state = {
    visible: false,
    name: '',
    company: '',
    title: '',
    value: '',
    email: '',
    phone: '',
    website: '',
    source: '',
    isLoading: false,
  }

  show() {
    this.setState({ visible: true })
  }

  close() {
    this.setState({ visible: false })
  }

  disabledFunc() {
    const { name, phone } = this.state
    if (name === '' || phone === '') {
      return true
    } else {
      return false
    }
  }

  onCreate() {
    const { name, company, email, value, phone } = this.state

    var data = {
      first_name: name,
      phone: phone,
      email: email,
      value: value,
      organization: {
        id: company,
      },
      status: 'leads',
    }
    this.setState({ isLoading: true })

    fetch(API.newContacts, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response) {
          this.props.isLoadEnd && this.props.isLoadEnd()
          Alert.alert('Success', 'Contact Added Successfully', [
            { text: 'OK', onPress: () => this.setState({ visible: false }) },
          ])
        } else {
          // this.refs.snackbar.show(response.message)
        }
      })
      .catch((e) => {
        console.log('eeror: ', e)
      })
  }

  render() {
    const {
      visible,
      company,
      name,
      title,
      value,
      email,
      phone,
      website,
      source,
      isLoading,
    } = this.state

    return (
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => {
          this.setState({ visible: false })
        }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: color.lableColor }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {isLoading && (
            <View
              style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)',
                height: '100%',
                width: '100%',
              }}
            >
              <ActivityIndicator
                color={color.primeColor}
                style={{ height: 80, width: 80 }}
              />
            </View>
          )}
          <SafeAreaView />
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({ visible: false })}
              style={{ height: '100%', width: '100%', position: 'absolute' }}
            />
            <View
              style={{
                backgroundColor: '#fff',
                overflow: 'scroll',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ visible: false })}
                  style={{
                    width: 90,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{ color: color.primeColor, fontFamily: font.reg }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    flex: 1,
                    color: color.fontblack,
                    fontFamily: font.semi,
                    fontSize: 16,
                    textAlign: 'center',
                  }}
                >
                  Add Lead
                </Text>
                {
                  <TouchableOpacity
                    onPress={() => {
                      this.disabledFunc() ? null : this.onCreate()
                    }}
                    style={{
                      width: 90,
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: this.disabledFunc()
                          ? color.whiteColor
                          : color.primeColor,
                        fontFamily: font.reg,
                      }}
                    >
                      Create
                    </Text>
                  </TouchableOpacity>
                }
              </View>

              {/* Form */}
              <ScrollView
                bounces={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
              >
                <View style={{ paddingHorizontal: 20 }}>
                  <View style={{ paddingVertical: 20 }}>
                    {name ? (
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          fontSize: 12,
                        }}
                      >
                        Name
                      </Text>
                    ) : null}
                    <TextInput
                      placeholder="Enter Name"
                      style={{ fontFamily: font.reg, color: '#000' }}
                      placeholderTextColor={color.lableColor}
                      value={name}
                      onChangeText={(_name) => this.setState({ name: _name })}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/companyuser.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {company ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Company
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Company"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={company}
                        onChangeText={(_company) =>
                          this.setState({ company: _company })
                        }
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/user.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          marginBottom: 5,
                          fontSize: 12,
                        }}
                      >
                        Owner
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        Gusskarlis
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/AccountBoxuser.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {title ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Title
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Title"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={title}
                        onChangeText={(_title) =>
                          this.setState({ title: _title })
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/value.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {value ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Value
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Value"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={value}
                        onChangeText={(_value) =>
                          this.setState({ value: _value })
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/Emailprime.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {email ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Email
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Email"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(_email) =>
                          this.setState({ email: _email })
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/callprime.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {phone ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Phone
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Phone"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        keyboardType="decimal-pad"
                        value={phone}
                        onChangeText={(_phone) =>
                          this.setState({ phone: _phone })
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/workuser.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {website ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Website
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Website"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={website}
                        onChangeText={(_website) =>
                          this.setState({ website: _website })
                        }
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/arrowuser.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          marginBottom: 5,
                          fontSize: 12,
                        }}
                      >
                        Status
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        Open
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/source.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {source ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Source
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Source"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={source}
                        onChangeText={(_source) =>
                          this.setState({ source: _source })
                        }
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
              <SafeAreaView />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    )
  }
}
