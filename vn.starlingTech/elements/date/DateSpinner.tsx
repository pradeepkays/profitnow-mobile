import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'

import { AppBlock, appSize, AppText } from '@starlingtech/element'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import Modal from 'react-native-modal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import AppConstants from '@vn.starlingTech/config/AppConstant'
import AppStyles from '@vn.starlingTech/elements/AppStyles'
import { getString } from '@vn.starlingTech/lang/language'
import {
  colorDefault,
  colorDefault as light,
} from '@vn.starlingTech/theme/theming'
import { useAppTheme } from '@vn.starlingTech/theme/theming'

import IconCalendar from 'assets/svg/IconCalender'

type Props = {
  forceVisible?: number
  date: Date | undefined
  mode?: 'date' | 'time' | 'datetime'
  minDate?: Date
  maxDate?: Date
  display?: 'spinner' | 'default' | 'clock' | 'calendar'
  onChanged: (date?: Date) => void
  onCancel?: () => void
}

export default (props: Props) => {
  const { colors } = useAppTheme()

  const { bottom } = useSafeAreaInsets()

  const [visible, setVisible] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(props.date)

  // const onChange = (event: any, pSelectedDate?: Date) => {
  //   consoleLog(pSelectedDate, 'pSelectedDate');
  //   const currentDate = pSelectedDate || selectedDate;
  //   setSelectedDate(currentDate);
  // };

  const onShowDatePicker = () => {
    setVisible(true)
  }

  const onFinish = () => {
    if (!selectedDate) {
      setSelectedDate(new Date())
    }
    props.onChanged(selectedDate || new Date())
    setVisible(false)
  }

  useEffect(() => {
    setSelectedDate(props.date)
  }, [props.date])

  useEffect(() => {
    if (props.forceVisible) {
      setVisible(true)
    }
  }, [props.forceVisible])

  const onCancel = () => {
    setVisible(false)
    props.onCancel && props.onCancel()
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onShowDatePicker}>
        <AppText left={0.15} color={selectedDate ? 'text' : 'placeholder'}>
          {selectedDate ? moment(selectedDate).format('lll') : 'Not Set'}
        </AppText>
        <IconCalendar />
      </TouchableOpacity>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        coverScreen
        isVisible={visible}
        hasBackdrop
        hideModalContentWhileAnimating
        deviceHeight={AppConstants.HEIGHT}
        deviceWidth={AppConstants.WIDTH}
        onBackdropPress={onCancel}
        useNativeDriver
        style={{ margin: 0, justifyContent: 'flex-end' }}
      >
        <AppBlock style={[styles.iosPicker, { paddingBottom: bottom }]}>
          <AppBlock style={styles.iosActions}>
            <Pressable style={styles.iosBtn} onPress={onCancel}>
              <AppText style={styles.iosBtnTxt}>{getString().cancel}</AppText>
            </Pressable>
            <Pressable style={styles.iosBtn} onPress={onFinish}>
              <AppText style={{ ...styles.iosBtnTxt, color: colors.primary }}>
                {getString().ok}
              </AppText>
            </Pressable>
          </AppBlock>
          <DatePicker
            date={selectedDate || new Date()}
            onDateChange={setSelectedDate}
            mode={props.mode || 'datetime'}
            textColor="#000"
            minimumDate={props.minDate}
            maximumDate={props.maxDate}
          />
        </AppBlock>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: colorDefault.border,
    borderRadius: appSize(6),
    borderWidth: 1,
    flexDirection: 'row',
    height: appSize(46),
    justifyContent: 'space-between',
    marginTop: appSize(8),
    paddingLeft: appSize(18),
    paddingRight: appSize(10),
  },
  iosActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 500,
    width: AppConstants.SCREEN_WIDTH,
    ...AppStyles.bottomBordered,
  },
  iosBtn: { paddingHorizontal: 15, paddingVertical: 15 },
  iosBtnTxt: { color: light.danger, fontSize: 18 },
  iosPicker: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: light.white,
    borderRadius: 6,
    justifyContent: 'center',
    width: 500,
  },
})
