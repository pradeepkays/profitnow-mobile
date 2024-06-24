import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { color, font } from 'components/Styles'
// import { navigate } from 'src/navigation/navigation'
import NavigationService from 'src/utils/NavigationService'
import { RespOrganization_Data } from 'src/types/company.types'

export function SearchItemCompany({ item }: { item: RespOrganization_Data }) {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate('CompanyDetails', {
          companyId: item.id,
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
        <Text
          style={{
            fontFamily: font.semi,
            color: color.fontblack,
            fontSize: 15,
          }}
        >
          {item?.initials}
        </Text>
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
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}
