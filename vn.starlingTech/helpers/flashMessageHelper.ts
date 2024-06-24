// import { isFunction } from 'lodash';
import { Alert, ViewStyle } from 'react-native'

import { hideMessage, Position, showMessage } from 'react-native-flash-message'

import AppConstants from '@vn.starlingTech/config/AppConstant'
import { getString } from '@vn.starlingTech/lang/language'
import { colorDefault as light } from '@vn.starlingTech/theme/theming'
import { font } from 'components/Styles'

// import {getLang} from '../language';

export function hideAllMessage() {
  hideMessage()
}

export function showMessageError(message?: string) {
  Alert.alert(getString().errorTitle, message || getString().error)
}
export function showMessageSuccess(
  message: string,
  autoHide = true,
  position: Position = 'top',
) {
  showMessage({ message, type: 'success', position, autoHide })
}

export function showFlashMessageError(
  message?: string,
  autoHide: boolean = true,
  position: Position = 'top',
  ref?: any,
) {
  if (ref) {
    ref.current.showMessage({
      message: message || getString().error,
      type: 'danger',
      position,
      autoHide,
    })
  } else {
    showMessage({
      message: message || getString().error,
      type: 'danger',
      position,
      autoHide,
    })
  }
}
export function showFlashMessageSuccess(message: string, autoHide = true) {
  showMessage({ message, type: 'success', position: 'top', autoHide })
}

type ShowNotificationType = {
  title?: string
  message?: string
  onPress: () => void
  style?: ViewStyle
}
export function showNotification(props: ShowNotificationType) {
  const { title, message } = props
  showMessage({
    message: title || getString().alert,
    description: message || '',
    duration: 5000,
    titleStyle: { fontFamily: font.reg},
    textStyle: { fontFamily: font.reg },
    backgroundColor: light.primary,
    style: {
      top: 10,
      left: 10,
      marginTop: 0,
      borderRadius: 12,
      width: AppConstants.SCREEN_WIDTH - 20,
      paddingTop: 0,
      paddingBottom: 12,
      ...props.style,
    },
    onPress: props.onPress,
  })
  // alertMessageOnShowing = true;
}
