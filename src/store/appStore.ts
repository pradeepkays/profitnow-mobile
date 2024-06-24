import moment from 'moment'
import { createWithEqualityFn } from 'zustand/traditional'

import { storage, storageKeys } from 'src/storage/storage'
import { User } from 'src/types/user.types'

import { RespAppUserSettings } from './../service/common/common.types'

type SyncingType = {
  contacts: number
  tasks: number
}

type P = keyof SyncingType

type State = {
  accessToken: string
  isTabBar: boolean
  activeRoute: string
  user: User
  userSetting: RespAppUserSettings
  syncing: SyncingType
  dispatchIsTabBar(p: boolean): void
  dispatchSyncing(p: P | P[]): void
}
const useAppStore = createWithEqualityFn<State>(
  (set, get) => ({
    user: {} as User,
    accessToken: storage.getString(storageKeys.accessToken) || '',
    activeRoute: 'HomeWithCalender',
    isTabBar: false,
    userSetting: {} as RespAppUserSettings,
    syncing: {
      contacts: 0,
      tasks: 0,
    },
    dispatchIsTabBar: (isTabBar) => set({ isTabBar }),
    dispatchSyncing: (p) => {
      const tempSyncing = get().syncing
      if (typeof p === 'string') {
        switch (p) {
          case 'contacts':
            tempSyncing.contacts = moment().unix()
            break
          case 'tasks':
            tempSyncing.tasks = moment().unix()
            break
        }
      } else {
        if (p.includes('contacts')) {
          tempSyncing.contacts = moment().unix()
        } else if (p.includes('tasks')) {
          tempSyncing.tasks = moment().unix()
        }
      }
      set({ syncing: tempSyncing })
    },
  }),
  Object.is,
)

export default useAppStore
