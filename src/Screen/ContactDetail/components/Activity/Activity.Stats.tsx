import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { AppText } from '@starlingtech/element'

import { color, font, shadow } from 'src/Component/Styles'

type Props = {
  isLoadingData: boolean
  inactive: string
  last_contacted: string
  interactions: string
}
export default function ActivityStats({
  isLoadingData,
  inactive,
  last_contacted,
  interactions,
}: Props) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabItem}>
          {isLoadingData ? (
            <ActivityIndicator color={color.primeColor} />
          ) : (
            <AppText weight="700" mb={5} size={16} color="#7350AC">
              {inactive || '0'}
            </AppText>
          )}
          <Text style={styles.label}>Inactive Days</Text>
        </View>

        <View style={styles.centerItem}>
          <View style={styles.tabItem}>
            {isLoadingData ? (
              <ActivityIndicator color={'#139CE0'} />
            ) : (
              <AppText weight="500" mb={5} color="secondary">
                {last_contacted || '0'}
              </AppText>
            )}
            <Text style={styles.label}>Last Contacted</Text>
          </View>
        </View>
        <View style={styles.tabItem}>
          {isLoadingData ? (
            <ActivityIndicator color={color.primeColor} />
          ) : (
            <AppText weight="500" mb={5} color="success" size={16}>
              {interactions || '0'}
            </AppText>
          )}
          <Text style={styles.label}>Interactions</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  centerItem: {
    ...shadow,
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 1,
    height: 80,
    marginLeft: 4,
    marginRight: 4,
  },
  container: { flexDirection: 'row', paddingHorizontal: 20 },
  label: {
    color: color.fontblack,
    fontFamily: font.reg,
    fontSize: 12,
  },
  tabItem: {
    alignItems: 'center',
    backgroundColor: color.lightGaryBackground,
    borderRadius: 8,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 2,
    overflow: 'hidden',
  },
})
