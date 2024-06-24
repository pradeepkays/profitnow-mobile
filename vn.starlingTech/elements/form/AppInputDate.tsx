import React, { useEffect, useState } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

import { AppBlock, AppButton, AppText } from '@starlingtech/element'
import { random } from 'lodash'
import moment from 'moment'

import { colorDefault as light, sizes } from '@vn.starlingTech/theme/theming'

import DateSpinner from '../date/DateSpinner'

type InputDateItemProps = {
  // visible: boolean;
  mode: 'date' | 'time' | 'datetime' | 'countdown'
  onChanged: (_date: string) => void
  required?: boolean
  minDate?: any
  maxDate?: any
  display?: 'spinner' | 'calendar'
  disabled?: boolean
  validate?: boolean
  date: string
  label: string
  radius?: number
  placeholder?: string
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
}
export default function (props: InputDateItemProps) {
  const [visible, setVisible] = useState(0)
  const [error, setError] = useState(false)

  const [date, setDate] = useState(props.date)
  const toggleDateVisible = () => {
    setVisible(random(0, 100000))
  }

  const onDateChanged = (_date: string) => {
    setDate(_date)
    props.onChanged(_date)
    setVisible(0)
  }

  useEffect(() => {
    if (props.validate && props.required) {
      setError(props.date === '')
    }
  }, [props.required, props.date, props.validate])

  return (
    <View>
      {/* <AppInputLabel
        label={props.label}
        required={props.required}
        labelStyle={props.labelStyle}
      /> */}
      <AppButton
        disabled={props.disabled}
        flex
        radius={props.radius || 0}
        onPress={toggleDateVisible}
        style={[error && styles.error, styles.inputView, props.style]}
        text={
          date && moment(date).isValid()
            ? moment(date).format('DD/MM/YYYY')
            : props.placeholder || 'Chọn ngày'
        }
        textColor={date ? 'text' : 'placeholder'}
      />
      {error ? (
        <AppBlock padding={10}>
          <AppText style={styles.errorTxt}>Vui lòng chọn ngày tháng</AppText>
        </AppBlock>
      ) : null}
      <DateSpinner
        mode={props.mode}
        display={props.display}
        forceVisible={visible}
        date={date}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onChanged={onDateChanged}
        onCancel={toggleDateVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    borderColor: light.danger,
    borderWidth: 1,
  },
  errorTxt: { color: light.danger, fontSize: 12, fontWeight: '300' },
  inputView: {
    backgroundColor: light.inputBackground,
    borderColor: light.inputBorder,
    borderRadius: sizes.inputRadius,
    borderWidth: 1,
    fontSize: sizes.text,
    maxWidth: sizes.inputMaxWidth,
    paddingLeft: sizes.inputHorizontalPadding,
    paddingRight: 45,
    width: '100%',
  },
})
