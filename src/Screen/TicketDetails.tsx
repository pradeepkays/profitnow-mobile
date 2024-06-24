import React, { Component } from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import ActivityTicket from './TicketDetail/ActivityTicket'
import DetailsTicket from './TicketDetail/DetailsTicket'
import MessageTicket from './TicketDetail/MessageTicket'
import Header from '../Component/Header'
import SnackBar from '../Component/SnackBar'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  active: string
  id: string
  detail: any
  isLoading: boolean
}

const { width } = Dimensions.get('window')

export default class TicketDetails extends Component<AppScreenProps, State> {
  snackBar: SnackBar | null = null
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      active: 'Details',
      id: this.props?.route?.params?.id,
      detail: {},
      isLoading: true,
    }
  }

  async componentDidMount() {
    this.detailsApi()
  }

  detailsApi() {
    const { id } = this.state
    this.setState({ isLoading: true })
    fetch(`${API.supportticket}/${id + ''}`, {
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
        console.log(response)
        if (response?.id) {
          this.setState({ isLoading: false, detail: response })
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
    const { active, id, detail, isLoading } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <Header
          title="Ticket Details"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />

        {!isLoading ? (
          <ScrollView
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={[0]}
          >
            {/* 0 Tab */}
            <View style={{ backgroundColor: '#fff' }}>
              <View style={{ height: 50, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => this.setState({ active: 'Details' })}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        active === 'Details'
                          ? color.fontblack
                          : 'rgba(58, 53, 65, 0.68)',
                      fontFamily: active === 'Details' ? font.semi : font.reg,
                    }}
                  >
                    Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ active: 'Activity' })}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        active === 'Activity'
                          ? color.fontblack
                          : 'rgba(58, 53, 65, 0.68)',
                      fontFamily: active === 'Activity' ? font.semi : font.reg,
                    }}
                  >
                    Activity
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ active: 'MessageTicket' })}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        active === 'MessageTicket'
                          ? color.fontblack
                          : 'rgba(58, 53, 65, 0.68)',
                      fontFamily:
                        active === 'MessageTicket' ? font.semi : font.reg,
                    }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    flex: 1,
                    borderBottomColor: color.borderColor,
                  }}
                />
                <View style={{ flexDirection: 'row', marginTop: -5 }}>
                  <View
                    style={{
                      borderBottomWidth: active === 'Details' ? 2 : 0,
                      flex: 1,
                      marginHorizontal: 20,
                      borderBottomColor: color.secondColor,
                    }}
                  />
                  <View
                    style={{
                      borderBottomWidth: active === 'Activity' ? 2 : 0,
                      flex: 1,
                      marginHorizontal: 20,
                      borderBottomColor: color.secondColor,
                    }}
                  />
                  <View
                    style={{
                      borderBottomWidth: active === 'MessageTicket' ? 2 : 0,
                      flex: 1,
                      marginHorizontal: 20,
                      borderBottomColor: color.secondColor,
                    }}
                  />
                </View>
              </View>
            </View>

            {active === 'Details' ? <DetailsTicket data={detail} /> : null}
            {active === 'Activity' ? <ActivityTicket id={id + ''} /> : null}
            {active === 'MessageTicket' ? (
              <MessageTicket
                id={id + ''}
                data={detail}
                snackBar={this.snackBar}
              />
            ) : null}
          </ScrollView>
        ) : (
          <SkeletonPlaceholder>
            <View style={{ marginHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View
                  style={{
                    height: 50,
                    width: width / 4,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 4,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
                <View
                  style={{
                    height: 50,
                    width: width / 4,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
              </View>
              <View style={{ height: 80, borderRadius: 2.5, marginTop: 15 }} />
              <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
              <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
              <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
            </View>
          </SkeletonPlaceholder>
        )}
        <SnackBar ref={(ref) => (this.snackBar = ref)} />
      </View>
    )
  }
}
