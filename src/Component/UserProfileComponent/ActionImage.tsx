import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { color, font } from '../Styles'

const ActionImage = ({ onPress, image, label }: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <Image source={image} style={styles.image} />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  )
}

export default ActionImage

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 46,
    justifyContent: 'center',
  },
  image: {
    height: 36,
    resizeMode: 'contain',
    width: 36,
  },
  label: {
    color: color.primeColor,
    fontFamily: font.reg,
    fontSize: 13,
    marginTop: 7,
  },
})
