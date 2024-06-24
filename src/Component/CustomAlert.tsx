import React, { Component } from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { color, font, shadow } from './Styles'

interface MyProps {
  onPressOk: Function
  onPressCancel?: Function
  cancel: boolean
}

type State = {
  visible: boolean
  msg: string
  title: string
  data: any
}

export default class CustomAlert extends Component<MyProps, State> {
  constructor(props: MyProps) {
    super(props)
    this.state = {
      visible: false,
      msg: 'Hello this message is test message!',
      title: 'Lead Tracker',
      data: null,
    }
    // alert('Hello this message is test message')
  }

  onShow(msg: string, title: string, data?: any) {
    this.setState({
      title: title ? title : this.state.title,
      msg,
      visible: true,
      data,
    })
  }

  onPress() {
    const { data } = this.state
    this.setState({ visible: false }, () =>
      this.props.onPressOk ? this.props.onPressOk(data) : null,
    )
  }

  render() {
    const { visible, msg, title } = this.state
    const { cancel, onPressCancel } = this.props
    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={() => cancel && this.setState({ visible: false })}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => cancel && this.setState({ visible: false })}
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 15,
            backgroundColor: '#0003',
          }}
        >
          <TouchableWithoutFeedback>
            <View style={{ padding: 15, ...shadow, borderRadius: 8 }}>
              <Text style={{ fontFamily: font.bold, fontSize: 16 }}>
                {title}
              </Text>
              <Text
                style={{ fontFamily: font.reg, marginTop: 5, fontSize: 14 }}
              >
                {msg}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {cancel ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ visible: false }, () => {
                        onPressCancel ? onPressCancel() : null
                      })
                    }
                    style={{
                      marginTop: 15,
                      marginRight: 30,
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: font.semi,
                        fontSize: 14,
                        color: color.lableColor,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={() => this.onPress()}
                  style={{ marginTop: 15, alignSelf: 'flex-end' }}
                >
                  <Text style={{ fontFamily: font.semi, fontSize: 14 }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }
}
