import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import moment from 'moment'
import CalendarStrip from 'react-native-calendar-strip'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { utcToLocal } from 'src/helper/timeHelper'
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  taskList: any[]
  isLoading: boolean
  isLoadingindicator: boolean
  contactId: string
  markedDatesArray: any[]
  todayDate: Date
  date?: string
}

const { width } = Dimensions.get('window')

export default class Task extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)

    this.state = {
      taskList: [],
      isLoading: false,
      isLoadingindicator: false,
      contactId: this.props?.route?.params?.contactId,
      markedDatesArray: [],
      todayDate: new Date(),
      date: '',
    }
  }
  accessToken = useAppStore.getState().accessToken

  async componentDidMount() {
    await this.getIndicator()
    await this.taskApi()
  }

  async getIndicator() {
    const { contactId, markedDatesArray } = this.state
    await this.setState({ isLoadingindicator: true, taskList: [] })
    fetch(
      `${API.calendarCustomer}/list?type=task&contact_id=${contactId + ''}`,
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
          if (response?.data.length !== 0) {
            for await (const item of response.data) {
              markedDatesArray.push({
                date: item.time,
                lines: [{ color: color.primeColor }],
              })
            }
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

  async taskApi(date?: string) {
    const { contactId } = this.state
    this.setState({ isLoading: true, taskList: [], date: date })
    const day = moment(date).format('DD')
    const month = moment(date).format('MM')
    const year = moment(date).format('YYYY')

    fetch(
      `${API.calendarCustomer}/list?type=task&contact_id=${
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

  render() {
    const { taskList, date, isLoading, markedDatesArray, todayDate } =
      this.state
    console.log('taskList', taskList)
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F8F9' }}>
        <Header
          title="Tasks"
          SafeAreaViewColor={'#fff4'}
          Limg={require('../assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
          Rimg={require('../assets/img/plus.png')}
          Rpress={() =>
            this.props.navigation.navigate('AddTask', {
              contactId: this.props?.route?.params?.contactId,
            })
          }
        />
        <View style={{ paddingHorizontal: 5, marginTop: -5 }}>
          <CalendarStrip
            scrollable={true}
            showMonth={false}
            selectedDate={todayDate}
            style={{ height: 90 }}
            dateNameStyle={{ color: color.fontcolor, fontFamily: font.reg }}
            dateNumberStyle={{ color: color.fontcolor, fontFamily: font.reg }}
            highlightDateNumberContainerStyle={{
              backgroundColor: color.secondColor,
              borderRadius: 50,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            highlightDateNumberStyle={{ color: '#fff', fontFamily: font.reg }}
            highlightDateNameStyle={{ color: '#000' }}
            markedDates={markedDatesArray}
            onDateSelected={(e: any) => this.taskApi(e._d)}
          />
        </View>
        <FlatList
          contentContainerStyle={{
            paddingTop: 25,
            flexGrow: 1,
            paddingHorizontal: 20,
          }}
          data={taskList}
          renderItem={({ item }) => {
            console.log('item', item)
            return (
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
                    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                    _ _ _ _ _ _ _
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      marginTop: 10,
                      overflow: 'hidden',
                      flexDirection: 'row',
                    }}
                    onPress={() => {
                      // console.log('item', item)
                      this.props.navigation.navigate('TaskDetail', {
                        item,
                      })
                    }}
                  >
                    <View
                      style={{
                        width: 10,
                        backgroundColor: '#4CB200',
                        height: '100%',
                      }}
                    />
                    <View
                      style={{
                        paddingVertical: 15,
                        marginHorizontal: 15,
                        flexDirection: 'row',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#000',
                          marginRight: 20,
                        }}
                      >
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: font.bold,
                          color: color.lableColor,
                          fontSize: 11,
                        }}
                      >
                        {item?.note}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
                    source={require('../assets/img/empty.png')}
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
              onRefresh={() => this.taskApi(date)}
            />
          }
        />
      </View>
    )
  }
}
