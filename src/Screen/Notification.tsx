import React, { Component } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'

export default class Notification extends Component<AppScreenProps> {
  async componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'Notification' })
  }

  willFocus() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'Notification' })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Notifications"
          Rimg3={require('assets/img/rightprime.png')}
          _onWillFocus={() => this.willFocus()}
          Rimg={require('assets/img/homeemail.png')}
          Rpress={() => this.props.navigation.navigate('Home')}
          active
          // count={true}
        />
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
          data={notificationList}
          renderItem={({ item }) => (
            <View>
              <View
                style={{ borderWidth: 0.5, borderColor: color.borderColor }}
              />
              <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                    overflow: 'hidden',
                    backgroundColor: color.borderColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      height: '40%',
                      width: '40%',
                      resizeMode: 'contain',
                      tintColor: 'rgba(58, 53, 65, 0.87)',
                    }}
                  />
                </View>
                <View style={{ marginLeft: 15, flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      color: color.fontcolor,
                      fontSize: 13,
                      marginBottom: 5,
                      lineHeight: 20,
                    }}
                  >
                    {item.des}
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      color: color.fontcolor,
                      fontSize: 12,
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: 'rgba(86, 202, 0, 0.5)',
                    borderRadius: 15,
                    alignSelf: 'flex-end',
                  }}
                />
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

const notificationList = [
  {
    image: require('assets/img/cancle_icon.png'),
    des: 'The following has been completed: Projects Bulk Edit',
    date: '6/1/21',
  },
  {
    image: require('assets/img/cancle_icon.png'),
    des: 'The following has been completed: Projects Bulk Edit',
    date: '6/1/21',
  },
  {
    image: require('assets/img/cancle_icon.png'),
    des: 'The following has been completed: Projects Bulk Edit',
    date: '6/1/21',
  },
  {
    image: require('assets/img/ContactPage.png'),
    des: 'Export Complete',
    date: '6/1/21',
  },
  {
    image: require('assets/img/dollar.png'),
    des: 'Export Complete',
    date: '6/1/21',
  },
  {
    image: require('assets/img/check-mark.png'),
    des: 'Export Complete',
    date: '6/1/21',
  },
  {
    image: require('assets/img/project.png'),
    des: 'Export Complete',
    date: '6/1/21',
  },
]
