import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { MultiSelect } from 'react-native-element-dropdown'

import { color } from './Styles'

const data = [
  { label: 'Annual', value: 0 },
  { label: 'Basic', value: 1 },
  { label: 'beta', value: 2 },
  { label: 'monthly', value: 3 },
  { label: 'My Court Clerk', value: 4 },
  { label: 'Professional', value: 5 },
  { label: 'Standard', value: 6 },
]

type Props = {
  myData(p: any): void
}

const CustomTags = (props: Props) => {
  const [selected, setSelected] = useState<any[]>([])
  useEffect(() => {
    if (selected) {
      props?.myData(selected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={selected}
        onChange={(item) => {
          setSelected(item)
        }}
        renderLeftIcon={() => (
          <View
            style={{
              backgroundColor: color.bottomNavColor,
              height: 10,
              width: 10,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
        )}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  )
}

export default CustomTags

const styles = StyleSheet.create({
  container: { padding: 0 }, //16
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderRadius: 8,

    borderWidth: 0.25,
    height: 50,
    paddingHorizontal: 10,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  inputSearchStyle: {
    fontSize: 16,
    height: 40,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedStyle: {
    borderRadius: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
})
