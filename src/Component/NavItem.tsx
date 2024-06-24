import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { font } from './Styles'

const NavItem = ({ onPress, image, label, activeRoute, checkRoute }: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={image}
        style={[
          styles.image,
          { tintColor: activeRoute === checkRoute ? '#fff' : '#fff7' },
        ]}
      />
      {label && (
        <Text
          style={[
            styles.label,
            { color: activeRoute === checkRoute ? '#fff' : '#fff7' },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default NavItem

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1 },
  image: { height: 25, resizeMode: 'contain', width: 25 },
  label: { fontFamily: font.reg, fontSize: 12, marginTop: 5 },
})
