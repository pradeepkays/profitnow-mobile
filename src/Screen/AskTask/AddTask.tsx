import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppBlock, appSize, AppText} from '@starlingtech/element';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import DateSpinner from '@vn.starlingTech/elements/date/DateSpinner';
import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper';
import {consoleLog} from '@vn.starlingTech/helpers/logHelper';
import {colorDefault} from '@vn.starlingTech/theme/theming';

import {CompanyUserPicker} from 'components/CompanyUserPicker';
import {parseResponseError} from 'src/helper/responseHelper';
// import {goBack} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService'
import {useTaskCreate} from 'src/service/contact/task';
import useAppStore from 'src/store/appStore';
import {AssignedUser} from 'src/types/contact.types';

import Header from '../../Component/Header';
import PickerNew from '../../Component/PickerNew';
import {color, shadow} from '../../Component/Styles';
import {Dropdown} from 'react-native-element-dropdown';

export default function AddTask({navigation, route}: any) {
  const dispatchSyncing = useAppStore(s => s.dispatchSyncing);

  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState({id: 5, title: 5});
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(priorityList[0]);
  const [userId, setUserId] = useState(0);

  const {mutate: createTask, isLoading} = useTaskCreate();

  const onUserChanged = (p: AssignedUser) => {
    setUserId(p.id);
  };

  const onSubmit = () => {
    if (!userId) {
      showFlashMessageError('Select User');
    } else if (!date) {
      showFlashMessageError('Select Due Date');
    } else if (!text) {
      showFlashMessageError('Enter Note.');
    } else {
      const contactId = route?.params?.contactIdz;

      consoleLog(contactId, 'contactId');
      createTask(
        {
          contactId,
          params: {
            text,
            time_scheduled: moment(date).format(),
            reminder: reminder.id,
            priority: priority?.id || '0',
            user_id: userId,
          },
        },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Task Added Successfully');
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

  return (
    <View style={styles.container}>
      <Header
        title="Create Task"
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
                placeholder="Select List"
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
                placeholder="Select List"
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
          <TouchableOpacity
            disabled={disabled || isLoading}
            onPress={onSubmit}
            style={[styles.button, disabled && styles.btnDisabled]}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <AppText color="white">SCHEDULE</AppText>
            )}
          </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    backgroundColor: colorDefault.primary,
    borderRadius: 5,
    height: appSize(42),
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: appSize(30),
  },
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
});
