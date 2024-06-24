import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { color, font } from 'components/Styles'
// import { navigate } from 'src/navigation/navigation'
import NavigationService from 'src/utils/NavigationService'

export function SearchItem({ item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate('UserDetails', {
          id: item.id + '',
        })
      }}
      style={{
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.selectBgColor,
          borderRadius: 45,
          overflow: 'hidden',
        }}
      >
        {item?.img ? (
          <Image source={item.img} style={{ height: '100%', width: '100%' }} />
        ) : (
          <Text
            style={{
              fontFamily: font.semi,
              color: color.fontblack,
              fontSize: 15,
            }}
          >
            {item?.initials}
          </Text>
        )}
      </View>
      <Text
        style={{
          flex: 1,
          fontFamily: font.semi,
          marginLeft: 15,
          fontSize: 14,
          color: color.fontcolor,
        }}
      >
        {item?.name}
      </Text>
    </TouchableOpacity>
  )
}
