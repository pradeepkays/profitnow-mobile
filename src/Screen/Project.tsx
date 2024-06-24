import React, { Component } from 'react'
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font, shadow } from '../Component/Styles'

export default class Project extends Component<AppScreenProps> {
  state = {
    text: '',
    isactive: true,
  }

  render() {
    const { text, isactive } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Projects"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingHorizontal: 20,
            borderBottomColor: color.borderColor,
          }}
        >
          <Image
            source={require('assets/img/Search.png')}
            style={{ height: 25, width: 25, tintColor: color.fontcolor }}
          />
          <TextInput
            placeholder="Search Projects"
            placeholderTextColor={color.lableColor}
            style={{
              fontFamily: font.reg,
              color: '#000',
              fontSize: 16,
              paddingLeft: 15,
              flex: 1,
              paddingRight: 10,
            }}
            value={text}
            onChangeText={(_text) => this.setState({ text: _text })}
            onFocus={() => {
              this.setState({ isactive: false })
              useAppStore.setState({ isTabBar: false })
            }}
            onBlur={() => {
              this.setState({ isactive: true })
              useAppStore.setState({ isTabBar: true })
            }}
          />
          {text ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({ text: '' })
                Keyboard.dismiss()
              }}
              style={{
                height: 25,
                width: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('assets/img/cancle_icon.png')}
                style={{
                  height: '60%',
                  width: '60%',
                  tintColor: color.fontcolor,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          data={projectList}
          renderItem={({ item }) => (
            <View>
              <Text
                style={{
                  color: color.lableColor,
                  fontFamily: font.semi,
                  marginBottom: 15,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontFamily: font.semi,
                  marginBottom: 20,
                }}
              >
                {item.des}
              </Text>
            </View>
          )}
        />
        {isactive ? (
          <View
            style={{
              paddingTop: 20,
              ...shadow,
              paddingHorizontal: 20,
              paddingBottom: 10,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                flex: 1,
                marginRight: 3,
                backgroundColor: color.secondColor,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('assets/img/Segment.png')}
                  style={{
                    height: 19,
                    width: 19,
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                />
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: '#fff',
                    fontSize: 12,
                    marginLeft: 10,
                  }}
                >
                  Sort
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                overflow: 'hidden',
                flex: 1,
                marginLeft: 3,
                borderColor: color.fontblack,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingVertical: 8,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('assets/img/FilterList.png')}
                  style={{ height: 19, width: 19, resizeMode: 'contain' }}
                />
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: color.fontblack,
                    fontSize: 12,
                    marginLeft: 10,
                  }}
                >
                  Sort
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    )
  }
}

const projectList = [
  {
    title: 'A',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'B',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'C',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'D',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'E',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'F',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    title: 'G',
    des: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
]
