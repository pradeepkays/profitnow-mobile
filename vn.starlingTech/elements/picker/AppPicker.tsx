import React from 'react'
import { Platform } from 'react-native'

import AppPickerAndroid from './AppPicker.android'
import AppPickerIos from './AppPicker.ios'

export interface PickerDataType {
  label: string
  value: string
}

interface Props {
  data: PickerDataType[]
  value: string
  setValue: (p: string) => void
}

export default function (props: Props) {
  return Platform.OS === 'android' ? (
    <AppPickerAndroid {...props} />
  ) : (
    <AppPickerIos {...props} />
  )
}
