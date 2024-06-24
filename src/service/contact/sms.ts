import { useMutation, useQuery } from 'react-query'

import { getFromServer, postToServer } from '@vn.starlingTech/api/AppNetworking'

import {
  RespTemplateEmailCategory,
  RespTemplateEmailMessage,
} from '../../types/email.types'
import { ENDPOINT, parseAPIParams, QUERY_KEYS } from '../endpoint'

export function useSmsTemplateCategory() {
  return useQuery(
    [QUERY_KEYS.smsTemplateCategory],
    (): Promise<RespTemplateEmailCategory[]> =>
      getFromServer({
        url: ENDPOINT.smsTemplateCategory,
      }),
  )
}

export function useSmsTemplateMessage(id?: string | number) {
  return useQuery(
    [QUERY_KEYS.smsTemplateMessage + id, id],
    (): Promise<RespTemplateEmailMessage> =>
      getFromServer({
        url: parseAPIParams(ENDPOINT.smsTemplateMessage, { id: id || '' }),
      }),
    { enabled: Boolean(id) },
  )
}

type Params_SmsSending = {
  id: string | number
  params: {
    text: string
    time?: string
  }
}

export function useSmsSending() {
  return useMutation(({ id, params }: Params_SmsSending) =>
    postToServer({
      url: parseAPIParams(ENDPOINT.smsSend, { id }),
      params,
    }),
  )
}
