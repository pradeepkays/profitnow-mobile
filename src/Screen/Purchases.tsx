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

import moment from 'moment'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  isLoading: boolean
  totalSend: number
  page: number
  purchaseList: any[]
  id: string
}

const { width } = Dimensions.get('window')

export default class Purchases extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      isLoading: true,
      totalSend: 0,
      page: 0,
      purchaseList: [],
      id: this.props?.route?.params?.id,
    }
  }

  async componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'Search' })
    this.purchaseApi()
  }

  purchaseApi() {
    const { totalSend, page, isLoading, purchaseList, id } = this.state
    if (totalSend >= page) {
      this.setState({ isLoading: true })

      fetch(
        `${API.purchases}?contact_id=${id + ''}&limit=15&offset=${page + ''}`,
        {
          method: 'GET',
          redirect: 'follow',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            access_token: useAppStore.getState().accessToken,
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
            if (isLoading || purchaseList.length <= 0) {
              this.setState({
                isLoading: false,
                purchaseList: response.data,
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            } else {
              this.setState({
                isLoading: false,
                purchaseList: [...purchaseList, ...response.data],
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            }
          } else {
            this.setState({
              isLoading: false,
              page: page + 1,
              purchaseList: [],
            })
          }
        })
        .catch((error) => {
          this.setState({ isLoading: false, page: page + 1 })
          console.log(error)
        })
    }
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

  onRefresh() {
    this.setState({ totalSend: 0, page: 0, isLoading: true }, () =>
      this.purchaseApi(),
    )
  }

  render() {
    const { purchaseList, isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff4' }}>
        <Header
          title="Purchases"
          SafeAreaViewColor={'#fff4'}
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />

        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            marginTop: 30,
            paddingBottom: 50,
          }}
          data={purchaseList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingVertical: 18,
                paddingHorizontal: 15,
                marginBottom: 10,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: '#151C2A',
                    marginBottom: 5,
                  }}
                >
                  {item?.title + ''}
                </Text>
                <Text
                  style={{
                    fontFamily: font.reg,
                    fontSize: 12,
                    color: '#7E8EAA',
                  }}
                >
                  {moment(item?.time).format('MMMM DD,zYYYY')}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      color: '#151C2A',
                      marginBottom: 5,
                    }}
                  >
                    Discount
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      fontSize: 12,
                      color: '#56CA00',
                    }}
                  >
                    {item?.discount + ''}%
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      fontSize: 15,
                      color: color.primeColor,
                      marginBottom: 5,
                    }}
                  >
                    ${item?.price + ''}
                  </Text>
                  {/* <Text style={{ fontFamily: font.reg, fontSize: 12, color: '#7E8EAA' }}>QNT: -</Text> */}
                </View>
              </View>
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
                  <View style={{ justifyContent: 'center' }}>
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 3,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                    <View
                      style={{
                        height: 80,
                        width: width,
                        marginTop: 2,
                        borderRadius: 5,
                        paddingBottom: 10,
                      }}
                    />
                  </View>
                </SkeletonPlaceholder>
              )}
            </View>
          }
          keyExtractor={(item, index) => index + ''}
          onEndReachedThreshold={0.1}
          onEndReached={() => this.purchaseApi()}
          ListFooterComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => this.onRefresh()}
            />
          }
        />
      </View>
    )
  }
}
