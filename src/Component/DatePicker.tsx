import React, { Component } from 'react'
import {
  Image,
  Keyboard,
  Modal,
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import { color, font } from './Styles'

interface MyProps {
  placeholder: String
  value: Date
  onChange: Function
  mainViewStyle: ViewStyle
  maxDate: Date
  minDate: Date
  mode: string | 'date' | 'time'
  disabled: Boolean
  dateFormat: string
  timeFormat: string
  dateTextStyle?: TextStyle
  containtStyle?: ViewStyle
  borderColor?: string
  iconHide?: boolean
  tintColor?: string
  icon?: number
}

export default class DatePicker extends Component<MyProps> {
  state = {
    visible: false,
  }

  onChange(date: any) {
    if (date.type === 'dismissed') {
      this.setState({ visible: false })
    }
    if (date.type === 'set') {
      this.setState({ visible: false })
      this.props.onChange
        ? this.props.onChange(date.nativeEvent.timestamp)
        : null
    }
    if (Platform.OS === 'ios') {
      this.props.onChange
        ? this.props.onChange(new Date(date.nativeEvent.timestamp))
        : null
    }
  }

  render() {
    const { visible } = this.state
    const {
      mode = 'date',
      value,
      maxDate,
      minDate,
      dateTextStyle,
      containtStyle,
      borderColor = color.borderColor,
      mainViewStyle,
      iconHide = false,
      tintColor = color.lableColor,
      icon = require('assets/img/calendar.png'),
      dateFormat = 'DD-MM-YYYY',
      timeFormat = 'LT',
    } = this.props
    return (
      <View
        style={[
          {
            flex: 1,
            borderWidth: 1,
            height: 45,
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 8,
            borderColor,
          },
          mainViewStyle,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss()
            this.setState({ visible: true })
          }}
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 12,
            },
            containtStyle,
          ]}
        >
          {value ? (
            mode === 'date' ? (
              <Text
                numberOfLines={1}
                style={[
                  {
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#000',
                    fontSize: 14,
                  },
                  dateTextStyle,
                ]}
              >
                {moment(value).format(dateFormat)}
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                style={[
                  {
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#000',
                    fontSize: 14,
                  },
                  dateTextStyle,
                ]}
              >
                {moment(value).format(timeFormat)}
              </Text>
            )
          ) : (
            <View style={{ flex: 1 }} />
          )}

          {!iconHide ? (
            <View>
              <Image
                source={icon}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor: tintColor,
                }}
              />
            </View>
          ) : null}
        </TouchableOpacity>

        {Platform.OS !== 'ios' ? (
          visible ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={value ? new Date(value) : new Date()}
              mode={mode}
              maximumDate={maxDate ? maxDate : undefined}
              minimumDate={minDate ? minDate : undefined}
              is24Hour={false}
              display="default"
              onChange={(_date: any) => this.onChange(_date)}
            />
          ) : null
        ) : null}

        {Platform.OS === 'ios' ? (
          <Modal transparent visible={visible}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#0009',
                justifyContent: 'center',
              }}
              activeOpacity={1}
              onPressOut={() => this.setState({ visible: false })}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    backgroundColor: '#fff',
                    marginHorizontal: 40,
                    borderRadius: 3,
                  }}
                >
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={value ? new Date(value) : new Date()}
                    mode={mode}
                    maximumDate={maxDate ? maxDate : undefined}
                    minimumDate={minDate ? minDate : undefined}
                    is24Hour={false}
                    display="default"
                    onChange={(_date: any) => this.onChange(_date)}
                  />
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        ) : null}
      </View>
    )
  }
}
