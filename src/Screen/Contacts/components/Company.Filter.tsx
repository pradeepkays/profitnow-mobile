import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { AppBlock, appSize } from '@starlingtech/element'
import { Dropdown } from 'react-native-element-dropdown'
import ReactNativeModal from 'react-native-modal'

import { colorDefault } from '@vn.starlingTech/theme/theming'

import CustomTags from 'src/Component/CustomTags'
import Filters from 'src/Component/FilterData'
import { font } from 'src/Component/Styles'

const { height } = Dimensions.get('window')

type Props = {
  state: any
  setState(s: any): void
  onClose(): void
  onSubmit(): void
}

export function CompanyFilter(props: Props) {
  const {
    companyFilter,
    isLoading,
    phoneValue,
    titleValue,
    emailValue,
    citylValue,
    stateValue,
    employeeValue,
    confidenceValue,
    companyAssignedUser,
  } = props.state

  const getSelectedValue = (myValues: any) => {
    if (myValues.length) {
      props.setState({ tags: myValues })
    }
  }

  return (
    <ReactNativeModal
      isVisible={companyFilter}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <AppBlock
        height={'90%'}
        background="white"
        style={styles.content}
        overflow="hidden"
      >
        <ScrollView contentContainerStyle={styles.scrollStyle}>
          <View
            style={{
              height: (height / 100) * 5,
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: font.bold }}>Filter:</Text>
          </View>
          <Text style={styles.textTile}>Title (A-Z)</Text>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={Filters.titleFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Title (A-Z)"
            searchPlaceholder="Search..."
            value={titleValue}
            onChange={(_val) => {
              props.setState({ titleValue: _val })
            }}
          />
          <Text style={styles.textTile}>Phone</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.fieldView}
            placeholder="Phone"
            value={phoneValue}
            onChangeText={(text) => {
              props.setState({ phoneValue: text })
            }}
            placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
          />

          <Text style={styles.textTile}>Email (A-Z)</Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            style={styles.modalView}
            selectedTextStyle={styles.selectedColor}
            data={Filters.titleFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Email (A-Z)"
            value={emailValue}
            onChange={(_val) => props.setState({ emailValue: _val })}
          />

          <Text style={styles.textTile}>City</Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            style={styles.modalView}
            selectedTextStyle={styles.selectedColor}
            data={Filters.cityFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="City"
            searchPlaceholder="Search..."
            value={citylValue}
            onChange={(_val) => props.setState({ citylValue: _val })}
          />

          <Text style={styles.textTile}>State (A-Z)</Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            style={styles.modalView}
            selectedTextStyle={styles.selectedColor}
            data={Filters.stateFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="State (A-Z)"
            value={stateValue}
            onChange={(_val) => props.setState({ stateValue: _val })}
          />

          <Text style={styles.textTile}>Employee Size</Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            style={styles.modalView}
            selectedTextStyle={styles.selectedColor}
            data={Filters.employeeFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Employee Size"
            value={employeeValue}
            onChange={(_val) => props.setState({ employeeValue: _val })}
          />

          <Text style={styles.textTile}>Confidence Level</Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            style={styles.modalView}
            selectedTextStyle={styles.selectedColor}
            data={Filters.confidenceFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Confidence Level"
            value={confidenceValue}
            onChange={(_val) => props.setState({ confidenceValue: _val })}
          />
          <Text style={styles.textTile}>Assigned User</Text>
          <Dropdown
            placeholderStyle={styles.placeholderStyle}
            style={styles.modalView}
            selectedTextStyle={styles.selectedColor}
            data={Filters.userAssigned}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Assigned user"
            value={companyAssignedUser}
            onChange={(_val) => props.setState({ companyAssignedUser: _val })}
          />

          <Text style={styles.textTile}>Tags</Text>

          <CustomTags myData={(_val: any) => getSelectedValue(_val)} />
        </ScrollView>
        <TouchableOpacity onPress={props.onSubmit} style={styles.filterBtn}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.filterText}>Filter Companies</Text>
          )}
        </TouchableOpacity>
      </AppBlock>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: appSize(8),
    borderTopRightRadius: appSize(8),
  },
  fieldView: {
    borderColor: colorDefault.border,
    borderRadius: 8,
    borderWidth: 0.5,
    color: '#000',
    height: 50,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  filterBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colorDefault.primary,
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
    marginBottom: 35,
    marginTop: 10,
    width: appSize(330),
  },
  filterText: {
    color: '#fff',
    fontFamily: font.semi,
    fontSize: 15,
  },
  modalView: {
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 0.5,
    height: 50,
    paddingHorizontal: 10,
    zIndex: 0,
  },
  placeholderStyle: {
    color: 'lightgrey',
    fontFamily: font.reg,
    fontSize: 14,
  },
  scrollStyle: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  selectedColor: {
    color: '#000',
    fontSize: 16,
  },
  textTile: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    marginBottom: 5,
    marginTop: 10,
  },
})
