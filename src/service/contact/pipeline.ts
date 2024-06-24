import { useQuery } from 'react-query'

import { getFromServer } from '@vn.starlingTech/api/AppNetworking'

import { RespPipeline } from 'src/types/pipeline.types'

import { ENDPOINT, QUERY_KEYS } from '../endpoint'

export function usePipelineTree(enabled: boolean) {
  return useQuery(
    [QUERY_KEYS.pipelines],
    (): Promise<RespPipeline[]> => getFromServer({ url: ENDPOINT.pipelines }),
    { enabled },
  )
}
