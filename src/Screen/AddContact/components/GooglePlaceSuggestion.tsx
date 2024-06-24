import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native'

import { appSize, AppText } from '@starlingtech/element'

import { colorDefault } from '@vn.starlingTech/theme/theming'

import { useCityAutocomplete } from 'src/service/location/location'

type Props = {
  label: string
  country?: string
  value: string
  onChanged(p: string): void
  type: 'country' | 'state' | 'city'
}

type DataType = {
  value: string
  title: string
}

export function GooglePlaceSuggestion({
  label,
  value,
  type,
  country,
  onChanged,
}: Props) {
  const [text, setText] = useState('')
  const [suggestionsList, setSuggestionsList] = useState<DataType[]>([])
  const [isPressed, setIsPressed] = useState(false)

  const { mutate: getPlaceSuggestion } = useCityAutocomplete(type)

  useEffect(() => {
    setText(value)
  }, [value])

  const getSuggestions = (txt: string) => {
    getPlaceSuggestion(
      { keyword: txt, country },
      {
        onSuccess: (data) => {
          const temp = data.data.predictions.map((x) => ({
            value: x.structured_formatting.main_text,
            title: x.description,
          }))
          setSuggestionsList(temp)
        },
      },
    )
  }

  const onKeywordChanged = (txt: string) => {
    setIsPressed(false)
    if (txt !== text) {
      getSuggestions(txt)
      setText(txt)
      onChanged(txt)
    }
  }

  const disabled = suggestionsList.some((x) => x.value === text)

  return (
    <View>
      <AppText size={14} style={styles.label}>
        {label}
      </AppText>
      <TextInput
        style={[
          styles.textInput,
          (!isPressed && text && !disabled && styles.cityInput) || undefined,
        ]}
        placeholder={label}
        value={text}
        onChangeText={onKeywordChanged}
        placeholderTextColor={'rgba (58, 53, 65, 0.38)'}
      />
      {!isPressed && text && !disabled ? (
        <View style={styles.dataList}>
          {suggestionsList.map((item, index) => {
            const onPress = () => {
              setText(item.value)
              onChanged(item.value)
              setIsPressed(true)
            }
            return (
              <TouchableOpacity
                onPress={onPress}
                key={'sg-' + index}
                style={styles.item}
              >
                <AppText primary>{item.title}</AppText>
              </TouchableOpacity>
            )
          })}
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  cityInput: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 0,
  },
  dataList: {
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: appSize(4),
    borderBottomRightRadius: appSize(4),
    borderTopWidth: 0,
    borderWidth: 1,
    marginBottom: appSize(20),
  },
  item: {
    borderBottomWidth: 1,
    height: appSize(40),
    justifyContent: 'center',
    paddingHorizontal: appSize(8),
  },
  label: {
    color: '#7E8EAA',
    flex: 1,
    marginBottom: 5,
  },
  textInput: {
    borderColor: colorDefault.border,
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
    flex: 1,
    height: 50,
    marginBottom: appSize(18),
    marginTop: 5,
    paddingHorizontal: 12,
  },
})
