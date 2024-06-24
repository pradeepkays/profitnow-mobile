import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native'

import ImageSVG from 'react-native-remote-svg'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { utcToLocal } from 'src/helper/timeHelper'
import useAppStore from 'src/store/appStore'

import { color, font } from '../../Component/Styles'
import { API } from '../../Privet'

type Props = {
  id: string
}
type State = {
  activityList: any[]
  isLoading: boolean
}

const { width } = Dimensions.get('window')

export default class ActivityTicket extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      activityList: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    this.activityTickets()
  }

  activityTickets() {
    this.setState({ isLoading: true })
    fetch(`${API.supportticket}/${this.props.id}/activity`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.data.length) {
          this.setState({ isLoading: false, activityList: response.data })
        } else {
          this.setState({ isLoading: false })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  render() {
    const { activityList, isLoading } = this.state
    return (
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 30,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        data={activityList}
        renderItem={({ item, index }) => {
          let isEnd = index === activityList.length - 1
          return (
            <View style={{}}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color.selectBgColor,
                    borderRadius: 45,
                    overflow: 'hidden',
                  }}
                >
                  {index === 0 ? (
                    <ImageSVG
                      source={{
                        uri: `data:image/svg+xml;utf8,+${item.icon}`,
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <ImageSVG
                      source={{
                        uri: 'data:image/svg+xml;utf8,+<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 250 250" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-white feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </View>
                <View
                  style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: color.fontcolor,
                      fontFamily: font.semi,
                      marginBottom: 5,
                    }}
                  >
                    {item?.text}
                  </Text>
                  <Text
                    style={{
                      color: color.fontcolor,
                      fontFamily: font.reg,
                      fontSize: 13,
                    }}
                  >
                    {utcToLocal(item?.time)}
                  </Text>
                </View>
              </View>
              {isEnd ? null : (
                <View
                  style={{
                    borderLeftWidth: 1.5,
                    height: 30,
                    marginLeft: 20,
                    marginVertical: 5,
                    borderLeftColor: '#CCCDD0',
                  }}
                />
              )}
            </View>
          )
        }}
        ListEmptyComponent={
          <View style={{ flex: 1 }}>
            {!isLoading ? (
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
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                  <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                  <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
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
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => this.activityTickets()}
          />
        }
      />
    )
  }
}
