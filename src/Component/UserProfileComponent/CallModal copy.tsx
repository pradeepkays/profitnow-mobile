import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import { useKeyboard } from '@starlingtech/util'
import FlashMessage from 'react-native-flash-message'
import ReactNativeModal from 'react-native-modal'
import TwilioVoice from 'react-native-twilio-programmable-voice'

import { consoleLog } from '@vn.starlingTech/helpers/logHelper'
import { colorDefault } from '@vn.starlingTech/theme/theming'

import IconEndCall from 'assets/svg/IconEndCall'
import IconHold from 'assets/svg/IconHold'
import IconKeypad from 'assets/svg/IconKeypad'
import IconMute from 'assets/svg/IconMute'
import IconSpeaker from 'assets/svg/IconSpeaker'
import useAppStore from 'src/store/appStore'
import { Phones, RespContact } from 'src/types/contact.types'

import { Keypad } from './Keypad'
import { CallingNote } from './Note'
import { font } from '../Styles'

type Props = {
  visible: boolean
  handleClose(): void
  detail: RespContact | undefined
  phone: Phones | undefined
}

const CallModal = ({ handleClose, detail, phone, visible }: Props) => {
  const { keyboardVisible } = useKeyboard()
  const refMessage = useRef<FlashMessage>(null)

  const [callState, setCallState] = useState('Calling')
  const [muteState, setMuteState] = useState(false)
  const [speakerState, setSpeakerState] = useState(false)
  const [callOnHold, setCallOnHold] = useState(false)
  const [keypadVisible, setKeypadVisible] = useState(false)
  const [actionEnabled, setActionEnabled] = useState(false)

  const callPhone = phone ? phone.prefix + '' + phone.short_phone : ''

  const { twilio } = useAppStore((s) => s.userSetting)

  useEffect(() => {
    const initTwilio = async () => {
      setCallState('Calling')
      const token = await getAuthToken(twilio.json_access_token_url)
      // console.log('token is', token)
      await getMicrophonePermission()

      try {
        const resp = await TwilioVoice.initWithToken(
          token && token.token && token.token.toString(),
        )
        console.log('resp init token', resp)

        if (Platform.OS === 'ios') {
          //required for ios
          try {
            TwilioVoice.configureCallKit({
              appName: 'Materio', // Required param
            })
            handleCall()
          } catch (err) {
            console.log(err, 'TwilioVoice.configureCallKit')
          }
        } else {
          handleCall()
        }
      } catch (err) {
        console.log(err, 'error initializing')
      }
    }
    if (visible) {
      initTwilio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twilio, visible])

  const getMicrophonePermission = () => {
    if (Platform.OS === 'android') {
      const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      return PermissionsAndroid.check(audioPermission).then(async (result) => {
        if (!result) {
          const granted = await PermissionsAndroid.request(audioPermission, {
            title: 'Microphone Permission',
            message:
              'App needs access to you microphone ' +
              'so you can talk with other users.',
            buttonPositive: 'ok',
          })
          console.log('granted', granted)
        }
      })
    } else {
      return true
    }
  }

  useEffect(() => {
    const listeners = () => {
      console.log('listeners')
      TwilioVoice.addEventListener('deviceReady', () => {
        console.log('ready')
        // handleCall()
      })

      // TwilioVoice.addEventListener('deviceNotReady', function (data) {
      //   console.log('data', data)
      // })

      TwilioVoice.addEventListener('connectionDidDisconnect', () => {
        console.log('>> TwilioVoice, Call disconnect.')
        setCallState('Disconnected')
        setActionEnabled(false)
        setKeypadVisible(false)
      })

      TwilioVoice.addEventListener('connectionDidConnect', function () {
        setCallState('Connected')
        setActionEnabled(true)
        console.log('connectionDidConnect')
        //     call_sid: string,  // Twilio call sid
        //     call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        // call_from: '+441234567890'
        // call_to: 'client:bob'
      })

      TwilioVoice.addEventListener('connectionIsReconnecting', function () {
        setCallState('Reconnecting')
        console.log('connectionIsReconnecting')
        // {
        //     call_sid: string,  // Twilio call sid
        //     call_from: string, // "+441234567890"
        //     call_to: string,   // "client:bob"
        // }
      })

      // TwilioVoice.addEventListener('connectionDidReconnect', function (data) {
      //   // console.log('connectionDidReconnect', data)
      //   // {
      //   //     call_sid: string,  // Twilio call sid
      //   //     call_from: string, // "+441234567890"
      //   //     call_to: string,   // "client:bob"
      //   // }
      // })

      TwilioVoice.addEventListener('callStateRinging', function () {
        console.log('callStateRinging')
        setCallState('Ringing')
        //   {
        //       call_sid: string,  // Twilio call sid
        //       call_state: 'CONNECTED' | 'ACCEPTED' | 'CONNECTING' | 'RINGING' | 'DISCONNECTED' | 'CANCELLED',
        //       call_from: string, // "+441234567890"
        //       call_to: string,   // "client:bob"
        //   }
      })
      // TwilioVoice.addEventListener('callInviteCancelled', function (data) {
      //   console.log('callInviteCancelled', data)

      //   //   {
      //   //       call_sid: string,  // Twilio call sid
      //   //       call_from: string, // "+441234567890"
      //   //       call_to: string,   // "client:bob"
      //   //   }
      // })

      // TwilioVoice.addEventListener('deviceDidReceiveIncoming', function (data) {
      //   console.log('deviceDidReceiveIncoming', data)
      //   // {
      //   //     call_sid: string,  // Twilio call sid
      //   //     call_from: string, // "+441234567890"
      //   //     call_to: string,   // "client:bob"
      //   // }
      // })

      // TwilioVoice.addEventListener('proximity', function (data) {
      //     console.log('proximity', data)
      //     // {
      //     //     isNear: boolean
      //     // }
      // })

      // TwilioVoice.addEventListener('wiredHeadset', function (data) {
      //     console.log('wiredHeadset', data)
      //     // {
      //     //     isPlugged: boolean,
      //     //     hasMic: boolean,
      //     //     deviceName: string
      //     // }
      // })
    }
    listeners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCall = () => {
    //   TwilioVoice.connect({ To: `17026591465` });
    //  TwilioVoice.connect({ To: `17026591465` });
    if (callPhone) {
      consoleLog(callPhone, 'callPhone')
      console.log(callPhone, 'callPhone')
      TwilioVoice.connect({
        To: callPhone,
      })
    }
    // TwilioVoice.connect({ To: `+919928915264` });
    // TwilioVoice.connect({ To: `923354541873` });
  }

  const handleDisconnectCall = () => {
    TwilioVoice.disconnect()
    TwilioVoice.unregister()
    setMuteState(false)
    setSpeakerState(false)
    setCallOnHold(false)
    setKeypadVisible(false)
    setActionEnabled(false)
    handleClose()
  }

  const handleMute = () => {
    const newState = !muteState
    TwilioVoice.setMuted(newState)
    setMuteState(newState)
  }

  const handleSpeaker = () => {
    const newState = !speakerState
    TwilioVoice.setSpeakerPhone(newState)
    setSpeakerState(newState)
  }

  const onHoldToggle = () => {
    const newState = !callOnHold
    TwilioVoice.hold(newState)
    setCallOnHold(newState)
  }

  const onToggleKeypad = () => {
    setKeypadVisible(!keypadVisible)
  }

  const onSendDigits = (digits: string) => {
    TwilioVoice.sendDigits(digits)
  }

  return (
    <ReactNativeModal
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      isVisible={visible}
      style={styles.modal}
    >
      <Pressable
        disabled={!keyboardVisible}
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <AppBlock alignItems="center">
          <AppText weight="500" color="placeholder" size={18} numberOfLines={2}>
            {detail?.first_name} {detail?.last_name}
          </AppText>
          <AppText
            color="textFocus"
            weight="700"
            numberOfLines={2}
            mt={5}
            size={20}
          >
            {phone?.phone_formatted}
          </AppText>
          <AppText mt={6} style={styles.callingText}>
            {callState}
          </AppText>
        </AppBlock>
        <AppBlock alignItems="center">
          <CallingNote
            refMessage={refMessage}
            contactId={detail?.id!}
            visible={!keypadVisible}
          />
          <Keypad onPress={onSendDigits} visible={keypadVisible} />
          <View style={styles.iconContainer}>
            <ActionButton
              // disabled={!actionEnabled}
              onPress={onToggleKeypad}
              active={keypadVisible}
              label={'Keypad'}
            >
              {!keypadVisible ? <IconKeypad /> : <IconKeypad color={'white'} />}
            </ActionButton>
            <ActionButton
              disabled={!actionEnabled}
              onPress={onHoldToggle}
              active={callOnHold}
              label={'Hold'}
            >
              {!callOnHold ? <IconHold /> : <IconHold color={'white'} />}
            </ActionButton>
            <ActionButton
              disabled={!actionEnabled}
              onPress={handleMute}
              active={muteState}
              label={'Mute'}
            >
              {!muteState ? <IconMute /> : <IconMute color={'white'} />}
            </ActionButton>
            <ActionButton
              disabled={!actionEnabled}
              onPress={handleSpeaker}
              active={speakerState}
              label={'Speaker'}
            >
              {!speakerState ? (
                <IconSpeaker />
              ) : (
                <IconSpeaker color={'white'} />
              )}
            </ActionButton>
          </View>

          <TouchableOpacity
            style={styles.disconnectIcon}
            onPress={() => handleDisconnectCall()}
          >
            <IconEndCall />
          </TouchableOpacity>
        </AppBlock>
      </Pressable>
      <FlashMessage
        ref={refMessage}
        textProps={{ allowFontScaling: false }}
        position="top"
      />
    </ReactNativeModal>
  )
}

type ActionButtonProps = {
  onPress(): void
  active: boolean
  label: string
  children?: ReactElement
  disabled: boolean
}
function ActionButton(props: ActionButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.iconStyle, props.disabled && styles.actionDisabled]}
    >
      <AppBlock
        center
        style={[styles.actionBtn, props.active && styles.actionBtnActive]}
      >
        {props.children}
      </AppBlock>
      <AppText size={13} mt={4}>
        {props.label}
      </AppText>
    </TouchableOpacity>
  )
}

const getAuthToken = async (tokenUrl: string) => {
  try {
    const response = await fetch(tokenUrl)
    return await response.json()
  } catch (error) {
    return console.error(error)
  }
}

export default CallModal

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: colorDefault.primary + 10,
    borderRadius: appSize(48),
    height: appSize(48),
    width: appSize(48),
  },
  actionBtnActive: {
    backgroundColor: colorDefault.primary,
  },
  actionDisabled: { opacity: 0.5 },
  callingText: {
    color: 'rgba(58, 53, 65, .87)',
    fontFamily: font.semi,
    fontSize: 14,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: appSize(15),
    minHeight: appSize(450),
    paddingVertical: appSize(20),
  },
  disconnectIcon: {
    marginTop: appSize(26),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: appSize(260),
  },
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: { margin: 0 },
})
