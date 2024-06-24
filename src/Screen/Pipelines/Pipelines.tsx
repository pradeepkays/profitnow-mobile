import React from 'react'

import { AppScreenProps } from 'src/navigation/navigation.types'
import useAppStore from 'src/store/appStore'

import { PipelinesCompany } from './Pipelines.Company'
import PipelinesContacts from './Pipelines.Contacts'

const Pipelines = (props: AppScreenProps) => {
  const default_status_view = useAppStore(
    (s) => s.userSetting.default_status_view,
  )

  if (default_status_view === 'contact') {
    return <PipelinesContacts {...props} />
  }
  return <PipelinesCompany {...props} />
}

export default Pipelines
