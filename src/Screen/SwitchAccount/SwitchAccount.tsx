import React, { Component } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppScreenProps } from 'src/navigation/navigation.types'
import { storage, storageKeys } from 'src/storage/storage'
import useAppStore from 'src/store/appStore'

import { AccountItem, SignedUser } from './components/AccountItem'
import { LoginPrompt } from './components/LoginPrompt'
import Header from '../../Component/Header'
import SnackBar from '../../Component/SnackBar'
import { font } from '../../Component/Styles'

type State = {
  showModal: boolean
  signedInUsers: SignedUser[]
}

export default class SwitchAccount extends Component<AppScreenProps, State> {
  constructor(props: AppScreenProps) {
    super(props)
    const allUsersStr = storage.getString(storageKeys.allUsers) || ''
    const allUsers = JSON.parse(allUsersStr)
    this.state = {
      showModal: false,
      signedInUsers: allUsers,
    }
  }

  snackBar: SnackBar | null = null
  accessToken = useAppStore.getState().accessToken

  showLoginPrompt = () => {
    this.setState({ showModal: true })
  }

  closeLoginPrompt = () => {
    this.setState({ showModal: false })
  }

  onLoginSuccess = () => {
    const allUsersStr = storage.getString(storageKeys.allUsers) || ''
    const allUsers = JSON.parse(allUsersStr) as SignedUser[]
    this.setState({ signedInUsers: allUsers, showModal: false })
  }

  renderItem = ({ item }: ListRenderItemInfo<SignedUser>) => {
    const removeThisUser = (_newSignedUsers: SignedUser[]) => {
      this.setState({ signedInUsers: _newSignedUsers })
    }

    return (
      <AccountItem
        item={item}
        singedInUsers={this.state.signedInUsers}
        onRemoveItem={removeThisUser}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title="Switch Account"
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
          customeRightButton={<RightButton onPress={this.showLoginPrompt} />}
        />

        <FlatList
          data={this.state.signedInUsers}
          renderItem={this.renderItem}
        />

        <LoginPrompt
          signedInUsers={this.state.signedInUsers}
          visible={this.state.showModal}
          onClose={this.closeLoginPrompt}
          onSuccess={this.onLoginSuccess}
        />

        <SnackBar ref={(ref) => (this.snackBar = ref)} />
      </View>
    )
  }
}

const RightButton = ({ onPress }: { onPress(): void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnTxt}>Add</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: '#0052CB',
    borderRadius: 5,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  btnTxt: { color: '#fff', fontFamily: font.semi, fontSize: 15 },
})
