import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'

import { SmsMessage } from './components/SmsMessage'
import { SmsTemplate } from './components/SmsTemplate'
import Header from '../../Component/Header'
import { color, font } from '../../Component/Styles'

const ComposeSms = ({ navigation, route }: AppScreenProps) => {
  const detail = route?.params?.detail
  const image = ''
  const [activeState, setActiveState] = useState(1)

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        title="Send SMS"
        Limg={require('assets/img/back.png')}
        Lpress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={image} style={styles.userImageStyle} />
          ) : (
            <Text style={styles.avatarText}>{detail?.initials}</Text>
          )}
        </View>

        <Text style={styles.userName} numberOfLines={2}>
          {detail?.first_name} {detail?.last_name}
        </Text>

        <View style={{ height: 50, marginTop: 20, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => setActiveState(1)}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{
                color:
                  activeState === 1
                    ? color.secondColor
                    : 'rgba(58, 53, 65, 0.68)',
                fontFamily: activeState === 1 ? font.semi : font.reg,
              }}
            >
              SMS Template
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveState(2)}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{
                color:
                  activeState === 2
                    ? color.secondColor
                    : 'rgba(58, 53, 65, 0.68)',
                fontFamily: activeState === 2 ? font.semi : font.reg,
              }}
            >
              Custom Message
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              borderBottomWidth: 2,
              flex: 1,
              borderBottomColor:
                activeState === 1 ? color.secondColor : color.borderColor,
            }}
          />
          <View
            style={{
              borderBottomWidth: 2,
              flex: 1,
              borderBottomColor:
                activeState === 2 ? color.secondColor : color.borderColor,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
        {activeState === 1 ? (
          <SmsTemplate id={detail.id} />
        ) : (
          <SmsMessage id={detail.id} />
        )}
      </View>
    </View>
  )
}

export default ComposeSms

const styles = StyleSheet.create({
  avatarText: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 25,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    borderColor: color.secondColor,
    borderRadius: 54,
    borderWidth: 1,
    height: 107,
    justifyContent: 'center',
    marginTop: 10,
    padding: 27,
    width: 107,
  },
  userImageStyle: {
    borderRadius: 50,
    height: '100%',
    width: '100%',
  },
  userName: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 20,
    marginTop: 18,
    textAlign: 'center',
  },
})
