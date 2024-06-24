import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware'

import { initHeader } from '@vn.starlingTech/api/AppNetworking'

export interface UserProfileType {
  // id: string | number
  // phone: string
  // name: string
  // avatar: string
  token: string
}

type AuthStore = {
  user: UserProfileType
  _hasHydrated: boolean
} & {
  setToken: (token: string) => void
  signOut: () => void
  setHasHydrated: (p: boolean) => void
}

type MyPersist = (
  config: StateCreator<AuthStore>,
  options: PersistOptions<AuthStore>,
) => StateCreator<AuthStore>

const useAuthStore = create<AuthStore>(
  (persist as MyPersist)(
    (set) => ({
      user: {} as UserProfileType,
      setToken: (token) =>
        set(() => {
          initHeader(token)

          //TODO: dispatch user profile
          // try {
          //   const user = getFromServer({url: ENDPOINT.login})
          // } catch {}

          return { user: { token } }
        }),
      signOut: () =>
        set(() => {
          initHeader()
          return { user: {} as UserProfileType }
        }),
      _hasHydrated: false,
      setHasHydrated: (p: boolean) => {
        set({
          _hasHydrated: p,
        })
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

export default useAuthStore
