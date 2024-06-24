import React, { Component } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import AddSequence from '../Component/AddSequenceModal'
import Header from '../Component/Header'
import ModalComponent from '../Component/ModalComponent'
import SnackBar from '../Component/SnackBar'
import { color, font } from '../Component/Styles'
import { API } from '../Privet'
const { width } = Dimensions.get('window')

const placeHolderItem = [1, 2, 3, 4, 5, 6, 7, 8]

export default class CurrentSequence extends Component<AppScreenProps> {
  accessToken = useAppStore.getState().accessToken
  snackBar: SnackBar | null = null
  state = {
    currentSequenceList: [],
    isLoading: true,
    contactid: '',
    visible: false,
    isLoadingstop: false,
    campaign_id: '',
    addSequence: false,
  }

  async componentDidMount() {
    useAppStore.setState({ isTabBar: true, activeRoute: 'ContactCompany' })
    const contactid = await this.props?.route?.params?.id
    await this.setState({ contactid })
    this.currentSequenceApi()
  }

  currentSequenceApi() {
    const { contactid } = this.state
    this.setState({ isLoading: true })
    fetch(`${API.contacts}/${contactid + ''}/campaigns`, {
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
            currentSequenceList: response.data,
          })
        } else {
          this.setState({ isLoading: false, currentSequenceList: [] })
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error)
      })
  }

  stopCampaign() {
    const { contactid, campaign_id } = this.state
    this.setState({ isLoadingstop: true })
    var data = { campaign_id: campaign_id + '' }
    fetch(`${API.contacts}/${contactid + ''}/campaigns/stop`, {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response?.message != null) {
          this.setState({ isLoadingstop: false, visible: false })
          this.snackBar?.show(response.message)
          this.currentSequenceApi()
        } else {
          this.setState({ isLoadingstop: false, visible: false })
          this.snackBar?.show(response.message)
          this.currentSequenceApi()
        }
      })
      .catch((error) => {
        this.setState({ isLoadingstop: false, visible: false })
        console.log(error)
      })
  }

  renderItems({ item, index }: any) {
    return (
      <TouchableOpacity
        key={index}
        disabled={!item.stop_campaign_available}
        style={styles.containerList}
        onPress={() =>
          this.setState({ visible: true, campaign_id: item.id + '' })
        }
      >
        <View style={styles.leftContainer}>
          <View>
            <Text style={styles.labelName}>Campaign Name</Text>
            <Text style={styles.labelValue} numberOfLines={1}>
              {item.title || ''}
            </Text>
          </View>
          <View>
            <Text style={styles.labelName}>Status</Text>
            <Text style={styles.stausValue} numberOfLines={1}>
              {item.progress || ''}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <View>
            <Text style={(styles.labelName, { color: 'red' })}>
              Stop Campaign
            </Text>
            <Text style={styles.labelValue} numberOfLines={1}>
              {item.stop_campaign_available ? 'true' : 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.labelName}>Date</Text>
            <Text style={styles.labelValue} numberOfLines={1}>
              13 May 2022
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  listEmpty() {
    return (
      <View style={styles.emptyDetails}>
        <Image
          source={require('assets/img/empty.png')}
          style={styles.emptyImage}
        />
        <Text style={styles.noResultText}>Result not found!</Text>
      </View>
    )
  }

  render() {
    const { currentSequenceList, isLoading, visible, isLoadingstop } =
      this.state
    console.log('currentSequenceList', currentSequenceList)
    return (
      <View style={styles.container}>
        <Header
          title="Campaigns"
          Limg={require('assets/img/back.png')}
          Rimg={require('assets/img/plus.png')}
          Rpress={() => {
            this.setState({ addSequence: true })
          }}
          Lpress={() => this.props.navigation.goBack()}
        />

        {currentSequenceList.length !== 0 ? (
          <FlatList
            data={currentSequenceList}
            contentContainerStyle={styles.contentContainerStyle}
            extraData={currentSequenceList}
            renderItem={this.renderItems}
            onEndReachedThreshold={0.9}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.listEmpty()}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => this.currentSequenceApi()}
              />
            }
          />
        ) : (
          <View style={styles.emptycontainer}>
            {!isLoading ? (
              this.listEmpty()
            ) : (
              <SkeletonPlaceholder>
                {placeHolderItem.map((v, index) => (
                  <View style={styles.placeHolderStyle} key={index} />
                ))}
              </SkeletonPlaceholder>
            )}
          </View>
        )}

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
                  Are You Sure You Want To Stop This Campaign?
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
                      style={{ fontFamily: font.semi, color: color.primeColor }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.stopCampaign()}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginLeft: 10,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: color.secondColor,
                    }}
                  >
                    {isLoadingstop ? (
                      <ActivityIndicator color={'#fff'} />
                    ) : (
                      <Text
                        style={{
                          fontFamily: font.semi,
                          color: color.primeColor,
                        }}
                      >
                        Yes
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        <ModalComponent
          isVisible={this.state.addSequence}
          onRequestClose={() => this.setState({ addSequence: false })}
        >
          <AddSequence
            handleClose={() => this.setState({ addSequence: false })}
            contactId={this.state.contactid}
          />
        </ModalComponent>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff4',
    flex: 1,
  },
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
  emptyDetails: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyImage: {
    height: 90,
    width: 90,
  },
  emptycontainer: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 20,
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
  noResultText: {
    color: color.lableColor,
    fontFamily: font.reg,
    marginTop: 10,
    textAlign: 'center',
  },
  placeHolderStyle: {
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    marginRight: 20,
    width: width / 1.1,
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
