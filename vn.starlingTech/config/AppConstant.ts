import { Dimensions, Platform } from 'react-native'

import settings from './settings'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export function appSize<TData = string | number>(size: TData): TData {
  if (typeof size === 'string') {
    return size
  }
  return ((windowWidth * Number(size)) / settings.UI_WIDTH) as TData
}

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const AppConstant = {
  UI_WIDTH: settings.UI_WIDTH,
  WIDTH: windowWidth,
  HEIGHT: windowHeight,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  IS_IOS: Platform.OS === 'ios',
  SMALL_DEVICE: windowWidth <= 375,
  LIST_SIZE: settings.LIST_SIZE,
  SESSION: {
    LANGUAGE: 'SESSION_language',
    TOKEN: 'SESSION_token',
  },
}

export default AppConstant
