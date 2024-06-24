import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  NativeModules,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { consoleLog } from '@vn.starlingTech/helpers/logHelper'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import ActivityCompany from './ActivityComapny'
import DetailsCompany from './DetailsCompany'
import RelatedCompany from './RelatedCompany'
import Header from '../../Component/Header'
import ModalComponent from '../../Component/ModalComponent'
import { color, font, shadow } from '../../Component/Styles'
import CallModal from '../../Component/UserProfileComponent/CallModal'
import SmsModal from '../../Component/UserProfileComponent/SmsModal'
import { API } from '../../Privet'
const { width, height } = Dimensions.get('window')

const { StatusBarManager } = NativeModules

type State = {
  name: string
  active: string
  visiblelogactivity: boolean
  companyId: string
  detail: any
  nodata: boolean
  callModal: boolean
  smsModal: boolean
  isEditVisible: boolean
  isLoading: boolean
}

export default class CompanyDetails extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      name: '',
      active: 'Details',
      visiblelogactivity: false,
      companyId: this.props?.route?.params?.companyId,
      detail: '',
      nodata: false,
      callModal: false,
      smsModal: false,
      isEditVisible: false,
      isLoading: false,
    }
  }

  async componentDidMount() {
    // consoleLog(this.state, 'state', this.props?.route?.params?.companyId)
    this.companyDetails();
  }

  companyDetails() {
    const { companyId } = this.state
    this.setState({ isLoading: true })
    fetch(`${API.organizations}/${companyId + ''}`, {
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
        if (response?.id) {
          this.setState({ isLoading: false, detail: response })
        } else {
          this.setState({ isLoading: false, nodata: true })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  render() {
    const { detail, active, isLoading, nodata, companyId, isEditVisible } =
      this.state

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Company Details"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
          _onWillFocus={
            companyId ? () => this.companyDetails() : () => console.log('')
          }
          customeRightButton={
            <TouchableOpacity
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              //  onPress={() => this.setState({ isEditVisible: !isEditVisible })}
              onPress={() => {
                this.props.navigation.navigate('AddCompany', { detail: detail })
              }}
            >
              <Image
                source={require('assets/img/dots.png')}
                style={{ resizeMode: 'contain', height: '50%', width: '50%' }}
              />
            </TouchableOpacity>
          }
        />
        {!isLoading ? (
          <View style={{ flex: 1 }}>
            {!nodata ? (
              <ScrollView
                bounces={false}
                contentContainerStyle={{ flexGrow: 1 }}
                stickyHeaderIndices={[1]}
              >
                {/* 0 */}
                <View style={{ backgroundColor: '#fff', paddingTop: 20 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        overflow: 'hidden',
                        backgroundColor: color.borderColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.fontblack,
                          fontSize: 20,
                        }}
                      >
                        {detail?.initials}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 15,
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={{
                          fontFamily: font.semi,
                          fontSize: 20,
                          color: color.fontcolor,
                          marginBottom: 3,
                        }}
                      >
                        {detail?.title}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* 2 Tab */}
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
                          fontFamily:
                            active === 'Details' ? font.semi : font.reg,
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
                          fontFamily:
                            active === 'Activity' ? font.semi : font.reg,
                        }}
                      >
                        Activity
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ active: 'Related' })}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color:
                            active === 'Related'
                              ? color.fontblack
                              : 'rgba(58, 53, 65, 0.68)',
                          fontFamily:
                            active === 'Related' ? font.semi : font.reg,
                        }}
                      >
                        Related
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
                          borderBottomWidth: active === 'Related' ? 2 : 0,
                          flex: 1,
                          marginHorizontal: 20,
                          borderBottomColor: color.secondColor,
                        }}
                      />
                    </View>
                  </View>
                </View>

                {active === 'Details' ? (
                  <DetailsCompany
                    details={detail}
                    callback={() => {
                      this.setState({ callModal: true })
                    }}
                    emailCallback={() => {
                      this.props.navigation.navigate('ComposeMail', {
                        detail: detail,
                      })
                    }}
                  />
                ) : null}
                {active === 'Activity' ? (
                  <ActivityCompany
                    companyId={companyId + ''}
                    data={detail}
                    // smsBack={() => {
                    //   this.setState({ smsModal: true })
                    // }}
                    // emailCallback={() => {
                    //   navigate('ComposeMail', {
                    //     detail: detail,
                    //   })
                    // }}
                    {...this.props}
                  />
                ) : null}
                {active === 'Related' ? (
                  <RelatedCompany companyId={companyId + ''} data={detail} />
                ) : null}
              </ScrollView>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 20,
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
            )}
          </View>
        ) : (
          <SkeletonPlaceholder>
            <View style={{ marginHorizontal: 20 }}>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{ height: 65, width: 65, borderRadius: 65 }} />
                <View
                  style={{
                    paddingLeft: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      width: width / 1.5,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1.5,
                      borderRadius: 2.5,
                      marginTop: 5,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                />
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View
                  style={{
                    height: 45,
                    width: width / 2.5,
                    borderRadius: 8,
                    marginLeft: 0,
                  }}
                />
                <View
                  style={{
                    height: 45,
                    width: width / 2.5,
                    borderRadius: 8,
                    marginLeft: 25,
                  }}
                />
              </View>
              <View style={{ height: 80, borderRadius: 2.5, marginTop: 15 }} />
              <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
              <View style={{ height: 160, borderRadius: 2.5, marginTop: 15 }} />
            </View>
          </SkeletonPlaceholder>
        )}

        {isEditVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ isEditVisible: false })}
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
                  width: 100,
                  position: 'absolute',
                  right: 20,
                  top: StatusBarManager.HEIGHT + 25,
                  height: 60,
                }}
              >
                <View
                  style={{
                    ...shadow,
                    borderRadius: 8,
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingBottom: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('AddCompany', {
                        detail: detail,
                      })
                      this.setState({ isEditVisible: false })
                    }}
                  >
                    <Text
                      style={{
                        color: '#000926',
                        fontFamily: font.reg,
                        fontSize: 16,
                        textAlign: 'center',
                        marginLeft: 20,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        )}

        <CallModal
          visible={this.state.callModal}
          handleClose={() => this.setState({ callModal: false })}
          // image={image}
          phone={detail?.phones?.find((x) => x.type === 'Main')}
          detail={detail}
        />

        <ModalComponent
          isVisible={this.state.smsModal}
          onRequestClose={() => this.setState({ smsModal: false })}
        >
          <SmsModal
            handleClose={() => this.setState({ smsModal: false })}
            // image={image}
            detail={detail}
          />
        </ModalComponent>
      </View>
    )
  }
}
