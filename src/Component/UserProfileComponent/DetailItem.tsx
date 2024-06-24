import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { color, font } from '../Styles'

type Props = {
  onPress?(): void
  image: number
  label: string
  value: string | number
  disabled?: boolean
}
const DetailItem = ({ onPress, image, label, value, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.2}
      disabled={disabled || !onPress}
    >
      <Image source={image} style={styles.image} />
      <View style={{ marginLeft: 20 }}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Text style={[styles.value, onPress && { color: color.secondColor }]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default DetailItem

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row', paddingBottom: 20 },
  image: {
    height: 18,
    resizeMode: 'contain',
    tintColor: color.secondColor,
    width: 18,
  },
  label: { color: color.fontblack, fontFamily: font.reg, marginBottom: 5 },
  value: { color: color.fontcolor, fontFamily: font.semi, fontWeight: '600' },
})
