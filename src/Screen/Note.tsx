import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { utcToLocal } from 'src/helper/timeHelper'
import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import Header from '../Component/Header'
import SnackBar from '../Component/SnackBar'
import { color, font, shadow } from '../Component/Styles'
import { API } from '../Privet'

type State = {
  Id: string
  totalSend: number
  page: number
  noteList: any[]
  isLoading: boolean
  visible: boolean
  noteData: any
}

let currentIndex = 0
export default class Note extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    this.state = {
      Id: this.props?.route?.params?.contactId,
      totalSend: 0,
      page: 0,
      noteList: [],
      isLoading: false,
      visible: false,
      noteData: {},
    }
  }
  snackBar: SnackBar | null = null
  accessToken = useAppStore.getState().accessToken

  async componentDidMount() {
    this.getNote()
  }

  getNote(isReload?: boolean) {
    const { Id, totalSend, page, isLoading, noteList } = this.state
    if (totalSend >= page || isReload) {
      this.setState({ isLoading: true })
      fetch(`${API.activities}?contact_id=${Id}&type=note`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Accept: '*/*',
          access_token: this.accessToken,
        },
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response?.data != null) {
            const TotalFromApi = Math.ceil(
              response.pagination.total_items /
                response.pagination.current_limit,
            )
            if (isLoading || noteList.length <= 0) {
              this.setState({
                isLoading: false,
                noteList: response.data,
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            } else {
              this.setState({
                isLoading: false,
                noteList: [...noteList, ...response.data],
                totalSend: TotalFromApi - 1,
                page: page + 1,
              })
            }
          } else {
            this.setState({ isLoading: false, page: page + 1, noteList: [] })
          }
        })
        .catch((error) => {
          console.log(error)
          this.setState({ isLoading: false, page: page + 1 })
        })
    }
  }

  onRefresh() {
    this.setState({ totalSend: 0, page: 0, isLoading: true }, () =>
      this.getNote(),
    )
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

  willFocus() {
    this.setState({
      Id: this.props?.route?.params?.contactId,
    })
    this.setState({ totalSend: 0, page: 0, isLoading: true }, () =>
      this.getNote(),
    )
  }

  handleDelete() {
    const { noteData } = this.state
    this.setState({ visible: false, isLoading: true })
    fetch(`${API.deleteNotes}/${noteData.object.id}`, {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        // console.log('response', response)
        this.snackBar?.show(response.message)
        if (response?.message != null) {
          this.getNote(true)
        } else {
          this.getNote(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { noteList, isLoading, Id, visible } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Notes"
          Limg={require('assets/img/back.png')}
          Rimg={require('assets/img/addnote.png')}
          Lpress={() => this.props.navigation.goBack()}
          Rpress={() =>
            this.props.navigation.navigate('AddNote', { contactId: Id + '' })
          }
          _onWillFocus={() => this.willFocus()}
        />
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: 20,
              paddingBottom: 30,
            }}
            data={noteList}
            renderItem={({ item }) => {
              if (currentIndex === 4) {
                currentIndex = 0
              }
              currentIndex++
              return (
                <View
                  //style={{ position: 'relative', backgroundColor: currentIndex === 1 ? '#FD99FF' : currentIndex === 2 ? '#FF9E9E' : currentIndex === 3 ? '#91F48F' : '#FFF599', borderRadius: 10, overflow: 'hidden', paddingVertical: 15, paddingLeft: 20, paddingRight: 30, marginBottom: 15 }}
                  style={{
                    position: 'relative',
                    backgroundColor: '#f8f9fd',
                    borderRadius: 10,
                    overflow: 'hidden',
                    paddingVertical: 15,
                    paddingLeft: 20,
                    paddingRight: 30,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: font.reg,
                      fontSize: 17,
                      color: '#000',
                    }}
                  >
                    {item?.object?.object_details?.text + ''}
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.reg,
                      marginTop: 5,
                      color: 'rgba(58, 53, 65, 0.78)',
                      fontSize: 11,
                    }}
                  >
                    {utcToLocal(item?.time)}
                  </Text>

                  <TouchableOpacity
                    style={{ position: 'absolute', right: 15, top: 10 }}
                    onPress={() =>
                      this.setState({ visible: true, noteData: item })
                    }
                  >
                    <Image
                      source={require('assets/img/cancle_icon.png')}
                      style={{
                        width: 13,
                        height: 13,
                        resizeMode: 'contain',
                        tintColor: 'red',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
            ListEmptyComponent={
              <View style={{ flex: 1, marginTop: 15 }}>
                {!isLoading ? (
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
                ) : (
                  <SkeletonPlaceholder>
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                    <View
                      style={{ height: 70, borderRadius: 10, marginBottom: 15 }}
                    />
                  </SkeletonPlaceholder>
                )}
              </View>
            }
            keyExtractor={(item, index) => index + ''}
            onEndReachedThreshold={0.1}
            onEndReached={() => this.getNote()}
            ListFooterComponent={this.renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => this.onRefresh()}
              />
            }
          />
        </View>

        <SnackBar ref={(ref) => (this.snackBar = ref)} />

        <Modal
          transparent={true}
          animationType="fade"
          visible={visible}
          onDismiss={() => this.setState({ visible: false })}
          onRequestClose={() => this.setState({ visible: false })}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({ visible: false })}
            style={{
              flex: 1,
              backgroundColor: '#0002',
              justifyContent: 'center',
              paddingHorizontal: 20,
              alignContent: 'center',
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  borderRadius: 12,
                }}
              >
                <Text style={{ fontFamily: font.reg, color: '#000' }}>
                  Are you sure, you want to delete this note?
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginTop: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ visible: false })}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: font.semi,
                        color: color.secondColor,
                      }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleDelete()}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginLeft: 10,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: color.primeColor,
                    }}
                  >
                    <Text style={{ fontFamily: font.semi, color: '#fff' }}>
                      Yes
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}
