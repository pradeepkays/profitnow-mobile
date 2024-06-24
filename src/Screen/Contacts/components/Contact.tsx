import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { AppBlock, AppText } from '@starlingtech/element'
import moment from 'moment'

import { appSize } from '@vn.starlingTech/config/AppConstant'
import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList'

import { useContactList } from 'src/service/contact/contact'
// import useAppStore from 'src/store/appStore'
import { useContactsStore } from 'src/store/contactsStore'

import { renderContactItem } from './Contact.Item'
import { Skeleton } from './Contact.Skeleton'

export default function Contact() {
  const contactFilter = useContactsStore((s) => s.contactFilter)
  // const syncingContact = useAppStore((s) => s.syncing.contacts)
  const resetContactFilter = useContactsStore((s) => s.resetContactFilter)

  const [timing, setTiming] = useState(0)

  useEffect(() => {
    setTiming(moment().unix())
  }, [contactFilter])

  const useGetScreenData = (_page: number, offset: number) => {
    return useContactList({
      ...contactFilter,
      offset,
    })
  }

  const hasFilter =
    contactFilter.user ||
    contactFilter.phone ||
    contactFilter.psa ||
    contactFilter.city ||
    contactFilter.country ||
    contactFilter.awaiting_feature ||
    contactFilter.demo_recording ||
    contactFilter.confidence_level ||
    contactFilter.title ||
    contactFilter.orderby ||
    contactFilter.state

  return (
    <>
      {hasFilter ? (
        <TouchableOpacity
          style={{ alignItems: 'flex-end', padding: 10 }}
          onPress={resetContactFilter}
        >
          <AppText primary>RESET</AppText>
        </TouchableOpacity>
      ) : null}
      <AppFlatList
        useGetScreenData={useGetScreenData}
        limit={contactFilter.limit}
        renderItem={renderContactItem}
        timing={timing}
        skeleton={
          <AppBlock padding={20}>
            <Skeleton />
          </AppBlock>
        }
        listContainerStyle={styles.contentContainer}
      />
    </>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: appSize(20),
    paddingTop: appSize(20),
  },
})
