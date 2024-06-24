import React from 'react'
import { ViewStyle } from 'react-native'

import { Picker } from '@react-native-picker/picker'
import { AppBlock } from '@starlingtech/element'

import { fonts } from '@vn.starlingTech/theme/theming'

export interface PickerDataType {
  label: string
  value: string
}

interface Props {
  data: PickerDataType[]
  value: string
  setValue: (p: string) => void
  style?: ViewStyle
}

export default function (props: Props) {
  return (
    <AppBlock flex ml={12} background="yellow">
      <Picker
        selectedValue={props.value}
        onValueChange={(itemValue) => props.setValue(itemValue)}
        dropdownIconColor="white"
      >
        {props.data.map((item, index) => (
          <Picker.Item
            label={item.label}
            value={item.value}
            key={index}
            color="#FFF"
            fontFamily={fonts.regular}
          />
        ))}
      </Picker>
    </AppBlock>
  )
}
