import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import { Dropdown } from 'react-native-element-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ReactNativeModal from 'react-native-modal'
import { shallow } from 'zustand/shallow'

import { colorDefault } from '@vn.starlingTech/theme/theming'

import { CompanyUserPicker } from 'components/CompanyUserPicker'
import CustomTags from 'src/Component/CustomTags'
import Filters, { orderByData } from 'src/Component/FilterData'
import { font } from 'src/Component/Styles'
import { CONTACT_ORDER_BY, useContactsStore } from 'src/store/contactsStore'
import { AssignedUser } from 'src/types/contact.types'

type Props = {
  state: any
  onClose(): void
}

export function ContactFilter(props: Props) {
  const {
    contactsFilter,
    isLoading,
    contactValue,
    companyValue,
    touchesValue,
  } = props.state

  const [contactFilter, dispatchContactFilter] = useContactsStore(
    (s) => [s.contactFilter, s.dispatchContactFilter],
    shallow,
  )

  const [phone, setPhone] = useState(contactFilter.phone)
  const [title, setTitle] = useState('')
  const [awaitingFeature, setAwaitingFeature] = useState('')
  const [PSA, setPSA] = useState('')
  const [demoRecording, setDemoRecording] = useState('')
  const [assignUser, setAssignUser] = useState('')
  const [limit, setLimit] = useState(15)
  const [confidenceValue, setConfidenceValue] = useState('')
  const [country, setCountry] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [city, setCity] = useState('')
  const [orderBy, setOrderBy] = useState<CONTACT_ORDER_BY | ''>('')
  // const [contactValue, setContactValue] = useState('')

  useEffect(() => {
    setPhone(contactFilter.phone)
    setTitle(contactFilter.title)
    setAwaitingFeature(contactFilter.awaiting_feature)
    setPSA(contactFilter.psa)
    setDemoRecording(contactFilter.demo_recording)
    setAssignUser(contactFilter.user)
    setLimit(contactFilter.limit)
    setCountry(contactFilter.country)
    setStateVal(contactFilter.state)
    setCity(contactFilter.city)
    setOrderBy(contactFilter.orderby)
    // setContactValue(contactFilter.c)
  }, [contactFilter])

  const getSelectedValue = (myValues: any) => {
    if (myValues.length) {
      // props.setState({ tags: myValues })
    }
  }

  const onAssignChanged = (p: AssignedUser) => {
    setAssignUser(p.id?.toString())
  }

  const onDropdownChanged = () => {}

  const onSubmit = () => {
    dispatchContactFilter({
      phone,
      title,
      awaiting_feature: awaitingFeature,
      psa: PSA,
      demo_recording: demoRecording,
      user: assignUser,
      limit,
      country,
      state: stateVal,
      city,
      confidence_level: confidenceValue,
      orderby: orderBy,
    })
    props.onClose()
  }

  return (
    <ReactNativeModal
      isVisible={contactsFilter}
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
        <KeyboardAwareScrollView
          style={{ height: '100%' }}
          contentContainerStyle={styles.scrollStyle}
        >
          <AppBlock>
            <Text style={{ fontFamily: font.bold }}>Filter:</Text>
            <AppText mt={10} style={styles.textTile}>
              Phone
            </AppText>
            <TextInput
              // keyboardType="numeric"
              style={styles.fieldView}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>Tags</Text>
            <CustomTags myData={(_val: any) => getSelectedValue(_val)} />
            <Text style={styles.textTile}>Contact List</Text>
            <Dropdown
              placeholderStyle={styles.placeholderStyle}
              style={styles.modalView}
              selectedTextStyle={styles.selectedColor}
              data={Filters.contactList}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Contacts"
              value={contactValue}
              onChange={onDropdownChanged}
            />
            <Text style={styles.textTile}>Companyy</Text>
            <Dropdown
              placeholderStyle={styles.placeholderStyle}
              style={styles.modalView}
              selectedTextStyle={styles.selectedColor}
              data={Filters.companyList}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Company"
              value={companyValue}
              onChange={onDropdownChanged}
              // onChange={(_val) => props.setState({ companyValue: _val })}
            />
            <AppText mt={10} style={styles.textTile}>
              Title
            </AppText>
            <TextInput
              style={styles.fieldView}
              placeholder="Phone"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>Awaiting Feature</Text>
            <TextInput
              style={styles.fieldView}
              placeholder="Awaiting Feature"
              value={awaitingFeature}
              onChangeText={setAwaitingFeature}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>PSA</Text>
            <TextInput
              // keyboardType="numeric"
              style={styles.fieldView}
              placeholder="PSA"
              value={PSA}
              onChangeText={setPSA}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>Demo Recording</Text>
            <TextInput
              // keyboardType="numeric"
              style={styles.fieldView}
              placeholder="Demo recording"
              value={demoRecording}
              onChangeText={setDemoRecording}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <AppBlock mt={11}>
              <CompanyUserPicker
                value={Number(assignUser)}
                onChanged={onAssignChanged}
              />
            </AppBlock>
            <Text style={styles.textTile}>Touches</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.fieldView}
              placeholder="Touches"
              value={touchesValue}
              onChange={onDropdownChanged}
              // onChangeText={(text) => {
              //   props.setState({ touchesValue: text })
              // }}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>City</Text>
            <TextInput
              style={styles.fieldView}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>State</Text>
            <TextInput
              style={styles.fieldView}
              placeholder="State"
              value={stateVal}
              onChangeText={setStateVal}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
            />
            <Text style={styles.textTile}>Country</Text>
            <TextInput
              style={styles.fieldView}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
              placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
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
              onChange={setConfidenceValue}
            />
            <Text style={styles.textTile}>Items Per Page</Text>
            <Dropdown
              placeholderStyle={styles.placeholderStyle}
              style={styles.modalView}
              selectedTextStyle={styles.selectedColor}
              data={Filters.itemPerPage}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Items Per Page"
              value={limit}
              onChange={setLimit}
            />
            <Text style={styles.textTile}>Order by</Text>
            <Dropdown
              placeholderStyle={styles.placeholderStyle}
              style={styles.modalView}
              selectedTextStyle={styles.selectedColor}
              data={orderByData}
              maxHeight={300}
              labelField="title"
              valueField="value"
              placeholder="Order By"
              value={orderBy}
              onChange={setOrderBy}
            />
          </AppBlock>
        </KeyboardAwareScrollView>
        <TouchableOpacity onPress={onSubmit} style={styles.filterBtn}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.filterText}>Filter Contacts</Text>
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
    flexGrow: 1,
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
