import { createWithEqualityFn } from 'zustand/traditional'

export enum CONTACT_ORDER_BY {
  arr = 'arr',
  arr_desc = 'arr_desc',
  mrr = 'mrr',
  mrr_desc = 'mrr_desc',
  confidence_level = 'confidence_level',
  confidence_level_desc = 'confidence_level_desc',
  deal_close_date = 'deal_close_date',
  deal_close_date_desc = 'deal_close_date_desc',
  touches_asc = 'touches_asc',
  touches_desc = 'touches_desc',
  value_asc = 'value_asc',
  value_desc = 'value_desc',
  title = 'title',
  title_desc = 'title_desc',
  psa = 'psa',
  psa_desc = 'psa_desc',
  awaiting_feature = 'awaiting_feature',
  awaiting_feature_desc = 'awaiting_feature_desc',
  demo_recording = 'demo_recording',
  demo_recording_desc = 'demo_recording_desc',
}

type ContactFilterType = {
  limit: number
  status: string
  stage: string
  last_name_beginning: string
  name: string
  tags: string
  user: string
  organization: string | number
  phone: string
  title: string
  awaiting_feature: string
  psa: string
  demo_recording: string
  city: string
  state: string
  country: string
  confidence_level: string
  touches: string | number
  orderby: CONTACT_ORDER_BY | ''
}

type State = {
  contactFilter: ContactFilterType
  dispatchContactFilter(p: Partial<ContactFilterType>): void
  resetContactFilter(): void
}
export const useContactsStore = createWithEqualityFn<State>(
  (set) => ({
    contactFilter: {
      limit: 15,
      status: '',
      stage: '',
      last_name_beginning: '',
      name: '',
      tags: '',
      user: '',
      organization: '',
      title: '',
      phone: '',
      awaiting_feature: '',
      psa: '',
      demo_recording: '',
      city: '',
      state: '',
      country: '',
      confidence_level: '',
      touches: '',
      orderby: '',
    },
    dispatchContactFilter: (contactFilter) =>
      set((state) => ({
        contactFilter: { ...state.contactFilter, ...contactFilter },
      })),
    resetContactFilter: () => {
      set({ contactFilter: initContactFilter })
    },
  }),
  Object.is,
)

const initContactFilter: ContactFilterType = {
  limit: 15,
  status: '',
  stage: '',
  last_name_beginning: '',
  name: '',
  tags: '',
  user: '',
  organization: '',
  title: '',
  phone: '',
  awaiting_feature: '',
  psa: '',
  demo_recording: '',
  city: '',
  state: '',
  country: '',
  confidence_level: '',
  touches: '',
  orderby: '',
}
