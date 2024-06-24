import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import { color, font, shadow } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  text: string
  active: string
  lead: string
  visible: boolean
  isactive: boolean
  leadList: any[]
  isLoading: boolean
  page: number
  nodata: boolean
}

const { width } = Dimensions.get('window')
export default class Lead extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      text: '',
      active: 'Saved',
      lead: 'allleads',
      visible: false,
      isactive: true,
      leadList: [],
      isLoading: true,
      page: 0,
      nodata: false,
    }
  }
  arrayHold: any[] = []

  componentDidMount() {
    this.leadListApi()
  }

  leadListApi() {
    const { page, isLoading, leadList } = this.state
    this.setState({ isLoading: true })
    fetch(`${API.contacts}?limit=15&offset=${page + ''}&status=leads`, {
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
          if (isLoading || leadList.length <= 0) {
            this.setState({
              isLoading: false,
              leadList: response.data,
              page: page + 15,
            })
            this.arrayHold = response.data
          } else {
            this.setState({
              isLoading: false,
              leadList: [...leadList, ...response.data],
              page: page + 15,
            })
            this.arrayHold = [...leadList, ...response.data]
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

  onRefresh() {
    this.setState(
      { page: 0, isLoading: false, nodata: false, leadList: [] },
      () => this.leadListApi(),
    )
  }

  renderFooter = () => {
    const { text, nodata } = this.state
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
            {text ? '' : 'No more data!'}
          </Text>
        )
      )
    }
  }

  search(text: string) {
    this.setState({ text })
    const data = this.arrayHold.filter((item) => {
      const itemData =
        `${item.name} ${item.phone} ${item.initials} `.toUpperCase()
      return itemData.indexOf(text.toUpperCase()) > -1
    })
    this.setState({ leadList: data, isLoading: false, nodata: true })
  }

  async close() {
    await this.setState({ text: '', page: 0, nodata: false, isLoading: false })
    await Keyboard.dismiss()
    await this.leadListApi()
  }

  render() {
    const { leadList, text, visible, active, lead, isactive, isLoading } =
      this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Leads"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingHorizontal: 20,
            borderBottomColor: color.borderColor,
          }}
        >
          <Image
            source={require('assets/img/Search.png')}
            style={{ height: 25, width: 25, tintColor: color.fontcolor }}
          />
          <TextInput
            placeholder="Search Leads"
            placeholderTextColor={color.lableColor}
            style={{
              fontFamily: font.reg,
              color: '#000',
              fontSize: 16,
              paddingLeft: 15,
              flex: 1,
              paddingRight: 10,
            }}
            value={text}
            onFocus={() => {
              this.setState({ isactive: false })
              useAppStore.setState({ isTabBar: false })
            }}
            onBlur={() => {
              this.setState({ isactive: true })
              useAppStore.setState({ isTabBar: true })
            }}
            onChangeText={(_text) => this.search(_text)}
          />
          {text ? (
            <TouchableOpacity
              onPress={() => this.close()}
              style={{
                height: 25,
                width: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('assets/img/cancle_icon.png')}
                style={{
                  height: '60%',
                  width: '60%',
                  tintColor: color.fontcolor,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 50,
          }}
          data={leadList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('UserDetails', {
                  id: item.id + '',
                })
              }}
            >
              <View
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
                      style={{
                        height: '100%',
                        width: '100%',
                        resizeMode: 'contain',
                      }}
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
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
                    <View style={{ height: 50, width: 50, borderRadius: 50 }} />
                    <View style={{ paddingLeft: 18, justifyContent: 'center' }}>
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
          onEndReached={() => this.leadListApi()}
          ListFooterComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => this.onRefresh()}
            />
          }
        />
        {isactive ? (
          <View
            style={{
              paddingTop: 20,
              ...shadow,
              paddingHorizontal: 20,
              paddingBottom: 30,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                flex: 1,
                marginRight: 3,
                backgroundColor: '#9155FD',
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ visible: true })}
                style={{
                  paddingVertical: 8,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('assets/img/Segment.png')}
                  style={{
                    height: 19,
                    width: 19,
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                />
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: '#fff',
                    fontSize: 12,
                    marginLeft: 10,
                  }}
                >
                  Sort
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                overflow: 'hidden',
                flex: 1,
                marginLeft: 3,
                borderColor: color.fontblack,
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ visible: true })}
                style={{
                  paddingVertical: 8,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={require('assets/img/FilterList.png')}
                  style={{ height: 19, width: 19, resizeMode: 'contain' }}
                />
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: color.fontblack,
                    fontSize: 12,
                    marginLeft: 10,
                  }}
                >
                  Sort
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <Modal
          animationType="slide"
          transparent
          visible={visible}
          onRequestClose={() => {
            this.setState({ visible: false })
          }}
        >
          <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: color.lableColor }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <SafeAreaView />
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.setState({ visible: false })}
                style={{ height: '100%', width: '100%', position: 'absolute' }}
              />
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: '#fff',
                    overflow: 'scroll',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                >
                  {/* Header */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ visible: false })}
                      style={{
                        width: 90,
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: color.primeColor,
                          fontFamily: font.reg,
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        flex: 1,
                        color: color.fontblack,
                        fontFamily: font.semi,
                        fontSize: 16,
                        textAlign: 'center',
                      }}
                    >
                      Filter
                    </Text>
                    <TouchableOpacity
                      onPress={() => null}
                      style={{
                        width: 90,
                        height: 45,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: color.primeColor,
                          fontFamily: font.reg,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ height: 50, flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => this.setState({ active: 'Custom' })}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color:
                            active === 'Custom'
                              ? color.fontblack
                              : 'rgba(58, 53, 65, 0.68)',
                          fontFamily:
                            active === 'Custom' ? font.semi : font.reg,
                        }}
                      >
                        Custom
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ active: 'Saved' })}
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color:
                            active === 'Saved'
                              ? color.fontblack
                              : 'rgba(58, 53, 65, 0.68)',
                          fontFamily: active === 'Saved' ? font.semi : font.reg,
                        }}
                      >
                        Saved
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        borderBottomWidth: 2,
                        flex: 1,
                        borderBottomColor:
                          active === 'Custom' ? '#FFB400' : color.borderColor,
                      }}
                    />
                    <View
                      style={{
                        borderBottomWidth: 2,
                        flex: 1,
                        borderBottomColor:
                          active === 'Saved' ? '#FFB400' : color.borderColor,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 10,
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      paddingHorizontal: 20,
                      borderBottomColor: color.borderColor,
                    }}
                  >
                    <Image
                      source={require('assets/img/Search.png')}
                      style={{
                        height: 25,
                        width: 25,
                        tintColor: color.fontcolor,
                      }}
                    />
                    <TextInput
                      placeholder="Search Leads"
                      placeholderTextColor={color.lableColor}
                      style={{
                        fontFamily: font.reg,
                        color: '#000',
                        fontSize: 16,
                        paddingLeft: 15,
                        flex: 1,
                        paddingRight: 10,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ text: '' })
                        Keyboard.dismiss()
                      }}
                      style={{
                        height: 25,
                        width: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        source={require('assets/img/cancle_icon.png')}
                        style={{
                          height: '60%',
                          width: '60%',
                          tintColor: color.fontcolor,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                  >
                    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Private
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.setState({ lead: 'allleads' })}
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: font.semi,
                            color:
                              lead === 'allleads'
                                ? color.primeColor
                                : color.fontblack,
                            fontSize: 16,
                          }}
                        >
                          All Leads
                        </Text>
                        {lead === 'allleads' ? (
                          <Image
                            source={require('assets/img/rightprime.png')}
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: 'contain',
                              marginRight: 25,
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ lead: 'mylead' })}
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: font.semi,
                            color:
                              lead === 'mylead'
                                ? color.primeColor
                                : color.fontblack,
                            fontSize: 16,
                          }}
                        >
                          My Leads
                        </Text>
                        {lead === 'mylead' ? (
                          <Image
                            source={require('assets/img/rightprime.png')}
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: 'contain',
                              marginRight: 25,
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                      <Text
                        style={{
                          fontFamily: font.reg,
                          color: color.fontcolor,
                          fontSize: 12,
                          paddingBottom: 10,
                        }}
                      >
                        Public
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.setState({ lead: 'newlead' })}
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: font.semi,
                            color:
                              lead === 'newlead'
                                ? color.primeColor
                                : color.fontblack,
                            fontSize: 16,
                          }}
                        >
                          New Leads
                        </Text>
                        {lead === 'newlead' ? (
                          <Image
                            source={require('assets/img/rightprime.png')}
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: 'contain',
                              marginRight: 25,
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ lead: 'noresponse' })}
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: font.semi,
                            color:
                              lead === 'noresponse'
                                ? color.primeColor
                                : color.fontblack,
                            fontSize: 16,
                          }}
                        >
                          No Response
                        </Text>
                        {lead === 'noresponse' ? (
                          <Image
                            source={require('assets/img/rightprime.png')}
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: 'contain',
                              marginRight: 25,
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ lead: 'notinterested' })}
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: font.semi,
                            color:
                              lead === 'notinterested'
                                ? color.primeColor
                                : color.fontblack,
                            fontSize: 16,
                          }}
                        >
                          Not Interested
                        </Text>
                        {lead === 'notinterested' ? (
                          <Image
                            source={require('assets/img/rightprime.png')}
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: 'contain',
                              marginRight: 25,
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.setState({ lead: 'openlead' })}
                        style={{ flexDirection: 'row', paddingVertical: 10 }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: font.semi,
                            color:
                              lead === 'openlead'
                                ? color.primeColor
                                : color.fontblack,
                            fontSize: 16,
                          }}
                        >
                          Open Leads
                        </Text>
                        {lead === 'openlead' ? (
                          <Image
                            source={require('assets/img/rightprime.png')}
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: 'contain',
                              marginRight: 25,
                            }}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                  <SafeAreaView />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAwareScrollView>
        </Modal>
      </View>
    )
  }
}
