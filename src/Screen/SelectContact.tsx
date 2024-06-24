import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import SnackBar from '../Component/SnackBar'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'
const { width } = Dimensions.get('window')

type State = {
  text: string
  checkindex: any
  isSearchbar: boolean
  category: { name: string; img: number }[]
  searchList: any[]
  isLoading: boolean
  totalSend: number
  page: number
  istrue: boolean
  isAll: boolean
  type: string
  date: string
  reminder: any
}

export default class SelectContact extends Component<AppScreenProps, State> {
  arrayHold: any[]
  snackbar: SnackBar | null = null

  accessToken = useAppStore.getState().accessToken

  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      text: '',
      checkindex: null,
      isSearchbar: true,
      category: [
        { name: 'contacts', img: require('assets/img/People.png') },
        { name: 'leads', img: require('assets/img/lead.png') },
      ],
      searchList: [],
      isLoading: true,
      totalSend: 0,
      page: 0,
      istrue: false,
      isAll: true,
      type: '',
      date: '',
      reminder: '',
    }
    this.arrayHold = []
  }
  async componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'Search' })
    const stepsValue = await this.props?.route?.params?.activeSteps
    if (stepsValue && stepsValue === 'contacts') {
      this.setState({ isAll: false })
      // this.navigation(this.state.category[0], 0, null)
    } else {
      await this.customerList('all', true)
    }
  }

  checkData() {
    const { date, text } = this.state
    if (!date) {
      console.log('date not found')
      this.snackbar?.show('Select Due Date.')
    } else if (!text) {
      this.snackbar?.show('Enter Note.')
    } else {
      this.createTask()
    }
  }

  createTask() {
    const { date, text, reminder } = this.state
    console.log('date', date)
    const contactId = this.props?.route?.params?.contactId

    console.log('contactId', contactId)
    const data = {
      time_scheduled: moment(date).format(),
      text,
      reminder: reminder.id,
    }
    console.log('data', data)
    fetch(`${API.createTask}/${contactId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response && response.id) {
          console.log('response', response)
          Alert.alert('Success', 'Task Added Successfully', [
            {
              text: 'OK',
              onPress: () => {
                //this.props.navigation.goBack()
              },
            },
          ])
        } else {
          this.snackbar?.show(response.message)
        }
      })
      .catch((error) => {
        console.log('error:: ', error)
      })
  }
  search(text: string) {
    this.setState({ text })
    this.setState({ isLoading: true })
    fetch(`${API.contacts}?name=${text}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        console.log('test', text)
        console.log('ehaeae', response)
        if (response?.data != null) {
          //   if (searchList.length <= 0) {
          this.setState({
            isLoading: false,
            searchList: response.data,
            totalSend: response.pagination.total_items,
          })
          this.arrayHold = response.data
        }
        // } else {
        //   this.setState({
        //     isLoading: false,

        //     searchList: [],
        //   });
        // }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  customerList(type: string, isReload?: boolean) {
    const { totalSend, page, searchList } = this.state
    this.setState({ type: type })
    const pageValue = isReload ? 0 : page
    if (totalSend >= pageValue) {
      this.setState({ isLoading: true })
      fetch(
        `${API.contacts}?limit=15&offset=${pageValue + ''}&status=${
          type === 'all' ? '' : type
        }&string_beginning=&phone=`,
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
            if (searchList.length <= 0 || isReload) {
              this.setState({
                isLoading: false,
                searchList: response.data,
                totalSend: response.pagination.total_items,
                page: pageValue + 15,
              })
              this.arrayHold = response.data
            } else {
              this.setState({
                isLoading: false,
                searchList: [...searchList, ...response.data],
                totalSend: response.pagination.total_items,
                page: pageValue + 15,
              })
              this.arrayHold = [...searchList, ...response.data]
            }
          } else {
            this.setState({
              isLoading: false,
              page: pageValue + 15,
              searchList: [],
            })
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false, page: pageValue + 15 })
          console.log(error)
        })
    }
  }
  async willFocus() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'Search' })
    const stepsValue = await this.props?.route?.params?.activeSteps
    if (stepsValue && stepsValue === 'contacts') {
      this.setState({ isAll: false })
      // this.navigation(this.state.category[0], 0, null)
    } else {
      await this.customerList('all', true)
    }
  }
  render() {
    const { text, searchList, isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f6fa' }}>
        <Header
          title="Select Contact"
          SafeAreaViewColor={'#f3f6fa'}
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        <View style={{ marginTop: 20 }} />
        <Header
          searchBar
          text={text}
          placeholderType={'Search contact'}
          closeSearchBar={() => {
            this.setState({ text: '' })
            Keyboard.dismiss()
            // this.onRefresh()
          }}
          _onWillFocus={() => this.willFocus()}
          searchFilterFunction={(_text) => this.search(_text)}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              marginHorizontal: 20,
              marginTop: 30,
              paddingBottom: 25,
            }}
            data={searchList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  // this.props.navigation.navigate("UserDetails", {
                  //   id: item.id + "",
                  // });
                  //  console.log("item",item.id)
                  this.props.navigation.navigate('AddTask', {
                    contactId: item.id,
                  })
                }}
                style={{
                  flexDirection: 'row',
                  marginBottom: 15,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color.selectBgColor,
                    borderRadius: 45,
                    overflow: 'hidden',
                  }}
                >
                  {item?.img ? (
                    <Image
                      source={item.img}
                      style={{ height: '100%', width: '100%' }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontFamily: font.semi,
                        color: color.fontblack,
                        fontSize: 15,
                      }}
                    >
                      {item?.initials}
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.semi,
                    marginLeft: 15,
                    fontSize: 14,
                    color: color.fontcolor,
                  }}
                >
                  {item?.name}
                </Text>
              </TouchableOpacity>
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
            onEndReached={() => this.customerList(this.state.type)}
            // ListFooterComponent={this.renderFooter}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={isLoading}
            //     onRefresh={() => this.onRefresh()}
            //   />
            // }
          />
        </KeyboardAwareScrollView>
        <SnackBar ref={(ref) => (this.snackbar = ref)} />
      </View>
    )
  }
}
