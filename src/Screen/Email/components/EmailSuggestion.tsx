import React, { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { TextInput } from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import Animated, { FadeIn } from 'react-native-reanimated'

import { colorDefault } from '@vn.starlingTech/theme/theming'

import { useContactList } from 'src/service/contact/contact'

type Props = {
  label: string
  values: string[]
  onChanged(p: string[]): void
}

export function EmailSuggestion({ label, values, onChanged }: Props) {
  const [text, setText] = useState('')

  const { data, isLoading } = useContactList(
    { email: text },
    undefined,
    Boolean(text),
  )

  //   useEffect(() => {
  //     setText(value)
  //   }, [value])

  const onKeywordChanged = (txt: string) => {
    if (txt !== text) {
      setText(txt)
      //   onChanged(txt)
    }
  }

  const onItemPress = (p: string) => {
    const tmp = [...values]
    if (!tmp.some((x) => x === p)) {
      tmp.push(p)
    }
    onChanged(tmp)
    setText('')
  }

  const onSelectedItemPress = (p: string) => {
    onChanged(values.filter((x) => x !== p))
  }

  const visible = (data && data?.data.length > 0) || isLoading

  const hasValue = values.length > 0

  return (
    <AppBlock row pl={24} mt={10} zIndex={visible ? 1 : 0}>
      <AppText color="label" mt={14} width={36}>
        {label}
      </AppText>
      <AppBlock>
        <TextInput
          style={[styles.textInput, hasValue && styles.inputs]}
          placeholder={'label'}
          value={text}
          onChangeText={onKeywordChanged}
          placeholderTextColor={'rgba (58, 53, 65, 0.38)'}
        />

        {values.length ? (
          <AppBlock row wrap pr={4} width={310}>
            {values.map((item, index) => {
              const onPress = () => {
                onSelectedItemPress(item)
              }
              return (
                <Animated.View entering={FadeIn}>
                  <TouchableOpacity
                    key={'i-' + index}
                    style={styles.selectedItem}
                    onPress={onPress}
                  >
                    <AppText size={12}>
                      {item}
                      {'   '}
                      <AppText weight="700">{'x'}</AppText>
                    </AppText>
                  </TouchableOpacity>
                </Animated.View>
              )
            })}
          </AppBlock>
        ) : null}

        {visible && (
          <ScrollView style={styles.dataList} nestedScrollEnabled>
            {isLoading ? (
              <AppBlock height={50} center>
                <ActivityIndicator />
              </AppBlock>
            ) : null}
            {data?.data.map((item, index) => {
              const onPress = () => {
                onItemPress(item.email)
              }
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={'sg-' + index}
                  style={styles.item}
                >
                  <AppText primary size={15}>
                    {item.title}
                  </AppText>
                  <AppText mt={4} size={14} color="placeholder">
                    {item.email}
                  </AppText>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
      </AppBlock>
    </AppBlock>
  )
}

const styles = StyleSheet.create({
  dataList: {
    backgroundColor: '#f8f8f8',
    borderColor: colorDefault.inputBorder,
    borderRadius: appSize(4),
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: appSize(20),
    maxHeight: appSize(400),
    position: 'absolute',
    top: appSize(48),
    width: appSize(310),
  },
  inputs: { marginBottom: appSize(6) },
  item: {
    borderBottomWidth: 1,
    height: appSize(50),
    justifyContent: 'center',
    paddingHorizontal: appSize(8),
  },
  selectedItem: {
    borderRadius: appSize(6),
    borderWidth: 1,
    marginBottom: appSize(6),
    marginRight: appSize(6),
    paddingHorizontal: appSize(4),
    paddingVertical: appSize(8),
  },
  textInput: {
    borderColor: colorDefault.border,
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
    flex: 1,
    height: appSize(42),
    paddingHorizontal: 12,
    width: appSize(295),
  },
})
