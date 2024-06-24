import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { appSize } from '@vn.starlingTech/config/AppConstant'

import { AppBlock } from '@starlingtech/element'
import { color } from 'components/Styles'

interface IOtpInput {
  onChange: (value: string) => void
}

const OtpInput = ({ onChange }: IOtpInput) => {
  const [value, setValue] = useState(new Array(6))
  const inputRef = new Array(6).fill(useRef)
  const onChangeInput = (inputValue: string, index: number) => {
    if (index < inputRef.length) {
      const otpArray = [...value]
      otpArray[index] = inputValue
      setValue(otpArray)
      if (inputValue) {
        if (index < inputRef.length - 1) {
          inputRef[index + 1].focus()
        }
      }
      if (inputValue === '') {
        if (index > 0) {
          inputRef[index - 1].focus()
        }
      }
      if (onChange) {
        onChange(otpArray.join(''))
      }
    }
  }

  return (
    <AppBlock style={Styles.mainContainer}>
      <AppBlock style={Styles.inputContainer}>
        <TextInput
          ref={(input) => (inputRef[0] = input)}
          style={[Styles.inputBox, Styles.firstInput]}
          maxLength={1}
          onChangeText={(val) => onChangeInput(val, 0)}
          keyboardType="numeric"
        />
        <TextInput
          ref={(input) => (inputRef[1] = input)}
          style={Styles.inputBox}
          maxLength={1}
          onChangeText={(val) => onChangeInput(val, 1)}
          keyboardType="numeric"
        />
        <TextInput
          ref={(input) => (inputRef[2] = input)}
          style={Styles.inputBox}
          maxLength={1}
          onChangeText={(val) => onChangeInput(val, 2)}
          keyboardType="numeric"
        />
      </AppBlock>
      <AppBlock style={Styles.horizontalLine} />
      {/* <AppBlock border={1} width={10.98}></AppBlock> */}
      <AppBlock style={Styles.inputContainer}>
        <TextInput
          ref={(input) => (inputRef[3] = input)}
          style={[Styles.inputBox, Styles.firstInput]}
          maxLength={1}
          onChangeText={(val) => onChangeInput(val, 3)}
          keyboardType="numeric"
        />
        <TextInput
          ref={(input) => (inputRef[4] = input)}
          style={Styles.inputBox}
          maxLength={1}
          onChangeText={(val) => onChangeInput(val, 4)}
          keyboardType="numeric"
        />
        <TextInput
          ref={(input) => (inputRef[5] = input)}
          style={Styles.inputBox}
          maxLength={1}
          onChangeText={(val) => onChangeInput(val, 5)}
          keyboardType="numeric"
        />
      </AppBlock>
    </AppBlock>
  )
}
export default OtpInput
export const Styles = StyleSheet.create({
  firstInput: {
    borderLeftWidth: 0,
  },
  horizontalLine: {
    borderColor: color.borderColor,
    borderWidth: appSize(1),
    width: appSize(10.98),
  },
  inputBox: {
    borderColor: color.borderColor,
    borderLeftWidth: 1,
    fontSize: appSize(15),
    height: appSize(54),
    padding: appSize(12),
    width: appSize(40),
  },
  inputContainer: {
    borderColor: color.borderColor,
    borderRadius: appSize(5),
    borderWidth: 1,
    flexDirection: 'row',
    // width: '45%',
  },
  mainContainer: {
    alignItems: 'center',
    borderColor: color.borderColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})
