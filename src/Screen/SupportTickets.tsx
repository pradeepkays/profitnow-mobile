import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  supportticketsList: any[]
  isLoading: boolean
  id: string
}

const { width } = Dimensions.get('window')
export default class SupportTickets extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      supportticketsList: [],
      isLoading: true,
      id: this.props?.route?.params?.id,
    }
  }

  accessToken = useAppStore.getState().accessToken

  async componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'Search' })
    this.supportticketsApi()
  }

  renderItems({ item, index }: any) {
    return (
      <TouchableOpacity
        key={index}
        style={styles.containerList}
        onPress={() =>
          this.props.navigation.navigate('TicketDetails', { id: item.id + '' })
        }
      >
        <View style={styles.leftContainer}>
          <View>
            <Text style={styles.labelName}>Ticket Number</Text>
            <Text style={styles.labelValue} numberOfLines={1}>
              {item?.index + ''}
            </Text>
          </View>
          <View>
            <Text style={styles.labelName}>Subject</Text>
            <Text style={styles.stausValue} numberOfLines={1}>
              {item?.subject + ''}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <View>
            <Text style={[styles.labelName, { color: 'red' }]}>Priority</Text>
            <Text style={styles.labelValue} numberOfLines={1}>
              {item?.priority?.title}
            </Text>
          </View>
          <View>
            <Text style={styles.labelName}>Client</Text>
            <Text style={styles.labelValue} numberOfLines={1}>
              {item?.assigned_contact?.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  supportticketsApi() {
    const { id } = this.state
    this.setState({ isLoading: true })
    fetch(`${API.support}?contact_id=${id + ''}`, {
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
          this.setState({
            isLoading: false,
            supportticketsList: response.data,
          })
        } else {
          this.setState({ isLoading: false, supportticketsList: [] })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  render() {
    const { supportticketsList, isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff4' }}>
        <Header
          title="Support Tickets"
          SafeAreaViewColor={'#fff4'}
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        {supportticketsList.length !== 0 ? (
          <FlatList
            data={supportticketsList}
            contentContainerStyle={styles.contentContainerStyle}
            onEndReachedThreshold={0.9}
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            renderItem={this.renderItems}
            keyExtractor={(item, index) => index + ''}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => this.supportticketsApi()}
              />
            }
          />
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
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
                    width: width / 1.1,
                    marginRight: 20,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 125,
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
          onPress={() => this.props.navigation.navigate('AddTicket')}
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            backgroundColor: color.primeColor,
            width: '50%',
            height: 38,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontFamily: font.semi,
              color: '#fff',
              fontSize: 15,
              marginLeft: 10,
            }}
          >
            Create Ticket
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerList: {
    backgroundColor: color.whiteColor,
    borderRadius: 10,
    flexDirection: 'row',
    height: 125,
    marginTop: 13,
    width: '100%',
  },
  contentContainerStyle: {
    paddingHorizontal: 23,
    paddingVertical: 20,
    width: '100%',
  },
  labelName: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    fontSize: 11,
  },
  labelValue: {
    color: 'rgba(21, 28, 42, 0.87)',
    fontFamily: font.semi,
    fontSize: 12,
    marginTop: 5,
  },
  leftContainer: {
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingVertical: 17,
    width: '55%',
  },
  rightContainer: {
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingVertical: 17,
    width: '45%',
  },
  stausValue: {
    color: '#0081B5',
    fontFamily: font.semi,
    fontSize: 12,
    marginTop: 5,
  },
})
