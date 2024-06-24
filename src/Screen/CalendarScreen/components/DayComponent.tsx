import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

// import { TouchableOpacity } from 'react-native-gesture-handler'

import { color, font } from '../../../Component/Styles'

type Props = {
  date: any
  state: any
  selecteDate: string
  onPress(): void
  getData(p: string): any
}
export function DayComponent({
  selecteDate,
  date,
  state,
  getData,
  onPress,
}: Props) {
  const getDateIndicater = getData(date.dateString)
  return (
    <TouchableOpacity
      key={date.dateString}
      onPress={onPress}
      style={{
        marginBottom: -9,
        backgroundColor:
          selecteDate === date.dateString ? color.secondColor : '#fff0',
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontFamily:
            selecteDate === date.dateString || state === 'today'
              ? font.bold
              : font.semi,
          color:
            selecteDate === date.dateString
              ? '#fff'
              : state === 'today'
              ? color.secondColor
              : state === 'disabled'
              ? 'gray'
              : 'black',
        }}
      >
        {date.day}
      </Text>
      {getDateIndicater ? (
        <View style={{ width: 35 }}>
          <View
            style={{
              position: 'absolute',
              width: 35,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {getDateIndicater?.data
              ?.slice(0, 3)
              .map((_: any, index: number) => (
                <View
                  key={index + ''}
                  style={{
                    height: 5,
                    width: 5,
                    borderWidth: 1.7,
                    borderRadius: 5,
                    marginRight:
                      getDateIndicater?.data?.length - 1 === index ? 0 : 3,
                    borderColor:
                      index === 1
                        ? '#00B383'
                        : index === 2
                        ? '#735BF2'
                        : '#0095FF',
                  }}
                />
              ))}
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  )
}
