import React, { Component } from 'react'
import {
  Image,
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

import DatePickerNew from '../Component/DatePickerNew'
import Header from '../Component/Header'
import PickerNew from '../Component/PickerNew'
import { color, font, shadow } from '../Component/Styles'

export default class AddTicket extends Component<AppScreenProps> {
  state = {
    date: new Date(),
  }

  render() {
    const { date } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f6fa' }}>
        <Header
          title="Create Ticket"
          SafeAreaViewColor={'#f3f6fa'}
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            bounces={false}
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
          >
            <View
              style={{
                ...shadow,
                marginHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingHorizontal: 25,
                paddingVertical: 20,
              }}
            >
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Client
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <PickerNew
                      // icon={require('assets/img/drop.png')}
                      // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                      placeholder="Select Client"
                    />
                  </View>
                  <Image
                    source={require('assets/img/addContact.png')}
                    style={{
                      height: 25,
                      width: 25,
                      resizeMode: 'contain',
                      marginLeft: 15,
                    }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Department
                </Text>
                <View style={{ flex: 1 }}>
                  <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    placeholder="Select Department"
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Assigned User
                </Text>
                <View style={{ flex: 1 }}>
                  <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    placeholder="Assigned User"
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Set Priority*
                </Text>
                <View style={{ flex: 1 }}>
                  <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    placeholder="Set Priority"
                  />
                </View>
              </View>
              <Text
                style={{
                  fontFamily: font.bold,
                  paddingTop: 5,
                  paddingBottom: 15,
                  color: '#7E8EAA',
                  fontSize: 16,
                }}
              >
                Request
              </Text>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Set Status*
                </Text>
                <View style={{ flex: 1 }}>
                  <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    placeholder="Set Status"
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Due Date*
                </Text>
                <View style={{ flex: 1 }}>
                  <DatePickerNew
                    // icon={null}
                    style={{
                      paddingHorizontal: 12,
                      marginTop: 5,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: color.borderColor,
                      paddingVertical: 15,
                    }}
                    placeholder="Select Due Date"
                    value={date}
                    onSelect={(_date: Date) => this.setState({ date: _date })}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Subject*
                </Text>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 8,
                      flex: 1,
                      borderColor: color.borderColor,
                      paddingHorizontal: 12,
                      height: 60,
                      marginTop: 5,
                    }}
                    placeholder="Subject"
                    placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Question*
                </Text>
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 8,
                      flex: 1,
                      borderColor: color.borderColor,
                      paddingHorizontal: 12,
                      height: 60,
                      marginTop: 5,
                    }}
                    placeholder="Question"
                    placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}
                >
                  Add Attachment: (Optional)
                </Text>
                <View style={{ flex: 1 }} />
              </View>
              <TouchableOpacity
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
                  style={{ fontFamily: font.semi, color: '#fff', fontSize: 15 }}
                >
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        {/* <SnackBar ref="Snacknbar" /> */}
      </View>
    )
  }
}
