import React, { ReactElement, useReducer } from 'react'
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { size } from 'lodash'
import { useInfiniteQuery } from 'react-query'

import { errorHandler } from '@vn.starlingTech/api/AppNetworking'
import { APIResponseType } from '@vn.starlingTech/api/type'
import { getString } from '@vn.starlingTech/lang/language'
import { sizes, useAppTheme } from '@vn.starlingTech/theme/theming'

import {
  initScreenState,
  screenReducer,
  ScreenState,
} from './AppInfiniteReducer'
import {
  ListEmptyComponent,
  ListEndReachedFooter,
} from '../container/AppList.Container'
import { ResponseContainer } from '../container/AppResponse'

type Props = {
  screenQuery: string // unique identifier string for the cached query
  getScreenData: (params: any) => Promise<APIResponseType>
  renderItem: ListRenderItem<any>
  renderHeader?: ReactElement | null
  numColumns?: number
  listContainerStyle?: ViewStyle
  onDataLoaded?: (total: number) => void // to be called when data is loaded
  screenParams?: any
  emptyMessage?: string //custom message to be displayed
  stickyHeader?: () => ReactElement
}

interface State extends ScreenState {
  data: any[]
}

const initState: State = { ...initScreenState, data: [] }

export default function (props: Props) {
  const { colors } = useAppTheme()
  const [state, dispatch] = useReducer(screenReducer, initState)

  const resA = useInfiniteQuery(
    [props.screenQuery, state.timing],
    ({ pageParam = 1 }) => {
      return props.getScreenData({
        page: pageParam,
        ...props.screenParams,
        // token: user?.token,
        // limit: AppConstants.LIST_SIZE,
      })
    },
    {
      getPreviousPageParam: (firstPage) =>
        Number(firstPage.page) > 1 ? Number(firstPage.page) - 1 : false,
      getNextPageParam: (lastPage) =>
        Number(lastPage.page) < Number(lastPage.total_pages)
          ? Number(lastPage.page) + 1
          : false,
    },
  )

  const {
    refetch,
    isLoading,
    isError,
    isSuccess,
    data: resData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = resA

  // consoleLog(resA, 'resA')

  let responseMessage = state.responseMessage
  let getNextDataMessage = ''
  if (isError && error) {
    const { message } = errorHandler(error)
    if (state.page === 1) {
      responseMessage = message
    } else {
      getNextDataMessage = message
    }
  } else if (isSuccess) {
    responseMessage = ''
  }

  let currentList: any[] = state.data as any[]
  if (resData) {
    currentList = []
    resData.pages.map(({ data }) => {
      //TODO: for get types
      currentList = [...currentList, ...data]
    })
  }
  const onRefresh = async () => {
    dispatch({ type: 'REFRESH', data: currentList })
  }

  React.useEffect(() => {
    if (props.onDataLoaded) {
      if (!isFetching && isSuccess && currentList) {
        props.onDataLoaded(resData?.pages[0].total || 0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isSuccess, currentList])

  const onEndReached = async () => {
    if (!isFetchingNextPage && isSuccess && hasNextPage) {
      loadNextData(state.page + 1)
    }
  }

  const loadNextData = async (page: number = state.page) => {
    dispatch({ type: 'LOAD_MORE', page })
    fetchNextPage()
  }

  function handlerNextDataMessage() {
    if (isFetchingNextPage) {
      getNextDataMessage = ''
    }
    if (!hasNextPage) {
      getNextDataMessage = getString().endDataMessage
    }
  }

  const hasCached = size(currentList) > 0
  const screenIsLoading = isLoading && !hasCached

  handlerNextDataMessage()

  return (
    <>
      {props.stickyHeader && props.stickyHeader()}
      <ResponseContainer
        success={isSuccess}
        color={colors.text}
        processing={screenIsLoading}
        tryAgain={refetch}
        page={state.page}
        hasCached={hasCached}
        message={responseMessage}
      >
        <FlatList
          data={currentList}
          refreshing={state.refreshing && isLoading}
          numColumns={props.numColumns || 1}
          renderItem={props.renderItem}
          keyExtractor={keyExtractor}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          ListHeaderComponent={props.renderHeader}
          ListFooterComponent={
            isError && state.page === 1 ? (
              <View style={styles.h30} />
            ) : (
              <>
                <ListEndReachedFooter
                  isError={isError}
                  tryAgain={loadNextData}
                  page={state.page}
                  message={getNextDataMessage}
                />
                <View style={styles.h30} />
              </>
            )
          }
          ListEmptyComponent={
            <ListEmptyComponent message={props.emptyMessage} />
          }
          contentContainerStyle={[
            styles.listContainer,
            props.listContainerStyle,
          ]}
        />
      </ResponseContainer>
    </>
  )
}

export const keyExtractor = (item: any, index: any) => index.toString()

const styles = StyleSheet.create({
  h30: { height: 30 },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: sizes.padding,
    paddingTop: sizes.padding,
  },
})
