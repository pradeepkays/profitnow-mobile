import { showAlertMessage } from '@starlingtech/util'

import { getString } from '@vn.starlingTech/lang/language'
import useAuthStore from '@vn.starlingTech/store/authStore'

let isShowingSingOutMsg = false

export function showSignOutMessage() {
  const signOut = useAuthStore.getState().signOut
  if (!isShowingSingOutMsg) {
    isShowingSingOutMsg = true
    showAlertMessage({
      ...getString().tokenExpired,
      onPress: () => {
        isShowingSingOutMsg = false
        signOut()
      },
      cancelable: false,
    })
  }
}
