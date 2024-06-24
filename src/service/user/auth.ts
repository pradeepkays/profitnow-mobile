import { useMutation } from 'react-query'

import { RespLogin } from 'src/types/user.types'
import { postToServer } from 'vn.starlingTech/api/AppNetworking'

import { ENDPOINT } from '../endpoint'

type Params_Login = {
  login: string
  password: string
  device_name: string
}

export function useLogin() {
  return useMutation(
    (params: Params_Login): Promise<RespLogin> =>
      postToServer({ url: ENDPOINT.login, params }),
  )
}
