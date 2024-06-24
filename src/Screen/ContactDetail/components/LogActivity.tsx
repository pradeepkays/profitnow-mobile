import React from 'react'
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { color, font } from 'src/Component/Styles'

type Props = {
  visible: boolean
  onClose(): void
}

export function LogActivity(props: Props) {
  const { visible, onClose } = props

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: color.lableColor,
          paddingHorizontal: 20,
          paddingBottom: 70,
        }}
      >
        <TouchableWithoutFeedback>
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}
              >
                <Image
                  source={require('assets/img/logactivity.png')}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    marginLeft: 20,
                    tintColor: color.primeColor,
                  }}
                />
                <Text
                  style={{
                    color: color.primeColor,
                    fontFamily: font.semi,
                    fontSize: 16,
                    textAlignVertical: 'center',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  Log Activity
                </Text>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 20,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  width: '100%',
                  borderColor: color.secondColor,
                }}
              />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}
              >
                <Image
                  source={require('assets/img/Messageprime.png')}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: 'contain',
                    marginLeft: 20,
                    tintColor: color.primeColor,
                  }}
                />
                <Text
                  style={{
                    color: color.primeColor,
                    fontFamily: font.semi,
                    fontSize: 16,
                    textAlignVertical: 'center',
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  Create Note
                </Text>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: color.fontblack,
                }}
              >
                <Text
                  style={{
                    color: color.primeColor,
                    fontFamily: font.bold,
                    fontSize: 12,
                    textAlign: 'center',
                    paddingVertical: 10,
                  }}
                >
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <SafeAreaView />
      </TouchableOpacity>
      <SafeAreaView backgroundColor={color.lableColor} />
    </Modal>
  )
}
