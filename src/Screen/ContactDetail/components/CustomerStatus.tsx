import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import { appSize, AppText } from '@starlingtech/element'

import IconSwitch from 'assets/svg/IconSwitch'
import { useCustomerStatus } from 'src/service/contact/contact'
import useAppStore from 'src/store/appStore'

type Props = {
  id: string | number
  status: 'Inactive' | 'Active' | undefined
}

export function CustomerStatus({ id, status }: Props) {
  const [isActive, setIsActive] = useState(status === 'Active')

  const dispatchSyncing = useAppStore((s) => s.dispatchSyncing)
  const { mutate: updateStatus, isLoading } = useCustomerStatus()

  useEffect(() => {
    setIsActive(status === 'Active')
  }, [status])

  const onPress = () => {
    updateStatus(id, {
      onSuccess: () => {
        setIsActive(!isActive)
        dispatchSyncing('contacts')
      },
    })
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        minWidth: appSize(70),
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <IconSwitch active={isActive} />
          <AppText weight="500" size={14} ml={4} color="textFocus">
            {isActive ? 'Active' : 'Inactive'}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  )
}
