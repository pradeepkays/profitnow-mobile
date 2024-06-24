import React, { ReactNode } from 'react'
import { Modal, StyleSheet, View, ViewStyle } from 'react-native'

import { color } from './Styles'

type Props = {
  children: ReactNode
  onRequestClose?(): void
  modalContainer?: ViewStyle
  isVisible: boolean
  contentStyle?: ViewStyle
  detailsContainer?: ViewStyle
}

const ModalComponent = ({
  children,
  onRequestClose,
  modalContainer,
  isVisible,
  contentStyle,
  detailsContainer,
}: Props) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={onRequestClose}
      animationType="slide"
    >
      <View style={StyleSheet.flatten([styles.flOne, contentStyle])}>
        <View style={StyleSheet.flatten([styles.container, modalContainer])}>
          <View style={detailsContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalComponent

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
  },
  flOne: {
    backgroundColor: color.lableColor,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
})
