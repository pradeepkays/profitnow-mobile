import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';
import moment from 'moment';
// import { ScrollView } from 'react-native-gesture-handler'
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper';

import {parseResponseError} from 'src/helper/responseHelper';
import {
  useEmailSending,
  useEmailTemplateCategory,
  useEmailTemplateMessage,
} from 'src/service/contact/email';
import {
  RespTemplateEmailCategory,
  RespTemplateEmailMessage_Data,
} from 'src/types/email.types';

import {EmailSuggestion} from './EmailSuggestion';
import PickerNew from '../../../Component/PickerNew';
import {color, font} from '../../../Component/Styles';
import {goBack} from 'src/navigation/navigation';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  details: any;
  data: any;
};

export default function EmailTemplate(props: Props) {
  const {details, data = null} = props;

  const richText = React.createRef<RichEditor>();

  const [tempCategory, setTempCategory] = useState<RespTemplateEmailCategory>();
  const [tempMessage, setTempMessage] =
    useState<RespTemplateEmailMessage_Data>();

  const [ccMails, setCcMails] = useState<string[]>([]);
  const [bccMails, setBccMails] = useState<string[]>([]);

  const {data: dataCategories} = useEmailTemplateCategory();
  const {data: dataMessages} = useEmailTemplateMessage(tempCategory?.id);

  const {mutate: sendEmail, isLoading} = useEmailSending();

  const updateTemplateMessage = (data: any) => {
    const newEmailBody: RespTemplateEmailMessage_Data = {
      ...tempMessage,
      body: data,
    } as RespTemplateEmailMessage_Data;
    setTempMessage(newEmailBody);
  };

  const onEditorInitialized = () => {
    richText.current?.setContentHTML(tempMessage?.body.trim() || '');
  };

  const onSubmit = () => {
    if (tempMessage) {
      sendEmail(
        {
          id: details.id,
          params: {
            subject: tempMessage?.subject,
            message: tempMessage?.body,
            time: moment().format(),
            cc_list: ccMails,
            bcc_list: bccMails,
          },
        },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Email Sent Successfully');
            goBack();
          },
          onError: error => {
            const {message} = parseResponseError(error);
            showFlashMessageError(message || 'Email Sent Error');
          },
        },
      );
    } else {
      showFlashMessageError('Please Select the template');
    }
  };

  return (
    <KeyboardAvoidingScrollView style={{flex: 1}}>
      <View style={{marginLeft: 20, flexDirection: 'row', marginTop: 30}}>
        <AppText style={{padding: 7}}>To:</AppText>
        <Text style={styles.toUser}>
          {details && details.title
            ? details.title
            : details && details.first_name
            ? details.first_name
            : 'User'}
        </Text>
      </View>
      <EmailSuggestion label="Cc" values={ccMails} onChanged={setCcMails} />
      <EmailSuggestion label="Bcc" values={bccMails} onChanged={setBccMails} />

      <AppBlock margin={20}>
        <AppText size={14} mb={5} color="label">
          Email Template
        </AppText>
        <View style={{flex: 1, marginBottom: 20}}>
          {/* <PickerNew
            placeholder="Select Category"
            nameKey="title"
            data={dataCategories}
            value={tempCategory}
            onSelect={setTempCategory}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={dataCategories ?? []}
            maxHeight={300}
            labelField="title"
            valueField="id"
            placeholder="Select Category"
            searchPlaceholder="Search..."
            value={tempCategory}
            onChange={setTempCategory}
          />
        </View>
        <View style={{flex: 1}}>
          {/* <PickerNew
            placeholder="Select Category"
            nameKey="type_title"
            data={dataMessages?.data}
            value={tempMessage}
            onSelect={setTempMessage}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={dataMessages?.data ?? []}
            maxHeight={300}
            labelField="type_title"
            valueField="id"
            placeholder="Select Category"
            searchPlaceholder="Search..."
            value={tempMessage}
            onChange={setTempMessage}
          />
        </View>
        {tempMessage && tempMessage.body && (
          <View style={styles.container}>
            <ScrollView style={styles.editorContainer}>
              <RichEditor
                ref={richText}
                placeholder="Write message.."
                editorInitializedCallback={onEditorInitialized}
                onChange={updateTemplateMessage}
                style={styles.editorStyle}
                editorStyle={{
                  contentCSSText: styles.editorContaxt,
                }}
              />
            </ScrollView>
            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.heading1,
                actions.insertLink,
                actions.insertBulletsList,
                actions.undo,
                actions.redo,
              ]}
              iconMap={{
                [actions.heading1]: renderIcons,
              }}
            />
          </View>
        )}
      </AppBlock>

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

const renderIcons = ({tintColor}: any) => (
  <Text style={{color: tintColor}}>H1</Text>
);

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
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: color.primeColor,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 30,
    marginTop: 30,
    width: 160,
  },
  container: {marginTop: 20},
  editorContainer: {
    borderColor: color.borderColor,
    borderRadius: 6,
    borderWidth: 1,
    height: 200,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  editorContaxt: {
    bottom: 0,
    fontFamily: font.reg,
    fontSize: 14,
    left: 0,
    minHeight: 200,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  editorStyle: {color: '#000', flex: 1, fontFamily: font.reg},
  toUser: {
    backgroundColor: 'rgba(0, 111, 196, 0.1)',
    borderRadius: 15,
    color: color.primeColor,
    marginLeft: 10,
    padding: 7,
  },
});
