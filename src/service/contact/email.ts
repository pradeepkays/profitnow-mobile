import { useMutation, useQuery } from 'react-query'

import { getFromServer, postToServer } from '@vn.starlingTech/api/AppNetworking'

import {
  RespTemplateEmailCategory,
  RespTemplateEmailMessage,
} from './../../types/email.types'
import { ENDPOINT, parseAPIParams, QUERY_KEYS } from '../endpoint'

export function useEmailTemplateCategory() {
  return useQuery(
    [QUERY_KEYS.emailTemplateCategory],
    (): Promise<RespTemplateEmailCategory[]> =>
      getFromServer({
        url: ENDPOINT.emailTemplateCategory,
      }),
  )
}

export function useEmailTemplateMessage(id?: string | number) {
  return useQuery(
    [QUERY_KEYS.emailTemplateMessage + id, id],
    (): Promise<RespTemplateEmailMessage> =>
      getFromServer({
        url: parseAPIParams(ENDPOINT.emailTemplateMessage, { id: id || '' }),
      }),
    { enabled: Boolean(id) },
  )
}

type Params_EmailSending = {
  id: string | number
  params: {
    subject: string
    message: string
    time?: string
    cc_list?: string[]
    bcc_list?: string[]
  }
}

export function useEmailSending() {
  return useMutation(({ id, params }: Params_EmailSending) =>
    postToServer({
      url: parseAPIParams(ENDPOINT.emailSend, { id }),
      params,
    }),
  )
}
