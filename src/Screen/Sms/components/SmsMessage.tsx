import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import moment from 'moment'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'

import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper'

import { color, font } from 'src/Component/Styles'
import { parseResponseError } from 'src/helper/responseHelper'
// import { goBack } from 'src/navigation/navigation'
import NavigationService from 'src/utils/NavigationService';
import { useSmsSending } from 'src/service/contact/sms'

type Props = {
  id: string
}
export const SmsMessage = ({ id }: Props) => {
  const [message, setMessage] = useState('')
  const { mutate: sendSms, isLoading } = useSmsSending()

  const onSubmit = () => {
    if (!message) {
      showFlashMessageError('Please Enter Message')
    } else {
      sendSms(
        {
          id,
          params: {
            text: message,
            time: moment().format(),
          },
        },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Send successfully')
            NavigationService.goBack()
          },
          onError: (error) => {
            const { message: errorMsg } = parseResponseError(error)
            showFlashMessageError(errorMsg || 'Failed to send')
          },
        },
      )
    }
  }

  return (
    <KeyboardAvoidingScrollView style={{ flex: 1 }}>
      <View style={styles.sendContainer}>
        <TextInput
          placeholderTextColor="rgba(58, 53, 65, 0.38)"
          style={styles.inputContainer}
          placeholder="Write message.."
          value={message}
          autoCapitalize="none"
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.sendIcon} onPress={onSubmit}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Image
              source={require('assets/img/right-arrow.png')}
              style={styles.arrowIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingScrollView>
  )
}

const styles = StyleSheet.create({
  arrowIcon: {
    height: 24,
    tintColor: color.whiteColor,
    width: 24,
  },
  inputContainer: {
    backgroundColor: color.whiteColor,
    borderColor: 'rgba(58, 53, 65, 0.26)',
    borderRadius: 4,
    borderWidth: 1,
    color: '#000',
    fontFamily: font.reg,
    fontSize: 15,
    height: 48,
    paddingHorizontal: 10,
    width: '75%',
  },
  sendContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  sendIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    marginLeft: 15,
    width: 66,
  },
})
