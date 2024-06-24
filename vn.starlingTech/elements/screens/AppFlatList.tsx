import React, { ReactElement, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { UseQueryResult } from 'react-query'

import { errorHandler } from '@vn.starlingTech/api/AppNetworking'
import AppConstant from '@vn.starlingTech/config/AppConstant'
import { useAppTheme } from '@vn.starlingTech/theme/theming'

import {
  ListEmptyComponent,
  ListEndReachedFooter,
} from './container/AppList.Container'
import { ResponseContainer } from './container/AppResponse'

type Props = {
  useGetScreenData: (
    page: number,
    offset: number,
  ) => UseQueryResult<any, unknown>
  renderItem: ListRenderItem<any>
  renderHeader?: ReactElement | null
  numColumns?: number
  noPaging?: boolean
  listContainerStyle?: ViewStyle
  onDataLoaded?: (total: number) => void
  timing?: number
  limit?: number
  skeleton?: ReactElement
  params?: any
}

export default function AppFlatList(props: Props) {
  const { limit: LIMIT = AppConstant.LIST_SIZE } = props

  const { colors } = useAppTheme()

  const page = useRef(1)
  const hasNextPage = useRef(false)
  const prevData = useRef<any[]>([])

  const [listData, setListData] = useState<any[]>([])

  const { isLoading, data, isError, isSuccess, refetch, error } =
    props.useGetScreenData(page.current, (page.current - 1) * LIMIT)

  useEffect(() => {
    if (data) {
      hasNextPage.current = data && data.data.length >= LIMIT
      if (page.current === 1) {
        prevData.current = data?.data || []
      } else {
        prevData.current = [...prevData.current, ...data.data]
      }
      setListData(prevData.current)
    }
  }, [LIMIT, data])

  useEffect(() => {
    if (props.timing) {
      page.current = 1
      refetch()
    }
  }, [props.timing, refetch])

  const onRefresh = () => {
    page.current = 1
    setTimeout(refetch, 500)
  }

  const onEndReached = async () => {
    if (isSuccess && hasNextPage.current) {
      page.current++
      refetch()
    }
  }

  const hasCached = prevData.current.length > 0
  const screenIsLoading = isLoading && !hasCached

  let responseMessage = ''
  let getNextDataMessage = ''
  if (isError && error) {
    const { message } = errorHandler(error, 'manual')
    if (page.current === 1) {
      responseMessage = message
    } else {
      getNextDataMessage = message
    }
  } else if (isSuccess) {
    responseMessage = ''
  }

  let footer = <View style={styles.h30} />
  if (!props.noPaging && isSuccess && hasNextPage.current) {
    footer = (
      <>
        <ListEndReachedFooter
          isError={isError}
          tryAgain={refetch}
          page={page.current}
          message={getNextDataMessage}
        />
        <View style={styles.h30} />
      </>
    )
  }

  return (
    <ResponseContainer
      success={isSuccess}
      color={colors.text}
      processing={screenIsLoading}
      tryAgain={refetch}
      page={page.current}
      hasCached={hasCached}
      message={responseMessage}
      skeleton={props.skeleton}
    >
      <FlatList
        data={listData}
        refreshing={
          page.current === 1 && isLoading && prevData.current.length > 0
        }
        numColumns={props.numColumns || 1}
        renderItem={props.renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={props.renderHeader}
        ListFooterComponent={footer}
        ListEmptyComponent={ListEmptyComponent}
        extraData={listData}
        contentContainerStyle={[styles.listContainer, props.listContainerStyle]}
      />
    </ResponseContainer>
  )
}

export const keyExtractor = (_item: any, index: any) => index.toString()

const styles = StyleSheet.create({
  h30: { height: 30 },
  listContainer: {
    flexGrow: 1,
    paddingTop: 16,
  },
})
