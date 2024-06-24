import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { getBuildNumber, getVersion } from 'react-native-device-info'

import { showFlashMessageError } from '@vn.starlingTech/helpers/flashMessageHelper'
import { consoleLog } from '@vn.starlingTech/helpers/logHelper'

import BottomSheetComponent from 'components/BottomSheetComponent'
import { color, font } from 'components/Styles'
import { useLogin } from 'src/service/user/auth'
import { useProfileWithToken } from 'src/service/user/user'
import { storage, storageKeys } from 'src/storage/storage'
import { User } from 'src/types/user.types'

import { SignedUser } from './AccountItem'

type Props = {
  signedInUsers: SignedUser[]
  visible: boolean
  onClose(): void
  onSuccess(): void
}
const { height } = Dimensions.get('window')

export function LoginPrompt(props: Props) {
  const { visible, signedInUsers, onClose, onSuccess } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isExist, setIsExist] = useState(false)

  const { mutate: mutateLogin } = useLogin()
  const { mutate: getProfile } = useProfileWithToken()

  useEffect(() => {
    if (email) {
      setIsExist(signedInUsers.some((x) => x.user.email === email))
    } else {
      setIsExist(false)
    }
  }, [email, signedInUsers])

  useEffect(() => {
    if (!visible) {
      setEmail('')
      setPassword('')
      setError('')
    }
  }, [visible])

  const onLoginPress = () => {
    if (!email) {
      setError('Please enter email')
      return
    } else if (!password) {
      setError('Please enter password')
      return
    }
    setError('')
    const params = {
      login: email,
      password: password,
      device_name: `${Platform.OS}${getVersion()}(${getBuildNumber()})`,
    }
    setIsLoading(true)

    mutateLogin(params, {
      onSuccess: ({ access_token }) => {
        getProfile(access_token, {
          onSuccess: (data) => {
            setIsLoading(false)
            const user: User = {
              ...data,
              additional: data.additional[1].value,
            }
            const temp = [...signedInUsers]
            temp.push({ user, accessToken: access_token })
            consoleLog(temp, 'sign')
            storage.set(storageKeys.allUsers, JSON.stringify(temp))
            onSuccess()
          },
          onError: () => {
            showFlashMessageError('Something went wrong')
            setIsLoading(false)
          },
        })
      },
      onError: (_error: any) => {
        setIsLoading(false)
        const { message } = JSON.parse(_error.message)
        setError(message)
      },
    })
  }

  return (
    <BottomSheetComponent isVisible={visible} onRequestClose={onClose}>
      <View>
        <View
          style={{
            height: (height / 100) * 85,
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollStyle}>
            <Text style={styles.textTile}>Email</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.fieldView}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            {isExist && (
              <Text style={styles.errorText}>User already exists</Text>
            )}
            <Text style={styles.textTile}>Password</Text>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              style={styles.fieldView}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />

            {error.length > 1 && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              disabled={isExist}
              onPress={onLoginPress}
              style={styles.filterBtn}
            >
              {isLoading ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text style={styles.filterText}>Log In</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </BottomSheetComponent>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontFamily: font.reg,
    marginBottom: 5,
    marginTop: 10,
  },
  fieldView: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 0.5,
    color: '#000',
    height: 50,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  filterBtn: {
    alignItems: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
    marginBottom: 35,
    marginTop: 10,
  },
  filterText: {
    color: '#fff',
    fontFamily: font.semi,
    fontSize: 15,
  },

  scrollStyle: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 20,
  },
  textTile: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    marginBottom: 5,
    marginTop: 10,
  },
})
