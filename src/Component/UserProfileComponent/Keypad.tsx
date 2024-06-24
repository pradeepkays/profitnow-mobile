import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { colorDefault } from '@vn.starlingTech/theme/theming'

type Props = {
  visible: boolean
  onPress(digit: string): void
}

export function Keypad({ onPress, visible }: Props) {
  const animValue = useSharedValue(0)

  const [digits, setDigits] = useState('')

  const onItemPress = (digit: string) => {
    const newDigits = digits + digit
    setDigits(newDigits)
    onPress(newDigits)
  }

  useEffect(() => {
    animValue.value = withTiming(visible ? 1 : 0, { duration: 300 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const animStyle = useAnimatedStyle(() => {
    return {
      marginVertical: interpolate(animValue.value, [0, 1], [0, 26]),
      height: interpolate(animValue.value, [0, 1], [0, 300]),
      opacity: interpolate(animValue.value, [0, 0.75, 1], [0, 0, 1]),
    }
  })

  return (
    <Animated.View style={animStyle}>
      <AppText mb={16} textAlign="center" height={20}>
        {digits || '_'}
      </AppText>
      <AppBlock row>
        <Item label="1" onPress={onItemPress} />
        <Item label="2" subLabel="ABC" onPress={onItemPress} />
        <Item label="3" subLabel="DEF" onPress={onItemPress} />
      </AppBlock>
      <AppBlock row mt={16}>
        <Item label="4" subLabel="GHI" onPress={onItemPress} />
        <Item label="5" subLabel="JKL" onPress={onItemPress} />
        <Item label="6" subLabel="MNO" onPress={onItemPress} />
      </AppBlock>
      <AppBlock row mt={16}>
        <Item label="7" subLabel="PQRS" onPress={onItemPress} />
        <Item label="8" subLabel="TUV" onPress={onItemPress} />
        <Item label="9" subLabel="WXYZ" onPress={onItemPress} />
      </AppBlock>
      <AppBlock row mt={16}>
        <Item label="*" onPress={onItemPress} />
        <Item label="0" onPress={onItemPress} />
        <Item label="#" onPress={onItemPress} />
      </AppBlock>
    </Animated.View>
  )
}

type ItemProps = {
  label: string
  subLabel?: string
  onPress(digit: string): void
}
function Item({ label, subLabel, onPress }: ItemProps) {
  const onItemPress = () => {
    onPress(label)
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onItemPress}
      activeOpacity={0.3}
    >
      <AppText>{label}</AppText>
      {subLabel ? (
        <AppText size={9} color="icon" mt={1}>
          {subLabel}
        </AppText>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    borderBottomColor: colorDefault.primary,
    borderColor: colorDefault.primary,
    borderEndColor: colorDefault.primary,
    borderLeftColor: colorDefault.primary,
    borderRadius: appSize(100),
    borderRightColor: colorDefault.primary,
    borderStartColor: colorDefault.primary,
    borderTopColor: colorDefault.primary,
    borderWidth: 1, //StyleSheet.hairlineWidth,
    height: appSize(42),
    justifyContent: 'center',
    marginHorizontal: appSize(12),
    width: appSize(42),
  },
})
