import React, { ReactElement } from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'

import { AppBlock } from '@starlingtech/element'
import { useRefresh } from '@starlingtech/util'

import { errorHandler } from '@vn.starlingTech/api/AppNetworking'
import { useAppQuery } from '@vn.starlingTech/api/AppQuery'
import { sizes } from '@vn.starlingTech/theme/theming'

import { ResponseContainer } from './container/AppResponse'

type Props = {
  screenQuery: string
  getScreenData: (...params: any) => void
  renderContent: (data: any | undefined) => ReactElement
  screenParams?: any
  scrollMode?: 'auto' | 'manual'
  timing?: number
}

export default function AppSingleContent(props: Props) {
  const { isLoading, data, isError, isSuccess, error, refetch } = useAppQuery(
    [props.screenQuery, props.timing],
    () => props.getScreenData(props.screenParams),
  )

  const { isRefreshing, onRefresh } = useRefresh(refetch)

  let responseMessage = ''
  if (isError) {
    responseMessage = errorHandler(error).message
  }

  const contentView = (
    <ResponseContainer
      success={isSuccess}
      processing={isLoading}
      message={responseMessage}
      tryAgain={refetch}
    >
      {!isSuccess ? <AppBlock /> : props.renderContent(data)}
    </ResponseContainer>
  )

  if (props.scrollMode === 'manual') {
    return contentView
  }

  return (
    <ScrollView
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      {contentView}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: sizes.padding,
    paddingTop: sizes.padding,
  },
})
