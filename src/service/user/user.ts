import { useMutation } from 'react-query'

import { storage, storageKeys } from 'src/storage/storage'
import { RespProfile } from 'src/types/user.types'
import { getFromServer, postToServer, putToServer } from 'vn.starlingTech/api/AppNetworking'

import { ENDPOINT } from '../endpoint'
import { Platform } from 'react-native'

export function useFcmToken() {
  return useMutation(
    (token: string) =>
      putToServer({ url: ENDPOINT.addIosToken, params: { firebase_token: token, platform: Platform.OS } }),
    {
      onSuccess: (_, variable) => {
        storage.set(storageKeys.fcmToken, variable)
      },
    },
  )
}

export function useProfile() {
  return useMutation(
    (): Promise<RespProfile> => getFromServer({ url: ENDPOINT.profile }),
  )
}

export function useProfileWithToken() {
  return useMutation(
    (token: string): Promise<RespProfile> =>
      getFromServer({ url: ENDPOINT.profile, header: { access_token: token } }),
  )
}
