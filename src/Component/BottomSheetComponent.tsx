import React, { ReactNode } from 'react'
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import { color } from './Styles'

type Props = {
  children: ReactNode
  onRequestClose?(): void
  modalContainer?: ViewStyle
  isVisible: boolean
  detailsContainer?: ViewStyle
  animationType?: 'none' | 'slide' | 'fade'
}

const BottomSheetComponent = ({
  children,
  onRequestClose,
  modalContainer,
  isVisible,
  detailsContainer,
  animationType,
}: Props) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onRequestClose}
      animationType={animationType || 'slide'}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onRequestClose}
        style={styles.sheetContainer}
      >
        <TouchableWithoutFeedback>
          <View style={StyleSheet.flatten([styles.container, modalContainer])}>
            <View style={detailsContainer}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}

export default BottomSheetComponent

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
  },
  sheetContainer: {
    backgroundColor: color.lableColor,
    flex: 1,
    justifyContent: 'flex-end',
  },
})
