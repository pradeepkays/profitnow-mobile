import React, { Component } from 'react'
import {
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

export default class AddOpportunityModal extends Component {
  state = {
    visible: false,
    name: '',
    contact: '',
    closedate: '',
    company: '',
    source: '',
    value: '',
    email: '',
    website: '',
  }

  show() {
    this.setState({ visible: true })
  }

  close() {
    this.setState({ visible: false })
  }

  onCreate() {
    const { name, email, value, contact, website, source, closedate } =
      this.state

    var data = {
      title: name,
      phone: contact,
      email: email,
      value: value,
      source: source,
      closedate: closedate,
      website: website,
    }
    // this.props.isLoadStart()

    fetch(API.newOrganisation, {
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
        // this.props.isLoadEnd && this.props.isLoadEnd()
        if (response) {
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

  disabledFunc() {
    const { name, company, contact } = this.state
    if (name === '' || company === '' || contact === '') {
      return true
    } else {
      return false
    }
  }

  render() {
    const { visible, name, contact, closedate, company, source, value } =
      this.state
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
                  Add Opportunity
                </Text>
                <TouchableOpacity
                  onPress={() => (this.disabledFunc() ? null : this.onCreate())}
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
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/pipelineadd.png')}
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
                        Pipeline
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        CRM
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
                      source={require('assets/img/contact.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {contact ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Primary Conatct
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Primary Contact"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={contact}
                        onChangeText={(_contact) =>
                          this.setState({ contact: _contact })
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
                      source={require('assets/img/DateRange.png')}
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: 'contain',
                        tintColor: color.secondColor,
                      }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      {closedate ? (
                        <Text
                          style={{
                            fontFamily: font.reg,
                            color: color.fontcolor,
                            fontSize: 12,
                          }}
                        >
                          Close Date
                        </Text>
                      ) : null}
                      <TextInput
                        placeholder="Enter Exp. Close Date"
                        style={{ fontFamily: font.reg, color: '#000' }}
                        placeholderTextColor={color.lableColor}
                        value={closedate}
                        onChangeText={(_closedate) =>
                          this.setState({ closedate: _closedate })
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
                      source={require('assets/img/company.png')}
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
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/stage.png')}
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
                        Stage
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        Inquiry
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

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 20,
                    }}
                  >
                    <Image
                      source={require('assets/img/priority.png')}
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
                        Priority
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontcolor,
                        }}
                      >
                        None
                      </Text>
                    </View>
                  </TouchableOpacity>
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
