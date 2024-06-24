import React, { ReactElement, useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppButton, AppText } from '@starlingtech/element'

import AppStyles from '@vn.starlingTech/elements/AppStyles'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { getString } from '@vn.starlingTech/lang/language'
import { useAppColor } from '@vn.starlingTech/theme/theming'
import { sizes, useAppTheme } from '@vn.starlingTech/theme/theming'

export type PlaceholderType = 'news'

type ProcessingType = {
  color?: string
  size?: 'small' | 'large'
}

export function OnProcessing(props: ProcessingType) {
  const { colors } = useAppTheme()
  return (
    <View style={styles.center}>
      <ActivityIndicator color={props.color || colors.text} animating />
    </View>
  )
}

type ResponseErrorType = {
  message: string
  tryAgain?: () => void
}
export function OnErrorContainer(props: ResponseErrorType) {
  return (
    <View style={styles.error}>
      {props.message && <AppText color="placeholder">{props.message}</AppText>}
      {props.tryAgain && (
        <AppButton onPress={props.tryAgain} style={AppStyles.buttonTryAgain}>
          <AppText>{getString().tryAgain}</AppText>
        </AppButton>
      )}
    </View>
  )
}

type ResponseContainerType = {
  processing: boolean
  success: boolean
  page?: number
  hasCached?: boolean
  message?: string | null
  tryAgain?: () => void
  type?: PlaceholderType
  children: ReactElement
  color?: string
  skeleton?: ReactElement
}

export function ResponseContainer(props: ResponseContainerType) {
  const color = useAppColor()
  const animRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // consoleLog(props.message, 'message');
    if (props.message && props.hasCached && (!props.page || props.page === 1)) {
      Animated.timing(animRef, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      // consoleLog('hide');
      Animated.timing(animRef, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }
  }, [animRef, props.hasCached, props.message, props.page])

  let view = props.children
  if (props.processing) {
    view = props.skeleton ?? <OnProcessing color={props.color} />
  }

  if (props.message) {
    if (!props.hasCached && (props?.page || props.page === 1)) {
      view = (
        <OnErrorContainer message={props.message} tryAgain={props.tryAgain} />
      )
    }
  }

  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity)

  return (
    <>
      <AnimatedTouch
        activeOpacity={0.7}
        onPress={props.tryAgain}
        style={[
          {
            height: animRef,
            backgroundColor: color.black,
          },
          styles.animatedError,
        ]}
      >
        {props.message ? (
          <AppText numberOfLines={1} textAlign="center" color="white">
            {/* <Ionicons name="ios-reload" size={14} /> */}
            {props.message}
          </AppText>
        ) : null}
      </AnimatedTouch>
      <View style={AppStyles.fill}>{view}</View>
    </>
  )
}

type FlatListContainerType = {
  message?: string | null
  tryAgain?: () => void
}
export function FlatListResponseContainer(props: FlatListContainerType) {
  if (props.message) {
    consoleLog(props.message, 'message?')
    return (
      <OnErrorContainer message={props.message} tryAgain={props.tryAgain} />
    )
  }
  return null
}

const styles = StyleSheet.create({
  animatedError: { justifyContent: 'center' },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  error: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -sizes.padding,
  },
})
