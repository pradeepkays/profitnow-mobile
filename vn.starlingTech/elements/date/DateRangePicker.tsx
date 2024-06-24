import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { AppBlock, AppButton, appSize, AppText } from '@starlingtech/element'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'

import AppConstants from '@vn.starlingTech/config/AppConstant'
import AppStyles from '@vn.starlingTech/elements/AppStyles'
import { colorDefault as light } from '@vn.starlingTech/theme/theming'

import IconCalendar from 'assets/svg/IconCalendar'

const DATE_FORMAT = 'YYYY-MM-DD'

const isTablet = false // AppConstants.IS_TABLET

export type DateRangeType = { dateFrom: string; dateTo: string }

export type OrderStatus = '2' | '5' | ''

type Props = {
  dateRange: DateRangeType
  setDateRange: (params: DateRangeType) => void
}
export default (props: Props) => {
  const {
    dateRange: { dateFrom, dateTo },
  } = props

  //   const { navigate } = useNavigation<StackNavigationProp<StackParams>>();

  const [cusDateFrom, setCusDateFrom] = useState(
    dateFrom ? moment(dateFrom).toDate() : new Date(),
  )
  const [cusDateTo, setCusDateTo] = useState(
    dateTo ? moment(dateTo).toDate() : new Date(),
  )
  const [focusDateFrom, setFocusDateFrom] = useState(true)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (
      moment(cusDateFrom).endOf('year').format(DATE_FORMAT) !==
      moment(cusDateTo).endOf('year').format(DATE_FORMAT)
    ) {
      setCusDateTo(moment(cusDateFrom).endOf('year').toDate())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cusDateFrom])

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const onSubmit = () => {
    props.setDateRange({
      dateFrom: moment(cusDateFrom).format(DATE_FORMAT),
      dateTo: moment(cusDateTo).format(DATE_FORMAT),
    })
    toggleModal()
  }

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <AppBlock
          row
          center
          justifyContent="space-between"
          style={styles.dropdownBox}
        >
          <AppText mr={4}>
            {moment(dateFrom).format('DD/MM/YYYY')} -{' '}
            {moment(dateTo).format('DD/MM/YYYY')}
          </AppText>
          <IconCalendar width={17} />
        </AppBlock>
      </TouchableOpacity>
      <Modal
        animationIn="fadeInDown"
        animationOut="fadeOutDown"
        coverScreen
        isVisible={showModal}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        deviceWidth={AppConstants.WIDTH}
        style={AppStyles.noMargin}
        useNativeDriver
        hideModalContentWhileAnimating
      >
        <AppBlock style={[styles.modalContent, isTablet && styles.width32]}>
          <AppText textAlign="center" primary>
            Tuỳ chọn khoảng thời gian
          </AppText>
          <AppBlock style={styles.rowDateInput}>
            <Pressable
              onPress={() => setFocusDateFrom(true)}
              style={[
                styles.dateInput,
                focusDateFrom && styles.dateInputActive,
              ]}
            >
              <AppText>{moment(cusDateFrom).format('DD/MM/YYYY')}</AppText>
            </Pressable>
            <AppText>tới</AppText>
            <Pressable
              onPress={() => setFocusDateFrom(false)}
              style={[
                styles.dateInput,
                !focusDateFrom && styles.dateInputActive,
              ]}
            >
              <AppText>{moment(cusDateTo).format('DD/MM/YYYY')}</AppText>
            </Pressable>
          </AppBlock>
          <AppBlock center>
            {focusDateFrom ? (
              <DatePicker
                locale="vi"
                date={cusDateFrom}
                // minimumDate={moment(cusDateTo).startOf('year').toDate()}
                // maximumDate={cusDateTo}
                onDateChange={setCusDateFrom}
                mode="date"
                theme="light"
              />
            ) : (
              <DatePicker
                locale="vi"
                minimumDate={cusDateFrom}
                // maximumDate={moment(cusDateFrom).endOf('year').toDate()}
                date={cusDateTo}
                mode="date"
                onDateChange={setCusDateTo}
                theme="light"
              />
            )}
          </AppBlock>
          <AppBlock style={styles.rowBtn}>
            <AppButton
              radius={10}
              onPress={toggleModal}
              text="Huỷ"
              textColor={'icon'}
              style={styles.btn}
            />
            <AppButton
              radius={10}
              disabled={cusDateTo < cusDateFrom}
              onPress={onSubmit}
              text="Đồng ý"
              primary
              style={[styles.btn, styles.btnPrimary]}
            />
          </AppBlock>
        </AppBlock>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: light.white,
    borderColor: light.icon,
    borderWidth: 1,
    height: 45,
    marginHorizontal: 8,
    width: 150,
  },
  btnPrimary: {
    backgroundColor: light.primary,
    borderColor: light.primary,
  },
  dateInput: {
    backgroundColor: light.inputBackground,
    borderColor: light.inputBorder,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 42,
    justifyContent: 'center',
    marginHorizontal: 8,
    paddingLeft: 16,
  },
  dateInputActive: {
    backgroundColor: light.white,
    borderColor: light.primary,
  },
  dropdownBox: {
    borderColor: light.border,
    borderRadius: appSize(10),
    borderWidth: appSize(1),
    height: appSize(40),
    paddingHorizontal: appSize(10),
    shadowColor: light.backdrop,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  modalContent: {
    alignSelf: 'center',
    backgroundColor: light.white,
    borderRadius: 12,
    height: 400,
    justifyContent: 'space-between',
    padding: 16,
    width: '96%',
  },
  rowBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  rowDateInput: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 12,
    paddingTop: 8,
  },
  width32: { width: '32%' },
})
