import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'

export default class Email extends Component<AppScreenProps> {
  state = {
    active: 'copper',
  }

  render() {
    const { active } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Email"
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
          <Text
            style={{
              fontFamily: font.reg,
              fontSize: 12,
              color: color.fontcolor,
              paddingVertical: 10,
            }}
          >
            Email from:
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ active: 'copper' })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Image
              source={require('assets/img/copper_monogram.png')}
              style={{ height: 25, width: 25, resizeMode: 'contain' }}
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
              Copper
            </Text>
            {active === 'copper' ? (
              <Image
                source={require('assets/img/rightprime.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  marginRight: 25,
                  tintColor: color.secondColor,
                }}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ active: 'gmail' })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Image
              source={require('assets/img/email.png')}
              style={{ height: 25, width: 25, resizeMode: 'contain' }}
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
              Gmail
            </Text>
            {active === 'gmail' ? (
              <Image
                source={require('assets/img/rightprime.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  marginRight: 25,
                  tintColor: color.secondColor,
                }}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ active: 'inbox' })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Image
              source={require('assets/img/inbox.png')}
              style={{ height: 25, width: 25, resizeMode: 'contain' }}
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
              Gmail
            </Text>
            {active === 'inbox' ? (
              <Image
                source={require('assets/img/rightprime.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  marginRight: 25,
                  tintColor: color.secondColor,
                }}
              />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ active: 'appmail' })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Image
              source={require('assets/img/appmail.png')}
              style={{ height: 25, width: 25, resizeMode: 'contain' }}
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
              Apple Mail
            </Text>
            {active === 'appmail' ? (
              <Image
                source={require('assets/img/rightprime.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  marginRight: 25,
                  tintColor: color.secondColor,
                }}
              />
            ) : null}
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}
