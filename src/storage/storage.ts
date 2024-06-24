import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  encryptionKey: 'starlingTech',
  id: 'profit-now-storage',
})

export enum storageKeys {
  fcmToken = 'fcmToken',
  accessToken = 'accessToken',
  allUsers = 'allUsers',
  twoFactorStatus = 'twoFactorStatus',
  twoFactorType = 'twoFactorStatus'
}
