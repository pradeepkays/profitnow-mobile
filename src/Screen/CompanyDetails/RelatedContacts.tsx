import React from 'react'
import { StyleSheet } from 'react-native'

import { AppBlock, appSize } from '@starlingtech/element'

import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList'

import Header from 'components/Header'
import { AppScreenProps } from 'src/navigation/navigation.types'
import { useContactList } from 'src/service/contact/contact'

import { SearchItem } from '../Search/components/Search.Item'
import { SearchSkeleton } from '../Search/components/Skeleton'

export function RelatedContacts({ navigation, route }: AppScreenProps) {
  const organization = route?.params?.organizationId

  const useGetScreenData = (_page: number, offset: number) => {
    return useContactList({
      limit: 30,
      organization: organization,
      offset,
    })
  }

  const renderItem = (props: any) => {
    return <SearchItem {...props} />
  }

  return (
    <AppBlock flex background="white">
      <Header
        title={'People Associated'}
        Limg={require('assets/img/back.png')}
        Lpress={navigation.goBack}
      />
      <AppFlatList
        useGetScreenData={useGetScreenData}
        limit={30}
        renderItem={renderItem}
        // timing={timing}
        skeleton={
          <AppBlock padding={20}>
            <SearchSkeleton />
          </AppBlock>
        }
        listContainerStyle={styles.contentContainer}
      />
    </AppBlock>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: appSize(20),
    paddingTop: appSize(20),
  },
})
