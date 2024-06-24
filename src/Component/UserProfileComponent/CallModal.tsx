import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppBlock, appSize, AppText} from '@starlingtech/element';
import {useKeyboard} from '@starlingtech/util';
import FlashMessage from 'react-native-flash-message';
import ReactNativeModal from 'react-native-modal';
// @ts-ignore
// import TwilioVoice from 'react-native-twilio-programmable-voice';
import TwilioVoice, {
  Voice,
  Call as TwilioCall,
  AudioDevice,
} from '@twilio/voice-react-native-sdk';

import {consoleLog} from '@vn.starlingTech/helpers/logHelper';
import {colorDefault} from '@vn.starlingTech/theme/theming';

import IconEndCall from 'assets/svg/IconEndCall';
import IconHold from 'assets/svg/IconHold';
import IconKeypad from 'assets/svg/IconKeypad';
import IconMute from 'assets/svg/IconMute';
import IconSpeaker from 'assets/svg/IconSpeaker';
import useAppStore from 'src/store/appStore';
import {Phones, RespContact} from 'src/types/contact.types';

import {Keypad} from './Keypad';
import {CallingNote} from './Note';
import {font} from '../Styles';
import {showFlashMessageError} from '@vn.starlingTech/helpers/flashMessageHelper';

type Props = {
  visible: boolean;
  handleClose(): void;
  detail: RespContact | undefined;
  phone: Phones | undefined;
};

var __twilioCall: TwilioCall;

