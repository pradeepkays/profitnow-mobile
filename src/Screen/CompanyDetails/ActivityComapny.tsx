import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import moment from 'moment'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import IconEmail from 'assets/svg/IconEmail'
import IconMessage from 'assets/svg/IconMessage'
import IconNote from 'assets/svg/IconNote'
import IconPhone from 'assets/svg/IconPhone'
import IconTask from 'assets/svg/IconTask'
import useAppStore from 'src/store/appStore'

import { color, font, shadow } from '../../Component/Styles'
import UserCallList from '../../Component/UserProfileComponent/UserCallList'
import UserEmailSmsList from '../../Component/UserProfileComponent/UserEmailSmsList'
import { API } from '../../Privet'

const { height, width } = Dimensions.get('window')

type Props = {
  data: any
  companyId: string
}
type DataType =
  | 'email'
  | 'sms'
  | 'call'
  | 'outgoing'
  | 'incoming'
  | 'task'
  | 'note'
  | ''

type State = {
  last_contacted: string
  visible: boolean
  isLoadingData: boolean
  visiblecall: boolean
  inactive: ''
  interactions: ''
  type: DataType
  activityList: any[]
  totalSend: number
  page: number
  expandIndex: null
  direction: ''
  isLoading: boolean
}
export default class ActivityCompany extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      last_contacted: '',
      visible: false,
      isLoadingData: false,
      visiblecall: false,
      inactive: '',
      interactions: '',
      type: 'email',
      activityList: [],
      totalSend: 0,
      page: 0,
      expandIndex: null,
      direction: '',
      isLoading: false,
    }
  }
  componentDidMount() {
    this.activitiestApi('email')
  }

  activitiestApi(type: DataType, direction?: any) {
    const { totalSend, page, isLoading, activityList } = this.state
    const {
      user: { id: userId },
      accessToken,
    } = useAppStore.getState()
    this.setState({
      type: type,
      visible: false,
      visiblecall: false,
      direction: direction,
    })
    if (totalSend >= page) {
      this.setState({ isLoadingData: true, isLoading: true })
      fetch(
        `${API.activities}?organization_id=${
          this.props.companyId + ''
        }&user_id=${
          userId + ''
        }&type=${type}&direction=${direction}&limit=15&offset=${page + ''}`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            Accept: '*/*',
            access_token: accessToken,
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
            if (isLoading || activityList.length <= 0) {
              this.setState({
                isLoading: false,
                isLoadingData: false,
                activityList: response.data,
                totalSend: TotalFromApi - 1,
                page: page + 1,
                inactive: response.stats[0].inactive.value,
                last_contacted: response.stats[0].last_contacted.value,
                interactions: response.stats[0].interactions.value,
              })
            } else {
              this.setState({
                isLoading: false,
                isLoadingData: false,
                activityList: [...activityList, ...response.data],
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            }
          } else {
            this.setState({
              isLoading: false,
              isLoadingData: false,
              page: page + 1,
              activityList: [],
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            isLoadingData: false,
            isLoading: false,
            page: page + 1,
          })
        })
    }
  }

  utcToLocalCall(date: any) {
    // Yesterday
    let YesterdayTimeConvert = moment().subtract(1, 'day').utc()
    // Today
    const localtoday = moment().utc().toDate()
    // Date
    let localTime = moment.utc(date).toDate()

    if (
      moment(localTime).format('MM/DD/YYYY') ===
      moment(localtoday).format('MM/DD/YYYY')
    ) {
      return 'Today ' + moment(localTime).format('hh:mm A')
    } else if (
      moment(localTime).format('MM/DD/YYYY') ===
      moment(YesterdayTimeConvert).format('MM/DD/YYYY')
    ) {
      return 'Yesterday ' + moment(localTime).format('hh:mm A')
    } else {
      return moment(localTime).format('MM/DD/YYYY hh:mm A')
    }
  }

  onRefresh() {
    this.setState({ totalSend: 0, page: 0, isLoading: true }, () =>
      this.activitiestApi(this.state.type),
    )
  }

  onPress(passtype: DataType, direction?: any) {
    this.setState(
      {
        activityList: [],
        page: 0,
        totalSend: 0,
        type: '',
        direction: '',
        expandIndex: null,
      },
      () => this.activitiestApi(passtype, direction),
    )
  }

  renderFooter = () => {
    const { totalSend, page, isLoading } = this.state
    if (totalSend >= page && !isLoading) {
      return (
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            ...shadow,
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
    const {
      activityList,
      visiblecall,
      type,
      isLoading,
      isLoadingData,
      visible,
      inactive,
      last_contacted,
      interactions,
    } = this.state
    const details = this.props.data
    return (
      <>
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 30,
            paddingBottom: 40,
          }}
        >
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <View
              style={{
                flex: 1,
                height: 80,
                borderRadius: 8,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.lightGaryBackground,
                marginRight: 4,
              }}
            >
              {isLoadingData ? (
                <ActivityIndicator color={color.primeColor} />
              ) : (
                <Text
                  style={{
                    fontFamily: font.bold,
                    marginBottom: 5,
                    color: '#7350AC',
                  }}
                >
                  {inactive || '0'}
                </Text>
              )}
              <Text
                style={{
                  fontFamily: font.reg,
                  color: color.fontblack,
                  fontSize: 10,
                }}
              >
                Inactive Days
              </Text>
            </View>

            <View
              style={{
                ...shadow,
                backgroundColor: '#fff',
                flex: 1,
                height: 80,
                borderRadius: 8,
                marginRight: 4,
                marginLeft: 4,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 80,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: color.lightGaryBackground,
                }}
              >
                {isLoadingData ? (
                  <ActivityIndicator color={'#139CE0'} />
                ) : (
                  <Text
                    style={{
                      fontFamily: font.bold,
                      marginBottom: 5,
                      color: color.secondColor,
                    }}
                  >
                    {last_contacted || '0'}
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: color.fontblack,
                    fontSize: 10,
                  }}
                >
                  Last Contacted
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                height: 80,
                borderRadius: 8,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.lightGaryBackground,
                marginLeft: 4,
              }}
            >
              {isLoadingData ? (
                <ActivityIndicator color={color.primeColor} />
              ) : (
                <Text
                  style={{
                    fontFamily: font.bold,
                    marginBottom: 5,
                    color: '#00B389',
                  }}
                >
                  {interactions || '0'}
                </Text>
              )}
              <Text
                style={{
                  fontFamily: font.reg,
                  color: color.fontblack,
                  fontSize: 10,
                }}
              >
                Interactions
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ visible: true })}
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: font.semi,
                  color: 'rgba(58, 53, 65, 0.87)',
                }}
              >
                {type === 'sms'
                  ? type.toUpperCase()
                  : type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
              </Text>
              <Image
                source={require('assets/img/down-arrow.png')}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  tintColor: 'rgba(58, 53, 65, 0.54)',
                }}
              />
            </TouchableOpacity>
            {type === 'call' ||
            type === 'outgoing' ||
            type === 'incoming' ||
            type === 'email' ||
            type === 'sms' ? (
              <TouchableOpacity
                onPress={() => this.setState({ visiblecall: true })}
                style={{
                  marginLeft: 15,
                  height: 18,
                  width: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('assets/img/exchange.png')}
                  style={{
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                    tintColor: 'rgba(58, 53, 65, 0.54)',
                  }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{ borderWidth: 0.5, borderColor: color.borderColor }} />
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 0,
              marginTop: 5,
            }}
            data={activityList}
            renderItem={({ item, index }) => (
              <View style={{ marginTop: 12 }}>
                <View style={{ paddingHorizontal: 20 }}>
                  {type === 'sms' || type === 'email' ? (
                    <UserEmailSmsList
                      data={item}
                      userData={details}
                      key={index}
                      type={type}
                    />
                  ) : null}

                  {/* Call  */}
                  {type === 'call' ? (
                    <UserCallList data={item} userData={details} key={index} />
                  ) : null}
                  {/* Note  */}
                  {type === 'note' ? (
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                      <View
                        style={{
                          height: 45,
                          width: 45,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
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
                          <Text
                            style={{
                              fontFamily: font.semi,
                              color: color.fontcolor,
                              fontSize: 18,
                            }}
                          >
                            {details?.initials}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 18,
                            width: 18,
                            backgroundColor: color.secondColor,
                            position: 'absolute',
                            bottom: -2,
                            right: -2,
                            borderRadius: 18,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            source={require('assets/img/note.png')}
                            style={{
                              height: '45%',
                              width: '45%',
                              resizeMode: 'contain',
                              tintColor: '#fff',
                            }}
                          />
                        </View>
                      </View>
                      <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontFamily: font.semi,
                            color: color.fontcolor,
                            marginBottom: 5,
                          }}
                        >
                          {item?.description}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontFamily: font.reg,
                              color: 'rgba(58, 53, 65, 0.78)',
                              fontSize: 11.5,
                              marginLeft: 3,
                            }}
                          >
                            {this.utcToLocalCall(item?.time)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}

                  {/* Task  */}
                  {type === 'task' ? (
                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                      <View
                        style={{
                          height: 45,
                          width: 45,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
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
                          <Text
                            style={{
                              fontFamily: font.semi,
                              color: color.fontcolor,
                              fontSize: 18,
                            }}
                          >
                            {details?.initials}
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 18,
                            width: 18,
                            backgroundColor: color.secondColor,
                            position: 'absolute',
                            bottom: -2,
                            right: -2,
                            borderRadius: 18,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            source={require('assets/img/file.png')}
                            style={{
                              height: '45%',
                              width: '45%',
                              resizeMode: 'contain',
                              tintColor: '#fff',
                            }}
                          />
                        </View>
                      </View>
                      <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontFamily: font.semi,
                            color: color.fontcolor,
                            marginBottom: 5,
                          }}
                        >
                          {item?.description}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              fontFamily: font.reg,
                              color: 'rgba(58, 53, 65, 0.78)',
                              fontSize: 11.5,
                              marginLeft: 3,
                            }}
                          >
                            {this.utcToLocalCall(item?.time)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 15 }}>
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
                      <View
                        style={{ height: 50, width: 50, borderRadius: 50 }}
                      />
                      <View
                        style={{ paddingLeft: 18, justifyContent: 'center' }}
                      >
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
            onEndReachedThreshold={0.1}
            onEndReached={() => this.activitiestApi(type)}
            ListFooterComponent={this.renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => this.onRefresh()}
              />
            }
          />
          {visible && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({ visible: false })}
              style={{
                position: 'absolute',
                height: height,
                width: width,
                backgroundColor: '#0000',
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    width: width / 1.3,
                    position: 'absolute',
                    right: 20,
                    top: 130,
                    height: 280,
                  }}
                >
                  <View
                    style={{
                      ...shadow,
                      padding: 25,
                      borderRadius: 8,
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.onPress('call')}
                      style={{
                        paddingBottom: 27,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <IconPhone width={20} />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        Calls
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onPress('email')}
                      style={{
                        paddingBottom: 27,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <IconEmail width={20} />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        Emails
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onPress('sms')}
                      style={{
                        paddingBottom: 27,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <IconMessage width={20} />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        SMS
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onPress('note')}
                      style={{
                        paddingBottom: 27,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <IconNote width={20} />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        Notes
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onPress('task')}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <IconTask width={20} />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        Tasks
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          )}
          {visiblecall && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({ visiblecall: false })}
              style={{
                position: 'absolute',
                height: height,
                width: width,
                backgroundColor: '#0000',
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    width: width / 1.3,
                    position: 'absolute',
                    right: 20,
                    top: 130,
                    height: 130,
                  }}
                >
                  <View
                    style={{
                      ...shadow,
                      padding: 25,
                      borderRadius: 8,
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.onPress(type, 'outgoing')}
                      style={{
                        paddingBottom: 27,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={
                          type === 'email'
                            ? require('assets/img/emailuser.png')
                            : type === 'sms'
                            ? require('assets/img/sms.png')
                            : require('assets/img/call.png')
                        }
                        style={{
                          height: 20,
                          width: 20,
                          resizeMode: 'contain',
                          tintColor: '#3A3541',
                        }}
                      />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        {type === 'sms'
                          ? type.toUpperCase()
                          : type.charAt(0).toUpperCase() +
                            type.slice(1).toLowerCase()}{' '}
                        {type === 'sms' || type === 'email' ? 'Sent' : 'Made'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onPress(type, 'incoming')}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        source={
                          type === 'email'
                            ? require('assets/img/emailuser.png')
                            : type === 'sms'
                            ? require('assets/img/sms.png')
                            : require('assets/img/call.png')
                        }
                        style={{
                          height: 20,
                          width: 20,
                          resizeMode: 'contain',
                          tintColor: '#544F5A',
                        }}
                      />
                      <Text
                        style={{
                          color: '#000926',
                          fontFamily: font.reg,
                          fontSize: 16,
                          textAlign: 'center',
                          marginLeft: 15,
                        }}
                      >
                        {type === 'sms'
                          ? type.toUpperCase()
                          : type.charAt(0).toUpperCase() +
                            type.slice(1).toLowerCase()}{' '}
                        Received
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          )}
        </ScrollView>
      </>
    )
  }
}
