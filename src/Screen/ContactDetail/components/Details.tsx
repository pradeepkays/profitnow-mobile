import React from 'react'
import { Linking, ScrollView, StyleSheet } from 'react-native'

import DetailItem from 'src/Component/UserProfileComponent/DetailItem'
// import { navigate } from 'src/navigation/navigation'
import NavigationService from 'src/utils/NavigationService'
import useAppStore from 'src/store/appStore'
import { RespContact } from 'src/types/contact.types'

type Props = {
  data: RespContact | undefined
  emailCallback(): void
  phoneCallback(): void
}

export default function Details(props: Props) {
  const organization = props.data?.organization

  const onCompanyPress = () => {
    if (organization?.id) {
      NavigationService.navigate('CompanyDetails', {
        companyId: organization.id,
      })
    }
  }

  const onWebPress = () => {
    if (organization?.url) {
      const { url } = organization
      const webUrl = !url.includes('http') ? 'https://' + url : url
      Linking.canOpenURL(webUrl).then(() => {
        Linking.openURL(webUrl)
      })
    }
  }

  const phone = props.data?.phones?.find((x) => x.type === 'Main')

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.container}>
      <DetailItem
        image={require('assets/img/companyuser.png')}
        label="Company"
        value={organization?.title || '-'}
        onPress={onCompanyPress}
        disabled={!organization?.id}
      />
      {useAppStore.getState().userSetting.contact_section.show_status && (
        <DetailItem
          image={require('assets/img/arrowuser.png')}
          label="Status"
          value={props.data?.status || '-'}
        />
      )}
      <DetailItem
        image={require('assets/img/AccountBoxuser.png')}
        label="Assigned User"
        value={props.data?.first_name || props.data?.last_name || '-'}
      />
      <DetailItem
        onPress={props.emailCallback}
        image={require('assets/img/emailuser.png')}
        label="Email"
        value={props.data?.email || '-'}
        disabled={!props.data?.email}
      />
      <DetailItem
        onPress={props.phoneCallback}
        image={require('assets/img/calluser.png')}
        label="Phone"
        value={phone ? phone.phone_formatted : '-'}
      />
      <DetailItem
        onPress={onWebPress}
        image={require('assets/img/workuser.png')}
        label="Work Website"
        value={organization?.url || '-'}
        disabled={!organization?.url}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
})
