import { useMutation } from 'react-query'

import { postToServer } from '@vn.starlingTech/api/AppNetworking'

import { ENDPOINT, parseAPIParams } from '../endpoint'

type Params_TaskCreate = {
  contactId: string
  params: {
    text: string
    time_scheduled: string
    reminder: string | number
    priority?: string | number
    status?: string
    user_id?: string | number
  }
}

export function useTaskCreate() {
  return useMutation(({ contactId, params }: Params_TaskCreate) =>
    postToServer({
      url: parseAPIParams(ENDPOINT.taskCreate, { contact_id: contactId }),
      params,
    }),
  )
}
