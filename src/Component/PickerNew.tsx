import React, { useEffect, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import { Dropdown } from 'react-native-element-dropdown'

import { font } from './Styles'

type Props = {
  placeholder: string
  value?: any
  nameKey?: string
  idKey?: string | number
  onSelect?(p: any): void
  data?: any
  placeHolderTextStyle?: TextStyle
  dropDownStyle?: ViewStyle
}

const PickerNew = ({
  placeholder,
  value,
  nameKey = 'name',
  idKey = 'id',
  onSelect,
  data,
  placeHolderTextStyle,
  dropDownStyle,
}: Props) => {
  const [selectedValue, setValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    setValue(value)
  }, [value])

  const selectValue = (val: any) => {
    setValue(val[idKey])
    onSelect && onSelect(val)
  }

  const renderItem = (item: any) => {
    return (
      <View style={styles.dropdownItem}>
        <Text>{item ? item[nameKey] : 'Opps, No result found'}</Text>
      </View>
    )
  }

  const renderEmptyData = () => {
    return (
      <View style={styles.dropdownItem}>
        <Text>Opps, No result found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {isFocus && (
        <View
          style={{ zIndex: 9999999, position: 'absolute', top: 52, right: 20 }}
        >
          <Image
            source={require('assets/img/polygon.png')}
            style={{ height: 20, width: 30 }}
          />
        </View>
      )}
      <Dropdown
        containerStyle={[styles.containerStyle]}
        style={[styles.dropdown, dropDownStyle]}
        placeholderStyle={StyleSheet.flatten([
          styles.placeholderStyle,
          placeHolderTextStyle,
        ])}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        //search
        maxHeight={200}
        labelField={nameKey}
        valueField={idKey?.toString()}
        placeholder={!isFocus ? placeholder : 'Select'}
        searchPlaceholder="Search..."
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          selectValue(item)
          setIsFocus(false)
        }}
        renderItem={(item) => renderItem(item)}
        dropdownPosition="bottom"
        flatListProps={{
          ListEmptyComponent: renderEmptyData(),
        }}
      />
    </View>
  )
}

export default PickerNew

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
  },
  containerStyle: {
    borderRadius: 10,
    borderWidth: 0,
    marginTop: 18,
    zIndex: 0,
  },
  dropdown: {
    borderColor: 'rgba(58, 53, 65, .26)',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 8,
    zIndex: 0,
  },

  dropdownItem: {
    borderBottomColor: 'rgba(58, 53, 65, .26)',
    borderBottomWidth: 0.5,
    color: '#7E8EAA',
    fontFamily: font.semi,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  inputSearchStyle: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    fontSize: 14,
    height: 40,
  },
  placeholderStyle: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontFamily: font.reg,
    fontSize: 14,
    //color: '#7E8EAA',
  },
})
