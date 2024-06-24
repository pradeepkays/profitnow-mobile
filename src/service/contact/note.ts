import { useMutation } from 'react-query'

import { postToServer } from '@vn.starlingTech/api/AppNetworking'

import { ENDPOINT, parseAPIParams } from '../endpoint'

type Params_EmailSending = {
  id: string | number
  text: string
}

export function useNoteAdding() {
  return useMutation(({ id, text }: Params_EmailSending) =>
    postToServer({
      url: parseAPIParams(ENDPOINT.noteAdding, { contact_id: id }),
      params: { text },
    }),
  )
}
