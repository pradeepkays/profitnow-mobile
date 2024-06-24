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

import HTMLView from 'react-native-htmlview'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import SnackBar from 'components/SnackBar'
import { utcToLocal } from 'src/helper/timeHelper'
import useAppStore from 'src/store/appStore'

import { color, font } from '../../Component/Styles'
import { API } from '../../Privet'

const { width } = Dimensions.get('window')

type Props = {
  id: string
  data: any
  snackBar?: SnackBar | null
}

type State = {
  messageList: any[]
  isLoading: boolean
  isLoadingAdd: boolean
  descriptionText: string
}

export default class MessageTicket extends Component<Props, State> {
  richText = React.createRef<RichEditor>()
  accessToken = useAppStore.getState().accessToken
  constructor(props: Props) {
    super(props)
    this.state = {
      messageList: [1, 2.4],
      isLoading: false,
      isLoadingAdd: false,
      descriptionText: '',
    }
  }

  async componentDidMount() {
    this.messageApi()
  }

  messageApi() {
    this.setState({ isLoading: true })
    fetch(`${API.supportticket}/${this.props.id + ''}/messages`, {
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
        if (response?.data.length !== 0) {
          this.setState({ isLoading: false, messageList: response.data })
        } else {
          this.setState({ isLoading: false })
        }
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  addMessage() {
    const { descriptionText } = this.state
    if (!descriptionText) {
      this.props.snackBar?.show('Enter message!')
    } else {
      this.setState({ isLoadingAdd: true })
      var data = {
        text: descriptionText,
      }
      fetch(`${API.supportticket}/${this.props.id + ''}/messages`, {
        method: 'GET',
        body: JSON.stringify(data),
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response?.id) {
            this.setState({ isLoadingAdd: false, descriptionText: '' })
            this.props.snackBar?.show('Message Added!')
            this.messageApi()
          } else {
            this.setState({ isLoadingAdd: false })
          }
        })
        .catch((error) => {
          this.setState({ isLoadingAdd: false })
          console.log(error)
        })
    }
  }

  render() {
    const { messageList, isLoading, isLoadingAdd, descriptionText } = this.state
    return (
      <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 6,
            borderColor: color.borderColor,
            paddingTop: 10,
            paddingHorizontal: 10,
            height: 150,
          }}
        >
          <RichEditor
            ref={this.richText}
            placeholder="Write message.."
            value={descriptionText}
            onChange={(_desc) => this.setState({ descriptionText: _desc })}
            style={{ flex: 1, color: '#000', fontFamily: font.reg }}
          />
        </View>
        <RichToolbar
          editor={this.richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.heading1,
            actions.insertLink,
            actions.insertBulletsList,
            actions.undo,
            actions.redo,
          ]}
          iconMap={{
            [actions.heading1]: renderIcons,
          }}
        />
        <TouchableOpacity
          onPress={() => this.addMessage()}
          style={{
            flexDirection: 'row',
            backgroundColor: color.secondColor,
            width: '100%',
            height: 38,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          {isLoadingAdd ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text
              style={{
                fontFamily: font.semi,
                color: '#fff',
                fontSize: 15,
                marginLeft: 10,
              }}
            >
              SEND MESSAGES
            </Text>
          )}
        </TouchableOpacity>
        {!isLoading ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 30 }}
            data={messageList}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 15, borderBottomWidth: 0 }}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <Text
                    style={{
                      fontFamily: font.bold,
                      fontSize: 13,
                      color: '#000',
                    }}
                  >
                    {item.sender_name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      fontSize: 13,
                      color: color.fontcolor,
                      marginLeft: 5,
                    }}
                  >
                    {utcToLocal(item.added_time)}
                  </Text>
                </View>
                <HTMLView
                  style={{ overflow: 'hidden' }}
                  value={item.text ? item.text : ''}
                  textComponentProps={{
                    style: { color: '#212121', fontSize: 15 },
                  }}
                />
              </View>
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 25,
                }}
              >
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
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => this.messageApi()}
              />
            }
          />
        ) : (
          <View style={{ flex: 1 }}>
            <SkeletonPlaceholder>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 3,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 2,
                      borderRadius: 2.5,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 3,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 2,
                      borderRadius: 2.5,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 3,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 2,
                      borderRadius: 2.5,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 3,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 2,
                      borderRadius: 2.5,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 3,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 2,
                      borderRadius: 2.5,
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 3,
                      borderRadius: 2.5,
                    }}
                  />
                  <View
                    style={{
                      height: 20,
                      width: width / 1,
                      marginTop: 2,
                      borderRadius: 2.5,
                    }}
                  />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        )}
      </View>
    )
  }
}

const renderIcons = ({ tintColor }: any) => (
  <Text style={{ color: tintColor }}>H1</Text>
)
