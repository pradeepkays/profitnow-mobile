import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import {AppBlock, AppButton, appSize, AppText} from '@starlingtech/element';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import DateSpinner from '@vn.starlingTech/elements/date/DateSpinner';
import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper';
import {consoleLog} from '@vn.starlingTech/helpers/logHelper';

import IconChecked from 'assets/svg/IconChecked';
import IconSquare from 'assets/svg/IconSquare';
import {CompanyUserPicker} from 'components/CompanyUserPicker';
import Header from 'components/Header';
import PickerNew from 'components/PickerNew';
import {color, shadow} from 'components/Styles';
import {parseResponseError} from 'src/helper/responseHelper';
// import {goBack} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService';
import {useTaskInfo, useTaskUpdate} from 'src/service/todo/todo';
import useAppStore from 'src/store/appStore';
import {AssignedUser} from 'src/types/contact.types';
import {Dropdown} from 'react-native-element-dropdown';

export function UpdateTaskScreen({navigation, route}: any) {
  const dispatchSyncing = useAppStore(s => s.dispatchSyncing);

  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState({id: 5, title: 5});
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(priorityList[0]);
  const [userId, setUserId] = useState(0);
  const [status, setStatus] = useState('Active');

  const id = route?.params?.id;

  const {data} = useTaskInfo(id);

  const {mutate: updateTask, isLoading} = useTaskUpdate();

  const onUserChanged = (p: AssignedUser) => {
    setUserId(p.id);
  };

  const onToggleComplete = () => {
    setStatus(status === 'Active' ? 'Completed' : 'Active');
  };

  const onSubmit = () => {
    if (!userId) {
      showFlashMessageError('Select User');
    } else if (!date) {
      showFlashMessageError('Select Due Date');
    } else if (!text) {
      showFlashMessageError('Enter Note.');
    } else {
      const contactId = route?.params?.contactId;

      consoleLog(contactId, 'contactId');
      updateTask(
        {
          id: id,
          params: {
            text,
            time_scheduled: moment(date).format(),
            reminder: reminder.id,
            priority: priority?.id || '0',
            user_id: userId,
            status: status === 'Active' ? 0 : 1,
          },
        },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Task Updated Successfully');
            dispatchSyncing('tasks');
            NavigationService.goBack();
          },
          onError: error => {
            const {message} = parseResponseError(error);
            showFlashMessageError(message);
          },
        },
      );
    }
  };

  const disabled = !userId || !date || !text;

  useEffect(() => {
    // consoleLog(data, 'data');
    if (data) {
      setDate(moment(data.time_scheduled).toDate());
      setPriority(priorityList.find(x => x.title === data.priority));
      setText(data.text);
      setUserId(data.user_id);
      setStatus(data.status);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Header
        title="Update Task"
        SafeAreaViewColor={'#f3f6fa'}
        Limg={require('assets/img/back.png')}
        Lpress={navigation.goBack}
      />
      <KeyboardAwareScrollView
        style={styles.fill}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 20}}>
        <View style={styles.containerContent}>
          <CompanyUserPicker value={userId} onChanged={onUserChanged} />
          <AppBlock mt={10}>
            <AppText color="label">Due Date</AppText>
            <View style={{flex: 1}}>
              <DateSpinner
                display="spinner"
                mode="datetime"
                date={date}
                onChanged={setDate}
                minDate={new Date()}
              />
            </View>
          </AppBlock>
          <AppBlock mt={20}>
            <AppText color="label" mb={10}>
              Set Reminder
            </AppText>
            <View style={styles.fill}>
              {/* <PickerNew
                placeholder="Select"
                nameKey="title"
                idKey="id"
                data={reminderList}
                value={reminder}
                onSelect={setReminder}
              /> */}
              <Dropdown
                style={styles.modalView}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedColor}
                data={reminderList ?? []}
                maxHeight={300}
                labelField="title"
                valueField="id"
                placeholder="Select"
                searchPlaceholder="Search..."
                value={reminder}
                onChange={setReminder}
              />
            </View>
          </AppBlock>
          <AppBlock mt={20}>
            <AppText color="label" mb={10}>
              Priority
            </AppText>
            <View style={styles.fill}>
              {/* <PickerNew
                placeholder="Select"
                nameKey="title"
                idKey="id"
                data={priorityList}
                value={priority}
                onSelect={setPriority}
              /> */}
              <Dropdown
                style={styles.modalView}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedColor}
                data={priorityList ?? []}
                maxHeight={300}
                labelField="title"
                valueField="id"
                placeholder="Select"
                searchPlaceholder="Search..."
                value={priority}
                onChange={setPriority}
              />
            </View>
          </AppBlock>
          <AppBlock mt={20}>
            <AppText color="label" mb={5}>
              Note
            </AppText>
            <View style={styles.fill}>
              <TextInput
                style={styles.input}
                placeholder="Note"
                value={text}
                placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                onChangeText={setText}
              />
            </View>
          </AppBlock>
          <TouchableOpacity onPress={onToggleComplete} style={styles.status}>
            {status === 'Active' ? <IconSquare /> : <IconChecked />}
            <AppText color={status === 'Active' ? 'label' : 'primary'} ml={9}>
              Completed
            </AppText>
          </TouchableOpacity>

          <AppBlock center>
            <AppButton
              mt={30}
              disabled={disabled}
              primary
              width={296}
              text="Update"
              processing={isLoading}
              onPress={onSubmit}
              disabledStyle={styles.btnDisabled}
            />
          </AppBlock>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const reminderList = [
  {id: 5, title: '5'},
  {id: 15, title: '15'},
  {id: 30, title: '30'},
  {id: 60, title: '60'},
];
const priorityList = [
  {id: 0, title: 'Low'},
  {id: 1, title: 'Medium'},
  {id: 2, title: 'High'},
];

const styles = StyleSheet.create({
  modalView: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    zIndex: 0,
  },
  placeholderStyle: {
    color: 'lightgrey',
    // fontFamily: font.reg,
    fontSize: 14,
  },
  selectedColor: {
    color: '#000',
    fontSize: 14,
  },
  btnDisabled: {opacity: 0.5},
  container: {backgroundColor: '#f3f6fa', flex: 1},
  containerContent: {
    ...shadow,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  fill: {flex: 1},
  input: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 60,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  status: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: appSize(20),
  },
});
