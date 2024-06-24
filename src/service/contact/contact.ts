import { useMutation, useQuery } from 'react-query'

import {
  getFromServer,
  patchToServer,
  postToServer,
} from '@vn.starlingTech/api/AppNetworking'

import { RespContact, RespContacts } from 'src/types/contact.types'

import { ENDPOINT, parseAPIParams, QUERY_KEYS } from '../endpoint'

export function useContactList(params: any, timing?: number, enabled = true) {
  const _params = { ...params, offset: undefined }

  return useQuery(
    [QUERY_KEYS.contacts + JSON.stringify(_params), params, timing],
    (): Promise<RespContacts> =>
      getFromServer({ url: ENDPOINT.contacts, params }),
    { enabled },
  )
}

export function useContactById(id: string | number) {
  return useQuery(
    [QUERY_KEYS.contactId + id],
    (): Promise<RespContact> =>
      getFromServer({ url: parseAPIParams(ENDPOINT.contactById, { id }) }),
  )
}

export function useCustomerStatus() {
  return useMutation((id: string | number) =>
    postToServer({
      url: parseAPIParams(ENDPOINT.contactStatus, { id }),
    }),
  )
}

type Params_ContactUpdate = {
  id: string | number
  params: any
}

export function useContactUpdate() {
  return useMutation(
    (params: Params_ContactUpdate): Promise<RespContact> =>
      patchToServer({
        url: parseAPIParams(ENDPOINT.contactById, { id: params.id }),
        params: params.params,
      }),
  )
}

export function useContactAdd() {
  return useMutation(
    (params: Params_ContactUpdate): Promise<RespContact> =>
      postToServer({
        url: ENDPOINT.contactsNew,
        params: params.params,
      }),
  )
}