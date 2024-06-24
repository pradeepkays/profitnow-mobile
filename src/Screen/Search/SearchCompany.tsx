import React from 'react'
import { StyleSheet } from 'react-native'

import { AppBlock, appSize } from '@starlingtech/element'

import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList'

import { useCompanyList } from 'src/service/company/company'

import { SearchItemCompany } from './components/Search.ItemCompany'
import { SearchSkeleton } from './components/Skeleton'

type Props = {
  keyword: string
  size: string
}

export default function SearchCompany({ size, keyword }: Props) {
  const useGetScreenData = (_page: number, offset: number) => {
    return useCompanyList({
      employees: size,
      limit: 30,
      title: keyword,
      offset,
    })
  }

  const renderItem = (props: any) => {
    return <SearchItemCompany {...props} />
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
