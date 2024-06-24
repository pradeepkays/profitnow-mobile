import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import ScrollIndicator from 'react-native-custom-scroll-indicator'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font, shadow } from '../Component/Styles'
import { API } from '../Privet'
const { width } = Dimensions.get('window')

type State = {
  companyList: any[]
  page: number
  isLoading: boolean
  nodata: boolean
}

export default class Companies extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      companyList: [],
      page: 0,
      isLoading: true,
      nodata: false,
    }
  }
  async componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'More' })
    await this.companyListApi()
  }

  companyListApi() {
    const { page, isLoading, companyList } = this.state
    this.setState({ isLoading: true })

    fetch(`${API.organizations}?limit=15&offset=${page + ''}`, {
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
        if (response?.data.length !== 0) {
          if (isLoading || companyList.length <= 0) {
            this.setState({
              isLoading: false,
              companyList: response.data,
              page: page + 15,
            })
          } else {
            this.setState({
              isLoading: false,
              companyList: [...companyList, ...response.data],
              page: page + 15,
            })
          }
        } else {
          this.setState({ isLoading: false, nodata: true })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  renderFooter = () => {
    const { nodata } = this.state
    if (!nodata) {
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
      return (
        nodata && (
          <Text
            style={{
              flex: 1,
              fontFamily: font.bold,
              fontSize: 12,
              color: color.primeColor,
              textAlign: 'center',
            }}
          >
            No more data!
          </Text>
        )
      )
    }
  }

  onRefresh() {
    this.setState(
      { page: 0, isLoading: false, nodata: false, companyList: [] },
      () => this.companyListApi(),
    )
  }

  render() {
    const { companyList, isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff4' }}>
        <Header
          title="Companies"
          SafeAreaViewColor={'#fff4'}
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />

        {companyList.length !== 0 ? (
          <ScrollIndicator
            viewBoxStyle={{ alignItems: 'center', marginTop: 20, flex: 1 }}
            scrollViewBoxStyle={{ width: '100%' }}
            indicatorBackgroundStyle={{ backgroundColor: '#D9D9D9' }}
            indicatorStyle={{ width: 60, backgroundColor: 'grey' }}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 15,
                  marginLeft: 15,
                }}
              >
                <Text
                  style={{ width: 180, fontFamily: font.reg, color: '#7E8EAA' }}
                >
                  Company Name
                </Text>
                <Text
                  style={{ width: 150, fontFamily: font.reg, color: '#7E8EAA' }}
                >
                  Email
                </Text>
                <Text
                  style={{ width: 150, fontFamily: font.reg, color: '#7E8EAA' }}
                >
                  Phone
                </Text>
                <Text
                  style={{ width: 200, fontFamily: font.reg, color: '#7E8EAA' }}
                >
                  Address
                </Text>
                <Text
                  style={{ width: 250, fontFamily: font.reg, color: '#7E8EAA' }}
                >
                  Website
                </Text>
              </View>

              <FlatList
                contentContainerStyle={{}}
                data={companyList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('CompanyDetails', {
                        companyId: item?.id ? item.id + '' : '',
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      paddingVertical: 15,
                      paddingHorizontal: 15,
                      marginBottom: 10,
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}
                  >
                    <Text
                      style={{
                        width: 180,
                        fontFamily: font.reg,
                        fontSize: 13,
                        color: '#151C2A',
                      }}
                    >
                      {item?.title || '-'}
                    </Text>
                    <Text
                      style={{
                        width: 150,
                        fontFamily: font.reg,
                        fontSize: 13,
                        color: '#151C2A',
                      }}
                    >
                      {item?.email || '-'}
                    </Text>
                    <Text
                      style={{
                        width: 150,
                        fontFamily: font.reg,
                        fontSize: 13,
                        color: '#151C2A',
                      }}
                    >
                      {item?.phone || '-'}
                    </Text>
                    <Text
                      style={{
                        width: 200,
                        fontFamily: font.reg,
                        fontSize: 13,
                        color: '#151C2A',
                      }}
                    >
                      {item?.address_formatted || '-'}
                    </Text>
                    <Text
                      style={{
                        width: 250,
                        fontFamily: font.reg,
                        fontSize: 13,
                        color: '#151C2A',
                      }}
                    >
                      {item?.website || '-'}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index + ''}
                onEndReachedThreshold={0.1}
                onEndReached={() => this.companyListApi()}
                ListFooterComponent={this.renderFooter}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={() => this.onRefresh()}
                  />
                }
              />
            </View>
          </ScrollIndicator>
        ) : (
          <View style={{ paddingHorizontal: 20, marginTop: 25, flex: 1 }}>
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
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
              </SkeletonPlaceholder>
            )}
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddCompany')
          }}
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            backgroundColor: color.secondColor,
            width: '50%',
            height: 38,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          <Image
            source={require('assets/img/plus.png')}
            style={{
              height: 15,
              width: 15,
              resizeMode: 'contain',
              tintColor: '#ffff',
            }}
          />
          <Text
            style={{
              fontFamily: font.semi,
              color: '#fff',
              fontSize: 15,
              marginLeft: 10,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
