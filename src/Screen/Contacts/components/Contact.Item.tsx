import React from 'react'
import {
  Alert,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// import { navigate } from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService'

import { Skeleton } from './Contact.Skeleton'
import { color, font } from '../../../Component/Styles'

function ContactItem({ item }: ListRenderItemInfo<any>) {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate('UserDetails', { id: item.id + '' })
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
          <Image
            source={item.img}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Text
            onPress={() => Alert.alert(item.id)}
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
        {item?.name.trim() || item?.email}
      </Text>
    </TouchableOpacity>
  )
}

export function renderContactItem(props: ListRenderItemInfo<any>) {
  return <ContactItem {...props} />
}

type Props = {
  isLoading: boolean
}
export function ListContactEmpty({ isLoading }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {!isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('assets/img/empty.png')}
            style={{ height: 90, width: 90 }}
          />
          <Text
            style={{
              fontFamily: font.reg,
              textAlign: 'center',
              marginTop: 10,
              color: color.lableColor,
            }}
          >
            Result not found!
          </Text>
        </View>
      ) : (
        <Skeleton />
      )}
    </View>
  )
}
