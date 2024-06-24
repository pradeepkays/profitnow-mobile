import React from 'react'
import { StyleSheet } from 'react-native'

import { AppBlock, appSize } from '@starlingtech/element'

import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList'

import { useContactList } from 'src/service/contact/contact'

import { SearchItem } from './components/Search.Item'
import { SearchSkeleton } from './components/Skeleton'

type Props = {
  keyword: string
  status: 'lead' | 'opportunities' | undefined
}

export default function SearchContact({ status, keyword }: Props) {
  const useGetScreenData = (_page: number, offset: number) => {
    return useContactList({
      status,
      limit: 30,
      name: keyword,
      offset,
    })
  }

  const renderItem = (props: any) => {
    return <SearchItem {...props} />
  }

  return (
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
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: appSize(20),
    paddingTop: appSize(20),
  },
})
