import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native'

import moment from 'moment'
import { Calendar } from 'react-native-calendars'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { utcToLocal } from 'src/helper/timeHelper'
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import { DayComponent } from './components/DayComponent'
import Header from '../../Component/Header'
import { color, font, shadow } from '../../Component/Styles'
import { API } from '../../Privet'
const { width } = Dimensions.get('window')

type State = {
  taskList: any[]
  isLoading: boolean
  clalendarShow: any[]
  selecteDate: string
  contactId: string
  markedDatesArray: any[]
  indicatorList: any[]
  newArray: any[]
  date: any
  isLoadingindicator?: boolean
}

export default class CalendarScreen extends Component<AppScreenProps, State> {
  accessToken = useAppStore.getState().accessToken
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      taskList: [],
      isLoading: false,
      clalendarShow: [],
      selecteDate: moment().format('YYYY-MM-DD'),
      contactId: this.props?.route?.params?.contactId,
      markedDatesArray: [],
      indicatorList: [],
      newArray: [],
      date: '',
    }
  }

  async componentDidMount() {
    await this.calendarApi(new Date())
    await this.getIndicator()
  }

  async getIndicator() {
    const { contactId } = this.state
    this.setState({ isLoadingindicator: true, taskList: [] })
    fetch(
      `${API.calendarCustomer}/list?type=calendar&contact_id=${contactId + ''}`,
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
        if (response?.data) {
          if (response?.data.length) {
            const data = response.data.reduce((result: any, item: any) => {
              const resultItem = {
                time: item.time,
                data: [
                  {
                    contact_id: item.contact_id,
                    name: item.name,
                    note: item.locanotetion,
                    time: item.time,
                  },
                ],
              }
              const resultDateList = result.find(
                (i: any) => i.time === item.time,
              )

              if (resultDateList) {
                resultDateList.data.push(resultItem)
              } else {
                result.push({
                  time: item.time,
                  data: [resultItem],
                })
              }
              return result
            }, [])
            this.setState({ indicatorList: data })
            this.setState({ isLoadingindicator: false })
          } else {
            this.setState({ isLoadingindicator: false })
          }
        } else {
          this.setState({ isLoadingindicator: false })
        }
      })
      .catch((error) => {
        this.setState({ isLoadingindicator: false })
        console.log(error)
      })
  }

  async calendarApi(date: any) {
    const { contactId } = this.state
    this.setState({ isLoading: true, taskList: [], date: date })
    const day = moment(date.dateString).format('DD')
    const month = moment(date.dateString).format('MM')
    const year = moment(date.dateString).format('YYYY')
    console.log(
      'here is new data::',
      `${API.calendarCustomer}/list?type=calendar&contact_id=${
        contactId + ''
      }&day=${day}&month=${month}&year=${year}`,
    )
    fetch(
      `${API.calendarCustomer}/list?type=calendar&contact_id=${
        contactId + ''
      }&day=${day}&month=${month}&year=${year}`,
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
        if (response?.data) {
          console.log('......>', response?.data)
          if (response?.data.length !== 0) {
            this.setState({
              isLoading: false,
              taskList: response?.data?.reverse(),
            })
          } else {
            this.setState({ isLoading: false })
          }
        } else {
          this.setState({ isLoading: false })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  getDateIndicater(date: string) {
    return (
      this.state?.indicatorList?.find(
        (item) => utcToLocal(item.time, 'YYYY-MM-DD') === date,
      ) || {}
    )
  }

  render() {
    const { taskList, isLoading, date, selecteDate } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F8F9' }}>
        <Header
          title="Calender"
          //active
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
          containerStyle={{ backgroundColor: '#F8F8F9' }}
        />
        <StatusBar backgroundColor={'#F8F8F9'} barStyle="dark-content" />
        <SafeAreaView
          style={{
            backgroundColor: '#F8F8F9',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        />
        <View
          style={{
            overflow: 'hidden',
            paddingBottom: 10,
            marginBottom: -10,
            zIndex: 100,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingBottom: 15,
              ...shadow,
              backgroundColor: '#F8F8F9',
            }}
          >
            <Calendar
              // current={new Date()}
              markingType={'multi-dot'}
              style={{ backgroundColor: '#F8F8F9' }}
              theme={{
                todayTextColor: color.secondColor,
                calendarBackground: '#F8F8F9',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 18,
                textDayFontSize: 15,
                dayTextColor: '#222B45',
                arrowColor: '#212121',
                monthTextColor: '#212121',
                textDisabledColor: '#8F9BB3',
                textSectionTitleColor: '#8F9BB3',
                selectedDayBackgroundColor: 'red',
                selectedDayTextColor: 'green',
              }}
              // eslint-disable-next-line react/no-unstable-nested-components
              dayComponent={({ date: _date, state }: any) => {
                return (
                  <DayComponent
                    date={_date}
                    state={state}
                    selecteDate={selecteDate}
                    getData={this.getDateIndicater}
                    onPress={() => {
                      this.setState({ selecteDate: date.dateString }, () =>
                        this.calendarApi(date),
                      )
                    }}
                  />
                )
              }}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={{
            paddingTop: 20,
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          data={taskList}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 0 }}>
              <Text
                style={{
                  fontFamily: font.reg,
                  color: '#212121',
                  marginTop: 10,
                }}
              >
                {utcToLocal(item?.time, 'hh:mm A')}
              </Text>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text
                  ellipsizeMode="clip"
                  numberOfLines={1}
                  style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                >
                  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                  _ _ _ _ _ _
                </Text>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    marginTop: 10,
                    overflow: 'hidden',
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      backgroundColor: '#4CB200',
                      height: '100%',
                    }}
                  />
                  <View style={{ paddingVertical: 15, marginHorizontal: 15 }}>
                    <Text style={{ fontFamily: font.semi, color: '#000' }}>
                      {item?.note}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
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
                    <View style={{ height: 60, width: 60, borderRadius: 10 }} />
                    <View style={{ paddingLeft: 18 }}>
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2.5,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10 }} />
                    <View style={{ paddingLeft: 18 }}>
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2.5,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10 }} />
                    <View style={{ paddingLeft: 18 }}>
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2.5,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10 }} />
                    <View style={{ paddingLeft: 18 }}>
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2.5,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10 }} />
                    <View style={{ paddingLeft: 18 }}>
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2.5,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ height: 60, width: 60, borderRadius: 10 }} />
                    <View style={{ paddingLeft: 18 }}>
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 15,
                          marginTop: 5,
                          width: width / 2.5,
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
              onRefresh={() => this.calendarApi(date)}
            />
          }
        />
      </View>
    )
  }
}
