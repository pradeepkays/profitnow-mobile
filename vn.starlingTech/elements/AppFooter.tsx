import React, { ReactNode } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'

import { AppBlock, appSize } from '@starlingtech/element'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
  style?: ViewStyle
  shadow?: boolean
  height?: number
}
export default function (props: Props) {
  const insets = useSafeAreaInsets()

  const { height = 60 } = props

  return (
    <>
      <AppBlock
        style={{
          height: insets.bottom + height,
        }}
      />
      <AppBlock
        background="background"
        style={[
          styles.container,
          props.style,
          {
            paddingBottom: insets.bottom
              ? insets.bottom + appSize(20)
              : appSize(44),
          },
        ]}
      >
        {props.children}
      </AppBlock>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingTop: appSize(20),
    position: 'absolute',
    right: 0,
  },
})
