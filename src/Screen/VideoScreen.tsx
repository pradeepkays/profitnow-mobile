import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { PLAYER_STATES } from 'react-native-media-controls'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { utcToLocal } from 'src/helper/timeHelper'
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'
const { width } = Dimensions.get('window')

type State = {
  setPlayerState: PLAYER_STATES
  paused: boolean
  currentTime: any
  duration: number | null
  isLoading: boolean
  totalSend: number
  page: number
  isLoadingApi: boolean
  videoList: any[]
  id: string
}

export default class VideoScreen extends Component<AppScreenProps, State> {
  accessToken = useAppStore.getState().accessToken

  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      setPlayerState: PLAYER_STATES.PLAYING,
      paused: false,
      currentTime: null,
      duration: null,
      isLoading: true,
      totalSend: 0,
      page: 0,
      isLoadingApi: true,
      videoList: [],
      id: '',
    }
  }

  async componentDidMount() {
    const id = await this.props?.route?.params?.id
    await this.setState({ id })
    await this.videoListApi()
  }

  videoListApi() {
    const { totalSend, page, isLoadingApi, videoList, id } = this.state
    if (totalSend >= page) {
      this.setState({ isLoadingApi: true })

      fetch(
        `${API.media_videos}?limit=15&offset=${page + ''}&contact_id=${
          id + ''
        }`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            access_token: this.accessToken,
          },
        },
      )
        .then((response) => response.json())
        .then(async (response) => {
          if (response?.data != null) {
            const TotalFromApi = Math.ceil(
              response.pagination.total_items /
                response.pagination.current_limit,
            )
            if (isLoadingApi || videoList.length <= 0) {
              this.setState({
                isLoadingApi: false,
                videoList: response.data,
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            } else {
              this.setState({
                isLoadingApi: false,
                videoList: [...videoList, ...response.data],
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            }
          } else {
            this.setState({
              isLoadingApi: false,
              page: page + 1,
              videoList: [],
            })
          }
        })
        .catch((error) => {
          this.setState({ isLoadingApi: false, page: page + 1 })
          console.log(error)
        })
    }
  }

  onRefresh() {
    this.setState({ totalSend: 0, page: 0, isLoadingApi: true }, () =>
      this.videoListApi(),
    )
  }

  renderFooter = () => {
    const { totalSend, page, isLoadingApi } = this.state
    if (totalSend >= page && !isLoadingApi) {
      return (
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={color.primeColor} style={{}} />
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    const { isLoadingApi, videoList } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Videos"
          Limg={require('assets/img/back.png')}
          // Rimg={require('assets/img/addnote.png')}
          SafeAreaViewColor={'#fff4'}
          Lpress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={videoList}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            marginTop: 20,
            paddingBottom: 20,
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                marginBottom: 15,
                paddingBottom: 20,
                borderColor: 'black',
              }}
            >
              <View style={{ height: 190 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('VideoPlay', { item: item })
                  }
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  <Image
                    blurRadius={1}
                    source={{ uri: item.preview_image }}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      source={require('assets/img/play.png')}
                      style={{
                        height: '45%',
                        width: '45%',
                        resizeMode: 'contain',
                        tintColor: '#572ef2',
                        marginLeft: 5,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 25, paddingHorizontal: 20 }}>
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: color.lableColor,
                    marginBottom: 10,
                  }}
                >
                  Uploader: {item.uploaded_by_name + ''}
                </Text>
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 10,
                  }}
                >
                  Uploaded: {utcToLocal(item.received_time)}
                </Text>
                <Text style={{ fontFamily: font.reg, color: '#56CA00' }}>
                  Published: {utcToLocal(item.published_time)}
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
                      item.share_buttons.facebook_url != null
                        ? Linking.openURL(item.share_buttons.facebook_url)
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
                      item.share_buttons.twitter_url != null
                        ? Linking.openURL(item.share_buttons.twitter_url)
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
                      item.share_buttons.linkedin_url != null
                        ? Linking.openURL(item.share_buttons.linkedin_url)
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 25,
                  width: 40,
                  backgroundColor: '#562ef2',
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  position: 'absolute',
                  top: 25,
                }}
              >
                <Text style={{ fontFamily: font.bold, color: '#fff' }}>
                  {index + 1}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              {!isLoadingApi ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={require('assets/img/empty.png')}
                    style={{ height: 90, width: 90 }}
                  />
                  <Text
                    style={{
                      fontFamily: font.reg,
                      textAlign: 'center',
                      marginTop: 10,
                      color: color.lableColor,
                    }}
                  >
                    Result not found!
                  </Text>
                </View>
              ) : (
                <SkeletonPlaceholder>
                  <View style={{ paddingBottom: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <View style={{ justifyContent: 'center' }}>
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 90,
                          width: width,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              )}
            </View>
          }
          keyExtractor={(item, index) => index + ''}
          onEndReachedThreshold={0.1}
          onEndReached={() => this.videoListApi()}
          ListFooterComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingApi}
              onRefresh={() => this.onRefresh()}
            />
          }
        />
      </View>
    )
  }
}
