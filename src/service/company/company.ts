import { useQuery } from 'react-query'

import { RespOrganization } from 'src/types/company.types'
import { RespLocation } from 'src/types/location.types'
import { getFromServer } from 'vn.starlingTech/api/AppNetworking'

import { RespCompanyUsers } from './company.types'
import { ENDPOINT, QUERY_KEYS } from '../endpoint'

export function useCompanyUsers() {
  return useQuery(
    [QUERY_KEYS.companyUsers],
    (): Promise<RespCompanyUsers> =>
      getFromServer({ url: ENDPOINT.companyUsers }),
  )
}

export function useCompanyLocation() {
  return useQuery(
    [QUERY_KEYS.locationList],
    (): Promise<RespLocation> => getFromServer({ url: ENDPOINT.locationList }),
  )
}

export function useCompanyList(params: any, timing?: number, enabled = true) {
  const _params = { ...params, offset: undefined }

  return useQuery(
    [QUERY_KEYS.organization + JSON.stringify(_params), params, timing],
    (): Promise<RespOrganization> =>
      getFromServer({ url: ENDPOINT.organizations, params }),
    { enabled },
  )
}
