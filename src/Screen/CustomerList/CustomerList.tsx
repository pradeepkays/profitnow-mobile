import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import { CustomerListItemSkeleton } from './components/CustomerItem.Skeleton'
import { State } from './CustomerList.types'
import Header from '../../Component/Header'
import Picker from '../../Component/Picker'
import { color, font, shadow } from '../../Component/Styles'
import { API } from '../../Privet'

export default class CustomerList extends Component<AppScreenProps, State> {
  arrayHold: any[] = []
  accessToken = useAppStore.getState().accessToken
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      //Main List
      customerList: [],
      // ContactListFilter
      contactListDropdown: [],
      contactListDropdownName: {},
      // CompanyFilter
      companyList: [],
      companyName: {},
      // tagListFilter
      tagList: [],
      tagListName: [],
      // userListFilter
      userList: [],
      userListName: {},
      // StageListFilter
      stageList: [
        { name: 'leads' },
        { name: 'customers' },
        { name: 'opportunities' },
      ],
      stageListName: [],

      name: '',
      phone: '',

      isLoading: true,
      totalSend: 0,
      page: 0,
      visible: false,
      searchBar: false,
      text: '',
      search: false,
      datatype: '',
    }
  }

  componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'ContactCompany' })
    this.customerListApi()
    this.contactListApi()
    this.companyListApi()
    this.tagListApi()
    this.userApi()
  }

  customerListApi() {
    const {
      totalSend,
      page,
      name,
      companyName,
      tagListName,
      contactListDropdownName,
      isLoading,
      customerList,
      phone,
      stageListName,
      userListName,
    } = this.state

    const taglistSendArr: any[] = []
    if (tagListName.length !== 0) {
      tagListName.forEach((item) => {
        taglistSendArr.push(item.id)
      })
    }
    const taglistSend = taglistSendArr.join(',')

    if (totalSend >= page) {
      this.setState({ isLoading: true })
      fetch(
        `${API.contacts}?limit=5&offset=${page + ''}&status=${
          stageListName?.name ? stageListName.name + '' : 'customers'
        }&stage=&name=${name ? name : ''}&phone=${phone ? phone : ''}&tags=${
          taglistSend ? taglistSend : ''
        }&user=${userListName.id ? userListName.id : ''}&organization=${
          companyName.id ? companyName.id + '' : ''
        }&contactlist=${
          contactListDropdownName.id ? contactListDropdownName.id + '' : ''
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
            if (isLoading || customerList.length <= 0) {
              this.setState({
                isLoading: false,
                customerList: response.data,
                totalSend: TotalFromApi - 1,
                page: page + 5,
              })
              this.arrayHold = response.data
            } else {
              this.setState({
                isLoading: false,
                customerList: [...customerList, ...response.data],
                totalSend: TotalFromApi - 1,
                page: page + 5,
              })
              this.arrayHold = [...customerList, ...response.data]
            }
          } else {
            this.setState({
              isLoading: false,
              page: page + 5,
              customerList: [],
            })
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false, page: page + 5 })
          console.log(error)
        })
    }
  }

  onRefresh() {
    this.setState(
      {
        totalSend: 0,
        page: 0,
        isLoading: true,
        phone: '',
        name: '',
        tagListName: [],
        contactListDropdownName: [],
        companyName: [],
        userListName: [],
        stageListName: [],
      },
      () => this.customerListApi(),
    )
  }

  async onPress(datatype: string) {
    this.setState({ datatype })
    if (datatype === 'Alphabetic') {
      await this.setState({ visible: false, search: true })
      await this.customerListApi()
    }
  }

  search(text: string) {
    this.setState({ text })
    const data = this.arrayHold.filter((item) => {
      const itemData =
        `${item.name} ${item.status} ${item.initials} `.toUpperCase()
      return itemData.indexOf(text.toUpperCase()) > -1
    })
    this.setState({ customerList: data })
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

  // For ContactListFilterAPI
  contactListApi() {
    fetch(`${API.contacts}/lists`, {
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
        if (response?.data != null) {
          this.setState({ contactListDropdown: response.data })
        } else {
          this.setState({ contactList: [] })
        }
      })
      .catch((error) => {
        this.setState({})
        console.log(error)
      })
  }

  // For CompanyList
  companyListApi() {
    fetch(`${API.organizations}?limit=15`, {
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
        if (response?.data != null) {
          this.setState({ companyList: response.data })
        } else {
          this.setState({ companyList: [] })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // tagList
  tagListApi() {
    fetch(`${API.companytags}`, {
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
        if (response?.data != null) {
          this.setState({ tagList: response.data })
        } else {
          this.setState({ tagList: [] })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // UserApi
  userApi() {
    fetch(`${API.companyusers}`, {
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
        if (response?.data != null) {
          this.setState({ userList: response.data })
        } else {
          this.setState({ userList: [] })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  apiCall() {
    this.setState(
      { totalSend: 0, page: 0, visible: false, customerList: [] },
      () => this.customerListApi(),
    )
  }

  render() {
    const {
      customerList,
      stageList,
      stageListName,
      tagListName,
      userList,
      userListName,
      tagList,
      contactListDropdown,
      companyList,
      companyName,
      contactListDropdownName,
      name,
      phone,
      isLoading,
      visible,
      searchBar,
      datatype,
      search,
    } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Contacts"
          Rimg3={require('assets/img/filter.png')}
          Rpress3={() =>
            this.setState({
              visible: !visible,
              phone: '',
              name: '',
              tagListName: [],
              contactListDropdownName: [],
              companyName: [],
              userListName: [],
              stageListName: [],
            })
          }
          Rimg={search ? require('assets/img/searchToday.png') : null}
          Rpress={() => this.setState({ searchBar: true })}
          active
          placeholderType={
            datatype === 'Alphabetic'
              ? 'Alphabetic Filter'
              : datatype === 'phone'
              ? 'Enter Phone'
              : 'Enter Name'
          }
          searchBar={searchBar}
          closeSearchBar={() => {
            this.setState({ text: '', searchBar: false, search: false })
            Keyboard.dismiss()
          }}
          searchFilterFunction={(text) => this.search(text)}
        />
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
            paddingTop: 30,
          }}
          data={customerList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('UserDetails', {
                  id: item.id + '',
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
                {item.img ? (
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
                <CustomerListItemSkeleton />
              )}
            </View>
          }
          keyExtractor={(item, index) => index + ''}
          onEndReachedThreshold={0.1}
          onEndReached={() => this.customerListApi()}
          ListFooterComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => this.onRefresh()}
            />
          }
        />
        <Modal
          animationType="slide"
          transparent
          visible={visible}
          onRequestClose={() => {
            this.setState({ visible: false })
          }}
        >
          <SafeAreaView style={{ backgroundColor: '#0004' }} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ visible: false })}
            style={{ flex: 1, backgroundColor: '#0004', paddingHorizontal: 20 }}
          >
            <TouchableWithoutFeedback>
              <View style={{ marginTop: 40, marginLeft: 30 }}>
                <ScrollView
                  style={{
                    ...shadow,
                    padding: 25,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: '#737A8E',
                      fontFamily: font.reg,
                      marginBottom: 30,
                    }}
                  >
                    Filter By:
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.onPress('Alphabetic')}
                    style={{ paddingBottom: 20 }}
                  >
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Alphabetic Filter
                    </Text>
                  </TouchableOpacity>
                  {/* Phone  */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Phone
                    </Text>
                    <TextInput
                      placeholder="Phone"
                      style={{
                        borderWidth: 1,
                        marginTop: 8,
                        borderColor: color.borderColor,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        fontFamily: font.reg,
                        color: '#000',
                      }}
                      keyboardType="decimal-pad"
                      value={phone}
                      onChangeText={(_phone) =>
                        this.setState({ phone: _phone })
                      }
                    />
                  </View>
                  {/* Name  */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Name
                    </Text>
                    <TextInput
                      placeholder="Name"
                      style={{
                        borderWidth: 1,
                        marginTop: 8,
                        borderColor: color.borderColor,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        fontFamily: font.reg,
                        color: '#000',
                      }}
                      value={name}
                      onChangeText={(_name) => this.setState({ name: _name })}
                    />
                  </View>
                  {/* Tag  */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Tags
                    </Text>
                    <Picker
                      multiple
                      mainViewStyle={{ borderWidth: 1 }}
                      data={tagList}
                      searchBar={true}
                      nameKey="title"
                      selected={tagListName}
                      onSelect={(_tagListName: any) =>
                        this.setState({ tagListName: _tagListName })
                      }
                      placeholder="Tags"
                    />
                  </View>
                  {/* CotactList  */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Contact List
                    </Text>
                    <Picker
                      mainViewStyle={{ borderWidth: 1 }}
                      data={contactListDropdown}
                      searchBar={true}
                      nameKey="title"
                      value={contactListDropdownName.title}
                      onSelect={(_contactListDropdownName: any) =>
                        this.setState({
                          contactListDropdownName: _contactListDropdownName,
                        })
                      }
                      placeholder="Contact List"
                    />
                  </View>
                  {/* Company  */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Company
                    </Text>
                    <Picker
                      mainViewStyle={{ borderWidth: 1 }}
                      data={companyList}
                      searchBar={true}
                      nameKey="title"
                      value={companyName.title}
                      onSelect={(_companyName: any) =>
                        this.setState({ companyName: _companyName })
                      }
                      placeholder="Company"
                    />
                  </View>
                  {/* Assigned User */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Assigned User
                    </Text>
                    <Picker
                      mainViewStyle={{ borderWidth: 1 }}
                      data={userList}
                      searchBar={true}
                      nameKey="title"
                      value={userListName.title}
                      onSelect={(_userListName: any) =>
                        this.setState({ userListName: _userListName })
                      }
                      placeholder="Assigned User"
                    />
                  </View>
                  {/* Stage */}
                  <View style={{ paddingBottom: 10 }}>
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                      }}
                    >
                      Stage
                    </Text>
                    <Picker
                      mainViewStyle={{ borderWidth: 1 }}
                      data={stageList}
                      searchBar={true}
                      value={stageListName.name}
                      onSelect={(_stageListName: any) =>
                        this.setState({ stageListName: _stageListName })
                      }
                      placeholder="Stage"
                    />
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <TouchableOpacity
                      onPress={() => this.apiCall()}
                      style={{
                        backgroundColor: color.secondColor,
                        height: 38,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: '#fff',
                          fontSize: 15,
                        }}
                      >
                        SEARCH
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
            <SafeAreaView />
          </TouchableOpacity>
          <SafeAreaView backgroundColor={color.lableColor} />
        </Modal>
      </View>
    )
  }
}
