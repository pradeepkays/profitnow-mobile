import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { Picker } from '@react-native-picker/picker'
import { AppBlock, AppText } from '@starlingtech/element'
import ReactNativeModal from 'react-native-modal'

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
  const [visible, setVisible] = useState(false)

  const onToggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <>
      <TouchableOpacity onPress={onToggleVisible}>
        <AppText>{props.value}</AppText>
      </TouchableOpacity>

      <ReactNativeModal
        isVisible={visible}
        useNativeDriver
        onBackButtonPress={onToggleVisible}
        onBackdropPress={onToggleVisible}
        hideModalContentWhileAnimating
        style={styles.modal}
      >
        <AppBlock background={'#f0f0f0'}>
          <AppBlock row justifyContent="space-between" padding={16}>
            <AppText size={16} color={'black'}>
              Cancel
            </AppText>
            <AppText size={16} weight="500" primary>
              Done
            </AppText>
          </AppBlock>
          <Picker
            selectedValue={props.value}
            onValueChange={(itemValue) => props.setValue(itemValue)}
          >
            {props.data.map((item, index) => (
              <Picker.Item label={item.label} value={item.value} key={index} />
            ))}
          </Picker>
        </AppBlock>
      </ReactNativeModal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: { justifyContent: 'flex-end', margin: 0 },
})
