import React, { useEffect } from 'react'
import {
  Image,
  ImageSourcePropType,
  StatusBar,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
// import { NavigationEvents } from 'react-navigation'

import useAppStore from 'src/store/appStore'

import { color, font } from './Styles'
import { API } from '../Privet'

interface MyProps {
  Limg: ImageSourcePropType
  title: string
  Rimg: ImageSourcePropType
  Rimg2: ImageSourcePropType
  paddingBottom: number
  _onWillFocus(): void
  _onDidFocus(): void
  _onWillBlur(): void
  _onDidBlur(): void
  searchBar: boolean
  text: string
  closeSearchBar(): void
  Lpress(): void
  Rpress2(): void
  placeholderType: string
  Rimg3: ImageSourcePropType
  Rimg4: ImageSourcePropType
  Rpress4(): void
  Rpress3(): void
  SafeAreaViewColor: any
  Rpress(): void
  customeRightButton: any
  active: any
  searchFilterFunction(txt: string): void
  tintActive: boolean
  containerStyle: StyleProp<ViewStyle>
}

export default function Header(props: Partial<MyProps>) {
  const count = () => {
    fetch(API.common_appstate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then((response) => response.json())
      .then(async () => {})
      .catch((e) => {
        console.log('eeror: ', e)
      })
  }

  useEffect(() => {
    SplashScreen.hide()
    count()
  }, [])

  const {
    Limg,
    title,
    Rimg,
    Rimg2,
    paddingBottom = 0,
    _onWillFocus,
    _onDidFocus,
    _onWillBlur,
    _onDidBlur,
    searchBar = false,
    text,
    closeSearchBar,
    Lpress,
    Rpress2,
    placeholderType,
    Rimg3,
    Rimg4,
    Rpress4,
    Rpress3,
    SafeAreaViewColor,
    Rpress,
    customeRightButton,
    active,
    searchFilterFunction,
    tintActive,
    containerStyle,
  } = props
  return (
    <View style={[{ backgroundColor: '#fff0', zIndex: 100 }, containerStyle]}>
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: SafeAreaViewColor ? undefined : '#fff' }}
      />
      <StatusBar
        backgroundColor={SafeAreaViewColor ? SafeAreaViewColor : '#fff'}
        barStyle="dark-content"
      />
      {!searchBar ? (
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: paddingBottom,
            backgroundColor: SafeAreaViewColor ? undefined : '#fff0',
            marginBottom: -paddingBottom,
          }}
        >
          <View
            style={{
              paddingHorizontal: active ? 10 : 5,
              // paddingVertical: 13,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: SafeAreaViewColor ? undefined : '#fff',
              shadowOffset: SafeAreaViewColor
                ? undefined
                : { width: 0, height: 0 },
              shadowOpacity: SafeAreaViewColor ? undefined : 0.35,
              shadowRadius: SafeAreaViewColor ? undefined : 4,
              elevation: SafeAreaViewColor ? undefined : 4,
            }}
          >
            <View style={{ width: active ? 0 : 90, height: 45 }}>
              <TouchableOpacity
                disabled={!Limg ? true : false}
                onPress={() => (Lpress ? Lpress() : null)}
                style={{
                  height: 45,
                  width: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={Limg}
                  style={
                    tintActive
                      ? {
                          resizeMode: 'contain',
                          height: '50%',
                          width: '50%',
                          tintColor: '#fff',
                        }
                      : { resizeMode: 'contain', height: '50%', width: '50%' }
                  }
                />
              </TouchableOpacity>
            </View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                fontFamily: font.semi,
                textAlign: active ? null : 'center',
                fontSize: 20,
                color: tintActive ? color.whiteColor : color.fontblack,
                paddingLeft: active ? 15 : 0,
              }}
            >
              {title}
            </Text>
            {customeRightButton ? (
              <View style={{ width: 90, height: 45, alignItems: 'flex-end' }}>
                {customeRightButton}
              </View>
            ) : (
              <View
                style={{
                  width: Rimg4 && active ? 170 : active ? 140 : 90,
                  height: 45,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {Rimg4 && (
                  <TouchableOpacity
                    disabled={!Rimg4 ? true : false}
                    onPress={() => (Rpress4 ? Rpress4() : null)}
                    style={{
                      height: 45,
                      width: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={Rimg4}
                      style={{
                        resizeMode: 'contain',
                        height: '50%',
                        width: '50%',
                      }}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  disabled={!Rimg2 ? true : false}
                  onPress={() => (Rpress2 ? Rpress2() : null)}
                  style={{
                    height: 45,
                    width: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={Rimg2}
                    style={{
                      resizeMode: 'contain',
                      height: '50%',
                      width: '50%',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!Rimg ? true : false}
                  onPress={() => (Rpress ? Rpress() : null)}
                  style={{
                    height: 45,
                    width: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={Rimg}
                    style={{
                      resizeMode: 'contain',
                      height: '50%',
                      width: '50%',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!Rimg3 ? true : false}
                  onPress={() => (Rpress3 ? Rpress3() : null)}
                  style={{
                    height: 45,
                    width: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={Rimg3}
                    style={{
                      resizeMode: 'contain',
                      height: '50%',
                      width: '50%',
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: paddingBottom,
            backgroundColor: '#fff0',
            marginBottom: -paddingBottom,
          }}
        >
          <View
            style={{
              paddingHorizontal: 12,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: SafeAreaViewColor ? SafeAreaViewColor : '#fff',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.35,
              shadowRadius: 4,
              elevation: 4,
              paddingVertical: 9.5,
              height: 45,
            }}
          >
            <View
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
            >
              <Image
                source={require('assets/img/Search.png')}
                style={{
                  height: '50%',
                  width: '50%',
                  resizeMode: 'contain',
                  tintColor: 'rgba(58, 53, 65, 0.87)',
                }}
              />
            </View>
            <TextInput
              // autoFocus={searchBar}
              style={{
                padding: 0,
                flex: 1,
                height: 45,
                fontFamily: font.reg,
                fontSize: 18,
                color: '#000',
              }}
              placeholder={placeholderType}
              // placeholderTextColor="#fff5"
              value={text}
              blurOnSubmit={true}
              onFocus={() => useAppStore.setState({ isTabBar: false })}
              onBlur={() => useAppStore.setState({ isTabBar: true })}
              onChangeText={(txt) =>
                searchFilterFunction ? searchFilterFunction(txt) : null
              }
            />
            <TouchableOpacity
              onPress={closeSearchBar}
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('assets/img/cancle_icon.png')}
                style={{
                  height: '30%',
                  width: '30%',
                  resizeMode: 'contain',
                  tintColor: 'rgba(58, 53, 65, 0.87)',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* <NavigationEvents
        onWillFocus={_onWillFocus}
        onDidFocus={_onDidFocus}
        onWillBlur={_onWillBlur}
        onDidBlur={_onDidBlur}
      /> */}
    </View>
  )
}
