import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { initHeader } from '@vn.starlingTech/api/AppNetworking'

import { color, font } from 'components/Styles'
import { useFcmToken } from 'src/service/user/user'
import { storage, storageKeys } from 'src/storage/storage'
import useAppStore from 'src/store/appStore'
import { User } from 'src/types/user.types'

export type SignedUser = { user: User; accessToken: string }

type Props = {
  item: SignedUser
  singedInUsers: SignedUser[]
  onRemoveItem(singedInUsers: SignedUser[]): void
}

export function AccountItem({ item, singedInUsers, onRemoveItem }: Props) {
  const accessToken = useAppStore((s) => s.accessToken)

  const { mutate: muteFcmToken } = useFcmToken()

  const removeThisUser = () => {
    const temp = singedInUsers.filter((x) => x.accessToken !== item.accessToken)
    storage.set(storageKeys.allUsers, JSON.stringify(temp))
    onRemoveItem(temp)
  }

  const useThisUser = () => {
    initHeader(item.accessToken)
    storage.set(storageKeys.accessToken, item.accessToken)
    useAppStore.setState({ user: item.user, accessToken: item.accessToken })
    const fcmToken = storage.getString(storageKeys.fcmToken)
    if (fcmToken) {
      muteFcmToken(fcmToken)
    }
  }

  const isCurrentUser = item.accessToken === accessToken

  return (
    <View style={isCurrentUser ? styles.selectedCardView : styles.cardView}>
      <Text style={styles.colorName}>{item.user.first_name}</Text>
      <Text>{item.user.email}</Text>
      {!isCurrentUser && (
        <View style={styles.rowView}>
          <TouchableOpacity onPress={removeThisUser} style={styles.activeCard}>
            <Text>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={useThisUser} style={styles.activeCard}>
            <Text>Use</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  activeCard: {
    alignItems: 'center',
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    width: '45%',
  },

  cardView: {
    borderColor: color.iconColor,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  colorName: {
    color: '#0052CB',
    fontFamily: font.semi,
    fontSize: 15,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: 10,
    width: '100%',
  },
  selectedCardView: {
    borderBottomColor: color.green,
    borderColor: color.green,
    borderLeftColor: color.green,
    borderRadius: 10,
    borderRightColor: color.green,

    borderTopColor: color.green,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
})
