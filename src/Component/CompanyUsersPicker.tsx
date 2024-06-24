import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import { MultiSelect } from 'react-native-element-dropdown'

import { colorDefault } from '@vn.starlingTech/theme/theming'

import { useCompanyUsers } from 'src/service/company/company'
import { AssignedUser } from 'src/types/contact.types'

type Props = {
  label?: string
  value: AssignedUser[]
  onChanged: (p: AssignedUser[]) => void
}
export function CompanyUsersPicker(props: Props) {
  const { label = 'Select Users', value, onChanged } = props

  const { data } = useCompanyUsers()

  return (
    <AppBlock style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data?.data || []}
        labelField="title"
        valueField="id"
        placeholder={label}
        searchPlaceholder="Search..."
        value={value}
        onChange={onChanged}
        selectedStyle={styles.selectedStyle}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <AppText size={14} color="secondary">
                {item.title}
              </AppText>
              <AppText color="secondary" ml={9} size={16} weight="700">
                x
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      />
    </AppBlock>
  )
}
const styles = StyleSheet.create({
  container: { padding: 0 },
  dropdown: {
    backgroundColor: 'transparent',
    borderColor: colorDefault.border,
    borderRadius: appSize(6),
    borderWidth: 1,
    height: 50,
    paddingLeft: appSize(12),
    width: appSize(296),
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
    color: colorDefault.placeholder,
    fontSize: 14,
  },
  selectedStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'red',
    borderRadius: appSize(9),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 8,
    paddingHorizontal: appSize(9),
    paddingVertical: appSize(6),
  },
  selectedTextStyle: {
    fontSize: 14,
  },
})
