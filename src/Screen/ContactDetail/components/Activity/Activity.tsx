import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import moment from 'moment'

import { color, font, shadow } from 'src/Component/Styles'
import { API } from 'src/Privet'
import useAppStore from 'src/store/appStore'

import { ActivityFilter } from './Activity.Filter'
import { ActivityItem } from './Activity.Item'
import { ActivitySkeleton } from './Activity.Skeleton'
import ActivityStats from './Activity.Stats'

type Props = {
  data: any
  id: string
}
const { height, width } = Dimensions.get('window')

type State = {
  id: string
  last_contacted: any
  visible: boolean
  isLoadingData: boolean
  visiblecall: boolean
  inactive: any
  interactions: any
  type: string
  activityList: any[]
  totalSend: number
  page: number
  direction: any
  expandIndex: null
  isLoading?: boolean
}

export default class Activity extends Component<Props, State> {
  accessToken = useAppStore.getState().accessToken

  constructor(props: Props) {
    super(props)
    this.state = {
      id: props.id,
      last_contacted: '',
      visible: false,
      isLoadingData: false,
      visiblecall: false,
      inactive: '',
      interactions: '',
      type: '',
      activityList: [],
      totalSend: 0,
      page: 0,
      direction: '',
      expandIndex: null,
    }
  }

  async componentDidMount() {
    this.activitiestApi('email')
  }

  activitiestApi(type: string, direction?: any) {
    const { totalSend, page, isLoading, activityList } = this.state
    this.setState({
      type: type,
      visible: false,
      visiblecall: false,
      direction: direction,
    })
    if (totalSend >= page) {
      this.setState({ isLoadingData: true, isLoading: true })
      fetch(
        type === 'Support Tickets'
          ? `${API.support}?contact_id=${this.props.id + ''}`
          : `${API.activities}?contact_id=${
              this.props.id + ''
            }&type=${type}&direction=${direction}&limit=15&offset=${page + ''}`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            Accept: '*/*',
            access_token: this.accessToken,
          },
        },
      )
        .then((response) => response.json())
        .then(async (response) => {
          if (response?.data != null) {
            if (type === 'Support Tickets') {
              this.setState({
                isLoading: false,
                isLoadingData: false,
                activityList: response.data,
                totalSend: 0,
                page: 1,
                inactive: '',
                last_contacted: '',
                interactions: '',
              })
            } else {
              const TotalFromapi = Math.ceil(
                response.pagination.total_items /
                  response.pagination.current_limit,
              )
              if (isLoading || activityList.length <= 0) {
                this.setState({
                  isLoading: false,
                  isLoadingData: false,
                  activityList: response.data,
                  totalSend: TotalFromapi - 1,
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
                  totalSend: TotalFromapi - 1,
                  page: page + 1,
                })
              }
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
        .catch(() => {
          this.setState({
            isLoadingData: false,
            isLoading: false,
            page: page + 1,
          })
        })
    }
  }
  bookedCallApi = () => {
    this.setState({ type: 'Booked Calls', visible: false })
    this.setState({ isLoadingData: true, isLoading: true, activityList: [] })
    fetch(`${API.support}?communication/bookedcalls=`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        // console.log('response::', response)
        if (response?.data != null) {
          this.setState({
            isLoading: false,
            isLoadingData: false,
            activityList: response.data,
          })
        } else {
          this.setState({
            isLoading: false,
            isLoadingData: false,
            page: 0,
            activityList: [],
          })
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoadingData: false,
          page: 0,
        })
      })
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

  onPress = (passtype: string, direction?: any) => {
    this.setState(
      {
        totalSend: 0,
        activityList: [],
        page: 0,
        type: '',
        direction: '',
        expandIndex: null,
      },
      () => {
        this.activitiestApi(passtype, direction)
      },
    )
  }

  renderFooter = () => {
    const { totalSend, page, isLoading, type } = this.state
    if (totalSend >= page && !isLoading) {
      return (
        <View
          style={{
            height: 35,
            width: 100,
            borderRadius: 50,
            backgroundColor: '#fff',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 10,
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* {isLoading == true ? (
            <ActivityIndicator color={color.primeColor} style={{}} />
          ) : ( */}
          <TouchableOpacity
            onPress={() => this.activitiestApi(type)}
            style={{ minWidth: 100 }}
          >
            <Text style={{ textAlign: 'center' }}>Load More</Text>
          </TouchableOpacity>
          {/* )} */}
        </View>
      )
    } else {
      // return <ActivityIndicator color={color.primeColor} style={{}} />;
    }
  }

  renderItem = ({ item, index }: ListRenderItemInfo<any>) => {
    const details = this.props.data
    const { type } = this.state
    return (
      <ActivityItem details={details} item={item} index={index} type={type} />
    )
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

    return (
      <>
        <ScrollView
          //   bounces={false}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 30,
            paddingBottom: 40,
          }}
        >
          <ActivityStats
            isLoadingData={isLoadingData}
            inactive={inactive}
            last_contacted={last_contacted}
            interactions={interactions}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
            }}
          >
            <ActivityFilter
              type={type}
              onPress={this.onPress}
              bookedCallApi={this.bookedCallApi}
            />
            {/* <TouchableOpacity
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
                  fontSize: 16,
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
            </TouchableOpacity> */}
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
            renderItem={this.renderItem}
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
                  <ActivitySkeleton />
                )}
              </View>
            }
            keyExtractor={(item, index) => index + ''}
            onEndReachedThreshold={0.1}
            //onEndReached={() => this.activitiestApi(type)}
            ListFooterComponent={this.renderFooter()}
            refreshControl={
              <>
                {type !== 'Booked Calls' && (
                  <RefreshControl
                    refreshing={isLoading ?? false}
                    onRefresh={() => this.onRefresh()}
                  />
                )}
              </>
            }
          />
          {/* <ActivityFilter
            visible={visible}
            onPress={this.onPress}
            bookedCallApi={this.bookedCallApi}
            onClose={() => this.setState({ visible: false })}
          /> */}
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
                        {type === 'sms' || type === 'email' ? 'Sent' : 'Made'}{' '}
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
