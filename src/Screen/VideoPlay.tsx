import React, { Component } from 'react'
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Orientation from 'react-native-orientation-locker'

import { utcToLocal } from 'src/helper/timeHelper'
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import { color, font } from '../Component/Styles'
import VideoPlayer from '../Component/VideoPlayer'

type State = {
  onLoad: boolean
  item: any
}
export default class VideoPlay extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      onLoad: true,
      item: {},
    }
  }

  async componentDidMount() {
    useAppStore.setState({ isTabBar: false })
    const item = await this.props?.route?.params?.item
    await this.setState({ item })
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
    useAppStore.setState({ isTabBar: true })
  }

  render() {
    const { item } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor={'#000'} barStyle="light-content" />
        <SafeAreaView
          style={{
            backgroundColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        />
        <VideoPlayer
          source={{ uri: item.video_url ? item.video_url : '' }}
          onBackPress={() => this.props.navigation.goBack()}
          title={item.title + ''}
          autoPlay
          seekColor={'#572ff2'}
        />
        <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: font.reg,
              color: color.lableColor,
              marginBottom: 10,
            }}
          >
            Uploader: {item?.uploaded_by_name + ''}
          </Text>
          <Text
            style={{ fontFamily: font.reg, color: '#7E8EAA', marginBottom: 10 }}
          >
            Uploaded: {utcToLocal(item?.received_time)}
          </Text>
          <Text style={{ fontFamily: font.reg, color: '#56CA00' }}>
            Published: {utcToLocal(item?.published_time)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() =>
                item?.share_buttons?.facebook_url
                  ? Linking.openURL(item?.share_buttons?.facebook_url)
                  : null
              }
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderWidth: 1,
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: color.borderColor,
                }}
              >
                <Image
                  source={require('assets/img/facebook.png')}
                  style={{
                    height: '55%',
                    width: '55%',
                    resizeMode: 'contain',
                    tintColor: '#572ff2',
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                item?.share_buttons?.twitter_url != null
                  ? Linking.openURL(item?.share_buttons?.twitter_url)
                  : null
              }
              style={{ marginLeft: 15 }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderWidth: 1,
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: color.borderColor,
                }}
              >
                <Image
                  source={require('assets/img/twitter.png')}
                  style={{
                    height: '55%',
                    width: '55%',
                    resizeMode: 'contain',
                    tintColor: '#572ff2',
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                item?.share_buttons?.linkedin_url != null
                  ? Linking.openURL(item?.share_buttons?.linkedin_url)
                  : null
              }
              style={{ marginLeft: 15 }}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderWidth: 1,
                  borderRadius: 7,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: color.borderColor,
                }}
              >
                <Image
                  source={require('assets/img/linkedin.png')}
                  style={{
                    height: '55%',
                    width: '55%',
                    resizeMode: 'contain',
                    tintColor: '#572ff2',
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 15,
                height: 40,
                width: 40,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('assets/img/chat.png')}
                style={{
                  height: '45%',
                  width: '45%',
                  resizeMode: 'contain',
                  tintColor: '#572ff2',
                }}
              />
            </View>
            <View
              style={{
                height: 30,
                width: 10,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: font.semi,
                  color: color.fontcolor,
                  fontSize: 17,
                }}
              >
                0
              </Text>
            </View>
            <View
              style={{
                marginLeft: 15,
                height: 40,
                width: 40,
                borderRadius: 7,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('assets/img/video.png')}
                style={{
                  height: '45%',
                  width: '45%',
                  resizeMode: 'contain',
                  tintColor: '#6e629d',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
