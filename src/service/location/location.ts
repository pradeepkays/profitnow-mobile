import axios from 'axios'
import { useMutation } from 'react-query'

import countries from 'src/data/countries.json'

import { RespPlaceAutocomplete } from './location.types'

export const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api/'
export const GOOGLE_MAP_API_KEY = 'AIzaSyBX2neEMACfKaRy2ItAqYL7sAzY48vHsEY'

export function useCityAutocomplete(type: 'country' | 'state' | 'city') {
  let types = ''
  switch (type) {
    case 'city':
      types = '(cities)'
      break
    case 'country':
      types = 'country'
      break
    case 'state':
      types = 'administrative_area_level_1'
      break
  }

  return useMutation(
    ({
      keyword,
      country,
    }: {
      keyword: string
      country?: string
    }): Promise<{ data: RespPlaceAutocomplete }> => {
      const params: any = {
        input: keyword,
        types,
        key: GOOGLE_MAP_API_KEY,
      }
      const countryCode = countries.find((x) => x.name === country)
      if (countryCode) {
        params.components = 'country:' + countryCode?.code.toLowerCase()
      }

      return axios.get(GOOGLE_MAP_API + 'place/autocomplete/json', {
        params,
      })
    },
  )
}