const CallModal = ({handleClose, detail, phone, visible}: Props) => {
  const {keyboardVisible} = useKeyboard();
  const refMessage = useRef<FlashMessage>(null);

  const [callState, setCallState] = useState('Calling');
  const [twilioToken, setTwilioToken] = useState<string>('');
  const [muteState, setMuteState] = useState(false);
  const [speakerState, setSpeakerState] = useState(false);
  const [callOnHold, setCallOnHold] = useState(false);
  const [keypadVisible, setKeypadVisible] = useState(false);
  const [actionEnabled, setActionEnabled] = useState(false);

  const callPhone = phone ? phone.prefix + '' + phone.short_phone : '';

  const {twilio} = useAppStore(s => s.userSetting);
  const voice = new Voice();

  useEffect(() => {
    const initTwilio = async () => {
      await getMicrophonePermission();
      setCallState('Calling');
      try {
        const tokenResponse = await getAuthToken(twilio.json_access_token_url);
        console.log('useEffect initTwilio tokenResponse==>', tokenResponse);

        if (tokenResponse?.token) {
          // Allow incoming calls
          await voice.register(tokenResponse?.token);

          setTwilioToken(tokenResponse?.token);
          if (Platform.OS === 'ios') {
            //required for ios
            handleCall();
          } else {
            handleCall();
          }
        } else {
          setCallState('Disconnected');
        }
      } catch (error) {
        console.log('useEffect initTwilio error==>', error);
      }
    };

    if (visible) {
      initTwilio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twilio, visible]);

  const getMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
      return PermissionsAndroid.check(audioPermission).then(async result => {
        console.log('getMicrophonePermission result==>', result);
        if (!result) {
          const granted = await PermissionsAndroid.request(audioPermission, {
            title: 'Microphone Permission',
            message:
              'App needs access to you microphone ' +
              'so you can talk with other users.',
            buttonPositive: 'ok',
          });
          console.log('granted', granted);
        } else {
          return true;
        }
      });
    } else {
      return true;
    }
  };

  useEffect(() => {
    const listeners = () => {
      console.log('useEffect listeners called');

      if (__twilioCall) {
        console.log('useEffect listeners called 2');
        __twilioCall.on(TwilioCall.Event.ConnectFailure, (error: any) => {
          console.error('useEffect Event.ConnectFailure==>', error);
        });

        __twilioCall.on(TwilioCall.Event.Disconnected, (error: any) => {
          console.error('useEffect Event.Disconnected==>', error);
          setCallState('Disconnected');
          setActionEnabled(false);
          setKeypadVisible(false);
        });
        __twilioCall.on(TwilioCall.Event.Connected, (error: any) => {
          console.error('useEffect Event.Connected==>', error);
          setCallState('Connected');
          setActionEnabled(true);
        });
        __twilioCall.on(TwilioCall.Event.Reconnecting, (error: any) => {
          console.error('useEffect Event.Reconnecting==>', error);
          setCallState('Reconnecting');
          console.log('connectionIsReconnecting');
        });
        __twilioCall.on(TwilioCall.Event.Ringing, (error: any) => {
          console.error('useEffect Event.Ringing==>', error);
          setCallState('Ringing');
        });
      }

      // TwilioVoice.addEventListener('deviceReady', () => {
      //   console.log('ready');
      // });

      // TwilioVoice.addEventListener('connectionDidDisconnect', () => {
      //   setCallState('Disconnected');
      //   setActionEnabled(false);
      //   setKeypadVisible(false);
      // });
      // TwilioVoice.addEventListener('connectionDidConnect', function () {
      //   setCallState('Connected');
      //   setActionEnabled(true);
      //   console.log('connectionDidConnect');
      // });
      // TwilioVoice.addEventListener('connectionIsReconnecting', function () {
      //   setCallState('Reconnecting');
      //   console.log('connectionIsReconnecting');
      // });
      // TwilioVoice.addEventListener('callStateRinging', function () {
      //   console.log('callStateRinging');
      //   setCallState('Ringing');
      // });
    };
    listeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [__twilioCall]);

  const handleCall = async () => {
    // TwilioVoice.connect({ To: `17026591465` });
    // TwilioVoice.connect({ To: `+919928915264` });
    // TwilioVoice.connect({ To: `923354541873` });

    if (!callPhone) {
      showFlashMessageError('Invalid phone');
    }

    if (!twilioToken) {
      showFlashMessageError('Tokne not generated');
    }

    // console.log('handleCall voice==>', voice);
    // console.log(
    //   'handleCall getAudioDevices==>',
    //   await voice?.getAudioDevices(),
    // );
    // return;
    // Make an outgoing call
    const params = {
      params: {
        To: '17026591465',
        // recipientType: 'number',
      },
    };
    try {
      __twilioCall = await voice.connect(twilioToken, params);
      console.log('handleCall __twilioCall==>', __twilioCall);
    } catch (error) {
      // console.log('handleCall __twilioCall error==>', error?.getMessage());
    }
  };

  const handleDisconnectCall = async () => {
    // TwilioVoice?.disconnect();
    // TwilioVoice?.unregister();
    __twilioCall?.disconnect();
    try {
      await voice.unregister(twilioToken);
    } catch (error) {
      console.log('handleDisconnectCall unregister==>', error);
    }
    setMuteState(false);
    setSpeakerState(false);
    setCallOnHold(false);
    setKeypadVisible(false);
    setActionEnabled(false);
    handleClose();
  };

  const handleMute = () => {
    const newState = !muteState;
    // TwilioVoice?.setMuted(newState);
    __twilioCall?.mute(true);
    setMuteState(newState);
  };

  const handleSpeaker = async () => {
    const newState = !speakerState;
    // TwilioVoice?.setSpeakerPhone(newState);
    const audioDevices = await voice.getAudioDevices();

    const device = audioDevices.audioDevices.find(
      d =>
        d.type ===
        (newState ? AudioDevice.Type.Speaker : AudioDevice.Type.Earpiece),
    );
    if (typeof device === 'undefined') {
      return;
    }
    device.select();
    setSpeakerState(newState);
  };

  const onHoldToggle = () => {
    const newState = !callOnHold;
    // TwilioVoice?.hold(newState);
    __twilioCall?.hold(newState);
    setCallOnHold(newState);
  };

  const onToggleKeypad = () => {
    setKeypadVisible(!keypadVisible);
  };

  const onSendDigits = (digits: string) => {
    // TwilioVoice?.sendDigits(digits);
    __twilioCall?.sendDigits(digits);
  };

  return (
    <ReactNativeModal
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      isVisible={visible}
      style={styles.modal}>
      <Pressable
        disabled={!keyboardVisible}
        style={styles.container}
        onPress={Keyboard.dismiss}>
        <AppBlock alignItems="center">
          <AppText weight="500" color="placeholder" size={18} numberOfLines={2}>
            {detail?.first_name} {detail?.last_name}
          </AppText>
          <AppText
            color="textFocus"
            weight="700"
            numberOfLines={2}
            mt={5}
            size={20}>
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
              label={'Keypad'}>
              {!keypadVisible ? <IconKeypad /> : <IconKeypad color={'white'} />}
            </ActionButton>
            <ActionButton
              disabled={!actionEnabled}
              onPress={onHoldToggle}
              active={callOnHold}
              label={'Hold'}>
              {!callOnHold ? <IconHold /> : <IconHold color={'white'} />}
            </ActionButton>
            <ActionButton
              disabled={!actionEnabled}
              onPress={handleMute}
              active={muteState}
              label={'Mute'}>
              {!muteState ? <IconMute /> : <IconMute color={'white'} />}
            </ActionButton>
            <ActionButton
              disabled={!actionEnabled}
              onPress={handleSpeaker}
              active={speakerState}
              label={'Speaker'}>
              {!speakerState ? (
                <IconSpeaker />
              ) : (
                <IconSpeaker color={'white'} />
              )}
            </ActionButton>
          </View>

          <TouchableOpacity
            style={styles.disconnectIcon}
            onPress={() => handleDisconnectCall()}>
            <IconEndCall />
          </TouchableOpacity>
        </AppBlock>
      </Pressable>
      <FlashMessage
        ref={refMessage}
        textProps={{allowFontScaling: false}}
        position="top"
      />
    </ReactNativeModal>
  );
};

type ActionButtonProps = {
  onPress(): void;
  active: boolean;
  label: string;
  children?: ReactElement;
  disabled: boolean;
};
function ActionButton(props: ActionButtonProps) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.iconStyle, props.disabled && styles.actionDisabled]}>
      <AppBlock
        center
        style={[styles.actionBtn, props.active && styles.actionBtnActive]}>
        {props.children}
      </AppBlock>
      <AppText size={13} mt={4}>
        {props.label}
      </AppText>
    </TouchableOpacity>
  );
}

const getAuthToken = async (tokenUrl: string) => {
  try {
    const response = await fetch(tokenUrl);
    return await response.json();
  } catch (error) {
    return console.error(error);
  }
};

export default CallModal;

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
  actionDisabled: {opacity: 0.5},
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
  modal: {margin: 0},
});
