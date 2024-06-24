import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import AppStyles from '@vn.starlingTech/elements/AppStyles'

import useAppStore from 'src/store/appStore'

import { abbreviateNumber } from '../../../Component/Helper'
import { color, font } from '../../../Component/Styles'
import { API } from '../../../Privet'

export default function ActivityCalender() {
  const refSCroll = useRef<ScrollView>(null)

  const [active, setActive] = useState('day')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>()
  const [refreshing, setRefreshing] = useState(false)

  const getData = useCallback(() => {
    setIsLoading(true)
    fetch(`${API.dashboard}?interval=${active}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response?.statuses !== undefined) {
          refSCroll.current?.scrollTo({ x: 0, y: 0, animated: true })
          setData(response)
          setIsLoading(false)
          setRefreshing(false)
        } else {
          setData(undefined)
          setIsLoading(false)
          setRefreshing(false)
        }
      })
      .catch(() => {
        setIsLoading(false)
        setRefreshing(false)
      })
  }, [active])

  useEffect(() => {
    getData()
  }, [getData])

  const onFilterBy = (_active: string) => {
    setActive(_active)
  }

  const onRefresh = () => {
    getData()
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F9' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 45,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => onFilterBy('day')}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{
              fontSize: 13,
              color: active === 'day' ? '#000926' : 'rgba(0, 9, 38, 0.3)',
              fontFamily: font.reg,
            }}
          >
            DAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onFilterBy('week')}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{
              fontSize: 13,
              color: active === 'week' ? '#000926' : 'rgba(0, 9, 38, 0.3)',
              fontFamily: font.reg,
            }}
          >
            WEEK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onFilterBy('two_weeks')}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{
              fontSize: 13,
              color: active === 'two_weeks' ? '#000926' : 'rgba(0, 9, 38, 0.3)',
              fontFamily: font.reg,
            }}
          >
            2 WEEKS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onFilterBy('month')}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{
              fontSize: 13,
              color: active === 'month' ? '#000926' : 'rgba(0, 9, 38, 0.3)',
              fontFamily: font.reg,
            }}
          >
            MONTH
          </Text>
        </TouchableOpacity>
      </View>

      {data != null ? (
        <ScrollView
          ref={refSCroll}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <SkeletonPlaceholder style={AppStyles.fill}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: Dimensions.get('window').width / 2 - 25,
                    height: 90,
                    borderRadius: 8,
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    width: Dimensions.get('window').width / 2 - 25,
                    height: 90,
                    borderRadius: 8,
                    marginLeft: 5,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    width: Dimensions.get('window').width / 2 - 25,
                    height: 90,
                    borderRadius: 8,
                    marginRight: 5,
                  }}
                />
                <View
                  style={{
                    width: Dimensions.get('window').width / 2 - 25,
                    height: 90,
                    borderRadius: 8,
                    marginLeft: 5,
                  }}
                />
              </View>
              <View
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 90,
                  borderRadius: 8,
                  marginRight: 5,
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 90,
                  borderRadius: 8,
                  marginRight: 5,
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 90,
                  borderRadius: 8,
                  marginRight: 5,
                  marginHorizontal: 20,
                  marginBottom: 15,
                }}
              />
            </SkeletonPlaceholder>
          ) : (
            <View style={{ flex: 1 }}>
              {/* First Row  */}
              <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      height: 103,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                      paddingLeft: 20,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#5E8DF7',
                          fontSize: 24,
                        }}
                      >
                        {data?.sms?.outgoing ? data?.sms?.outgoing + '' : '0'}
                      </Text>
                      <Image
                        source={require('assets/img/sentRightIcon.png')}
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 5,
                      }}
                    >
                      SMS Sent
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      height: 103,
                      backgroundColor: '#fff',
                      marginLeft: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      paddingLeft: 20,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#00B389',
                          fontSize: 24,
                        }}
                      >
                        {data?.sms?.incoming ? data?.sms?.incoming + '' : '0'}
                      </Text>
                      <Image
                        source={require('assets/img/receivedDownIcon.png')}
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 5,
                      }}
                    >
                      SMS Received
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      height: 103,
                      backgroundColor: '#fff',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      paddingLeft: 20,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#5E8DF7',
                          fontSize: 24,
                        }}
                      >
                        {data?.emails?.outgoing
                          ? data?.emails?.outgoing + ''
                          : '0'}
                      </Text>
                      <Image
                        source={require('assets/img/sentRightIcon.png')}
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 5,
                      }}
                    >
                      Emails Sent
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 103,
                      backgroundColor: '#fff',
                      marginLeft: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                      justifyContent: 'center',
                      paddingLeft: 20,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#00B389',
                          fontSize: 24,
                        }}
                      >
                        {data?.emails?.incoming
                          ? data?.emails?.incoming + ''
                          : '0'}
                      </Text>
                      <Image
                        source={require('assets/img/receivedDownIcon.png')}
                        style={{
                          height: 24,
                          width: 24,
                          resizeMode: 'contain',
                          marginRight: 20,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 5,
                      }}
                    >
                      Emails Received
                    </Text>
                  </View>
                </View>
              </View>

              {/* calls  */}
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    color: 'rgba(58, 53, 65, 0.87)',
                    fontSize: 16,
                    fontFamily: font.reg,
                    marginBottom: 15,
                  }}
                >
                  Calls
                </Text>
                <View
                  style={{
                    height: 105,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingHorizontal: 19,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('assets/img/outgoingCall.png')}
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {data?.calls?.outgoing
                          ? data?.calls?.outgoing + ''
                          : '0'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Outgoing Calls
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('assets/img/incomingCall.png')}
                      style={{
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {data?.calls?.incoming
                          ? data?.calls?.incoming + ''
                          : '0'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Incoming Calls
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Customer  */}
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    color: color.fontcolor,
                    fontSize: 15,
                    fontFamily: font.semi,
                    marginBottom: 15,
                  }}
                >
                  {data?.statuses?.customers?.title}
                </Text>
                <View
                  style={{
                    marginBottom: 10,
                    height: 95,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.customers?.received?.value
                        ? data?.statuses?.customers?.received?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.customers?.received?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.customers?.contact?.value
                        ? data?.statuses?.customers?.contact?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.customers?.contact?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.customers?.appointment?.value
                        ? data?.statuses?.customers?.appointment?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.customers?.appointment?.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 95,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.customers?.sold?.value
                        ? data?.statuses?.customers?.sold?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.customers?.sold?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.customers?.lost?.value
                        ? data?.statuses?.customers?.lost?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.customers?.lost?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* opportunities  */}
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    color: color.fontcolor,
                    fontSize: 15,
                    fontFamily: font.semi,
                    marginBottom: 15,
                  }}
                >
                  {data?.statuses?.opportunities?.title}
                </Text>
                <View
                  style={{
                    marginBottom: 10,
                    height: 95,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.opportunities?.received?.value
                        ? data?.statuses?.opportunities?.received?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.opportunities?.received?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.opportunities?.contact?.value
                        ? data?.statuses?.opportunities?.contact?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.opportunities?.contact?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.opportunities?.appointment?.value
                        ? data?.statuses?.opportunities?.appointment?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.opportunities?.appointment?.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 95,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.opportunities?.sold?.value
                        ? data?.statuses?.opportunities?.sold?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.opportunities?.sold?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.opportunities?.lost?.value
                        ? data?.statuses?.opportunities?.lost?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.opportunities?.lost?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* leads  */}
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    color: color.fontcolor,
                    fontSize: 15,
                    fontFamily: font.semi,
                    marginBottom: 15,
                  }}
                >
                  {data?.statuses?.leads?.title}
                </Text>
                <View
                  style={{
                    marginBottom: 10,
                    height: 95,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.leads?.received?.value
                        ? data?.statuses?.leads?.received?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.leads?.received?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.leads?.contact?.value
                        ? data?.statuses?.leads?.contact?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.leads?.contact?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.leads?.appointment?.value
                        ? data?.statuses?.leads?.appointment?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.leads?.appointment?.title}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 95,
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginRight: 7,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.leads?.sold?.value
                        ? data?.statuses?.leads?.sold?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.leads?.sold?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    >
                      {data?.statuses?.leads?.lost?.value
                        ? data?.statuses?.leads?.lost?.value + ''
                        : '0'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    >
                      {data?.statuses?.leads?.lost?.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: font.bold,
                        color: '#000926',
                        fontSize: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: font.reg,
                        color: '#5C6274',
                        fontSize: 12,
                        marginTop: 10,
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Campaign  */}
              <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    color: 'rgba(58, 53, 65, 0.87)',
                    fontSize: 16,
                    fontFamily: font.reg,
                    marginBottom: 15,
                  }}
                >
                  Campaign
                </Text>

                <View
                  style={{
                    height: 105,
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 105,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {abbreviateNumber(
                          data?.campaigns_count?.sent
                            ? data?.campaigns_count?.sent + ''
                            : 0,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Sent
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 105,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {abbreviateNumber(
                          data?.campaigns_count?.scheduled
                            ? data?.campaigns_count?.scheduled + ''
                            : 0,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Scheduled
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 105,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {abbreviateNumber(
                          data?.campaigns_count?.draft
                            ? data?.campaigns_count?.draft + ''
                            : 0,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Drafted
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    height: 105,
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 105,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {abbreviateNumber(
                          data?.campaigns_stats?.opens
                            ? data?.campaigns_stats?.opens + ''
                            : 0,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Total Opens
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 105,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {abbreviateNumber(
                          data?.campaigns_stats?.clicks
                            ? data?.campaigns_stats?.clicks + ''
                            : 0,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Total Clicks
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 105,
                      backgroundColor: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 7,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: '#000926',
                          fontSize: 24,
                        }}
                      >
                        {abbreviateNumber(
                          data?.campaigns_stats?.unsubsribes
                            ? data?.campaigns_stats?.unsubsribes + ''
                            : 0,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: '#5C6274',
                          fontSize: 12,
                          marginTop: 5,
                        }}
                      >
                        Total Unsubscribes
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            source={require('assets/img/empty.png')}
            style={{
              height: 90,
              width: 90,
              resizeMode: 'contain',
              marginBottom: 15,
            }}
          />
          <Text
            style={{
              fontFamily: font.reg,
              fontSize: 15,
              color: color.fontblack,
              textAlign: 'center',
            }}
          >
            Activity not found!
          </Text>
        </View>
      )}
    </View>
  )
}
