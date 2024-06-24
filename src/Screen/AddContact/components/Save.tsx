import React, { useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'

import { appSize, AppText } from '@starlingtech/element'

import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper'
import { colorDefault } from '@vn.starlingTech/theme/theming'

import { parseResponseError } from 'src/helper/responseHelper'
// import { goBack } from 'src/navigation/navigation'
import NavigationService from 'src/utils/NavigationService'
import { useContactAdd, useContactUpdate } from 'src/service/contact/contact'

import { State } from '../AddContact.types'

type Props = {
  disabled: boolean
  state: State
  dispatchLoading(): void
}

export function AddContactSave(props: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: addContact } = useContactAdd()
  const { mutate: updateContact } = useContactUpdate()

  const onPress = () => {
    const {
      firstname,
      lastname,
      email,
      value,
      companyName,
      status,
      stage,
      streetnumber,
      city,
      state,
      zip,
      country,
      id,
      assignUserId,
      psa,
      title,
      awaiting_feature,
      demo_reporting,
      phones,
      facebook,
      linkdin,
      twitter,
      instagram,
      location,
    } = props.state

    // let phoneNumbers: any[] = []

    // showPhoneCount.map((item) => {
    //   if (item.countryName && item.cellphone) {
    //     let mycountry = CountryList.filter(
    //       (_value) => _value.title === item.countryName,
    //     )
    //     let data = {
    //       // country: mycountry[0].stage,
    //       country: mycountry[0].stage,
    //       phone: item.cellphone,
    //     }
    //     phoneNumbers.push(data)
    //   }
    // })

    const tempPhones: any[] = []

    const forceMainPhone = phones.length < 2
    phones.forEach((x) => {
      if (x.short_phone) {
        tempPhones.push({
          country: x.country,
          short_phone: x.short_phone,
          type: forceMainPhone ? 'Main' : x.type,
          extension: x.ext,
        })
      }
    })

    const data = {
      first_name: firstname,
      last_name: lastname,
      // phone: cellphone,
      phones: tempPhones,

      email: email,
      value: value,
      assigned_user: {
        id: assignUserId,
      },
      address: {
        street_address: streetnumber,
        city: city,
        state: state,
        zip: zip,
        country: country,
      },
      location: {
        id: location?.id,
      },
      organization: {
        id: companyName && companyName.id ? companyName.id : '',
      },
      status: (status && status.status) || 'customers',
      stage: stage?.stage || '',
      additional: [
        {
          id: 0,
          title: '',
          value: '',
        },
      ],
      facebook_url: facebook,
      twitter_url: twitter,
      linkedin_url: linkdin,
      instagram_url: instagram,
      psa,
      awaiting_feature,
      demo_reporting,
      title,
    }

    props.dispatchLoading()
    setIsLoading(true)

    if (id) {
      updateContact(
        { id, params: data },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Contact Update Successfully')
            NavigationService.goBack()
          },
          onSettled: () => {
            setIsLoading(false)
          },
          onError: (error) => {
            const { message } = parseResponseError(error)
            showFlashMessageError(message)
          },
        },
      )
    } else {
      addContact(
        { id, params: data },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Contact Added Successfully')
            NavigationService.goBack()
          },
          onSettled: () => {
            setIsLoading(false)
          },
          onError: (error) => {
            const { message } = parseResponseError(error)
            showFlashMessageError(message)
          },
        },
      )
    }
  }

  return (
    <TouchableOpacity
      disabled={props.disabled || isLoading}
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorDefault.primary,
        paddingHorizontal: appSize(15),
        paddingVertical: appSize(5),
        marginTop: appSize(8),
        borderRadius: appSize(5),
        marginRight: appSize(10),
      }}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <AppText weight="500" size={15} color="white">
          SAVE
        </AppText>
      )}
    </TouchableOpacity>
  )
}
