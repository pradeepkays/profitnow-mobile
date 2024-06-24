import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';
import moment from 'moment';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper';

import {parseResponseError} from 'src/helper/responseHelper';
// import {goBack} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService';
import {useEmailSending} from 'src/service/contact/email';

import {EmailSuggestion} from './EmailSuggestion';
import {color} from '../../../Component/Styles';

type Props = {
  details: any;
  data: any;
};

export function EmailMessage({details, data = null}: Props) {
  const [subject, setSubject] = useState(
    data?.object?.object_details?.subject ?? '',
  );
  const [message, setMessage] = useState('');

  const {mutate: sendEmail, isLoading} = useEmailSending();

  const [ccMails, setCcMails] = useState<string[]>([]);
  const [bccMails, setBccMails] = useState<string[]>([]);

  // console.log('data==>', data?.object?.object_details?.subject);

  const onSubmit = () => {
    sendEmail(
      {
        id: details.id,
        params: {
          subject,
          message,
          time: moment().format(),
          cc_list: ccMails,
          bcc_list: bccMails,
        },
      },
      {
        onSuccess: () => {
          showFlashMessageSuccess('Email Sent Successfully');
          NavigationService.goBack();
        },
        onError: (error: any) => {
          const {message: errorMessage} = parseResponseError(error);
          showFlashMessageError(errorMessage || 'Email Sent Error');
        },
      },
    );
  };

  return (
    <KeyboardAvoidingScrollView style={{flex: 1}}>
      <AppBlock ml={20} row mt={30}>
        <AppText color="label" mt={3}>
          To:
        </AppText>
        <AppText style={styles.toUser} ml={21}>
          {details && details.title
            ? details.title
            : details && details.first_name
            ? details.first_name
            : 'User'}
        </AppText>
      </AppBlock>
      <EmailSuggestion label="Cc" values={ccMails} onChanged={setCcMails} />
      <EmailSuggestion label="Bcc" values={bccMails} onChanged={setBccMails} />
      <TextInput
        editable={!isLoading}
        style={styles.inputSubject}
        placeholder={'subject'}
        onChangeText={setSubject}
        value={subject}
      />
      <TextInput
        editable={!isLoading}
        style={styles.textInput}
        multiline={true}
        onChangeText={setMessage}
        placeholder={'Message'}
        textAlignVertical={'top'}
      />
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <AppText color="white">Send Mail</AppText>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingScrollView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: color.primeColor,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 20,
    marginTop: 30,
    width: 160,
  },
  inputSubject: {
    alignSelf: 'center',
    borderColor: 'rgba(58, 53, 65, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    height: 56,
    marginTop: 30,
    paddingLeft: 10,
    width: '90%',
  },
  textInput: {
    alignSelf: 'center',
    borderColor: 'rgba(58, 53, 65, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    height: 261,
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    width: '90%',
  },
  toUser: {
    backgroundColor: 'rgba(0, 111, 196, 0.1)',
    borderRadius: 15,
    color: color.primeColor,
    padding: 7,
  },
});
