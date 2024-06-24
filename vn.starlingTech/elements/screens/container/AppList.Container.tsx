import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { AppText, AppTouchableOpacity } from '@starlingtech/element'
// import Ionicons from 'react-native-vector-icons/Ionicons'

import { getString } from '@vn.starlingTech/lang/language'
import { useAppTheme } from '@vn.starlingTech/theme/theming'

type ListEmptyComponentProps = {
  message?: string
}
export function ListEmptyComponent({ message }: ListEmptyComponentProps) {
  return (
    <AppText textAlign="center" color="placeholder" style={styles.text}>
      {message || getString().emptyData}
    </AppText>
  )
}

type ListEndReachedFooterProps = {
  isError: boolean
  color?: string
  page: number
  message?: string
  tryAgain: () => void
}
export const ListEndReachedFooter = (props: ListEndReachedFooterProps) => {
  const { colors } = useAppTheme()
  if (props.message) {
    if (props.page <= 1) {
      return null
    }
    if (props.isError) {
      return (
        <AppTouchableOpacity
          background="background"
          sentryLabel="AppListContainer-tryAgain"
          activeOpacity={0.9}
          style={styles.container}
          onPress={props.tryAgain}
        >
          <AppText textAlign="center" color="danger">
            {/* <Ionicons name="ios-reload" size={14} /> */}
            {props.message}
          </AppText>
        </AppTouchableOpacity>
      )
    }
    return (
      <View>
        <AppText textAlign="center" color="placeholder" style={styles.text}>
          {props.message}
        </AppText>
      </View>
    )
  }
  return <ActivityIndicator color={colors.text} animating />
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  text: { marginVertical: 16 },
})
