import { useQuery } from 'react-query'

import { getFromServer } from '@vn.starlingTech/api/AppNetworking'

import { RespOrganization } from './../../types/company.types'
import { ENDPOINT, QUERY_KEYS } from '../endpoint'

export function useOrganizationList(
  params: any,
  timing?: number,
  enabled = true,
) {
  const _params = { ...params, offset: undefined }

  return useQuery(
    [QUERY_KEYS.organization + JSON.stringify(_params), params, timing],
    (): Promise<RespOrganization> =>
      getFromServer({ url: ENDPOINT.organizations, params }),
    { enabled },
  )
}
