import remoteConfig from '@react-native-firebase/remote-config'

import settings from '@vn.starlingTech/config/settings'

import { consoleLog } from './logHelper'

export function getConfig() {
  if (settings.VERSION_CONFIG) {
    try {
      const parameters = remoteConfig().getValue('message')
      consoleLog(parameters, 'remote Config')
    } catch (error) {
      consoleLog(error)
    }
  }
}
