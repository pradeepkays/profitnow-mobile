import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppText} from '@starlingtech/element';
import moment from 'moment';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import {
  showFlashMessageError,
  showFlashMessageSuccess,
} from '@vn.starlingTech/helpers/flashMessageHelper';

import PickerNew from 'src/Component/PickerNew';
import {color, font} from 'src/Component/Styles';
import {parseResponseError} from 'src/helper/responseHelper';
// import {goBack} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService';
import {
  useSmsSending,
  useSmsTemplateCategory,
  useSmsTemplateMessage,
} from 'src/service/contact/sms';
import {
  RespTemplateSmsCategory,
  RespTemplateSmsMessage_Data,
} from 'src/types/sms.types';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  id: string;
};

export function SmsTemplate({id}: Props) {
  const richText = useRef<RichEditor>(null);

  const [category, setCategory] = useState<RespTemplateSmsCategory>();
  const [tempMessage, setTempMessage] = useState<RespTemplateSmsMessage_Data>();

  const {data} = useSmsTemplateCategory();
  const {data: dataMessages} = useSmsTemplateMessage(category?.id);

  const {mutate: sendSms, isLoading} = useSmsSending();

  const selectTemplate = (selected: RespTemplateSmsMessage_Data) => {
    setTempMessage(selected);
    if (richText.current) {
      richText.current.setContentHTML(selected?.text?.trim() || '');
    }
  };

  const onEditorInitialized = () => {
    richText.current?.setContentHTML(tempMessage?.text?.trim() || '');
  };

  const updateTemplate = (_data: string) => {
    const newEmailBody = {
      ...tempMessage,
      text: _data,
    } as RespTemplateSmsMessage_Data;

    setTempMessage(newEmailBody);
  };

  const onSubmit = () => {
    if (!tempMessage) {
      showFlashMessageError('Please Select Template');
    } else {
      sendSms(
        {
          id,
          params: {
            text: tempMessage.text,
            time: moment().format(),
          },
        },
        {
          onSuccess: () => {
            showFlashMessageSuccess('Send successfully');
            NavigationService.goBack();
          },
          onError: error => {
            const {message} = parseResponseError(error);
            showFlashMessageError(message || 'Failed to send');
          },
        },
      );
    }
  };

  return (
    <KeyboardAvoidingScrollView style={{flex: 1, marginTop: 20}}>
      <View>
        {/* <PickerNew
          // icon={require('assets/img/drop.png')}
          // style={{ borderWidth: 1, borderRadius: 8 }}
          placeholder="Select Category"
          nameKey="title"
          data={data}
          value={category}
          onSelect={setCategory}
        /> */}

        <Dropdown
          style={styles.modalView}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedColor}
          data={data ?? []}
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Select Category"
          searchPlaceholder="Search..."
          value={category}
          onChange={setCategory}
        />
        <View style={{marginTop: 20}}>
          {/* <PickerNew
            placeholder="Select Template"
            nameKey="type_title"
            data={dataMessages?.data}
            value={tempMessage}
            onSelect={selectTemplate}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={dataMessages?.data ?? []}
            maxHeight={300}
            labelField="type_title"
            valueField="id"
            placeholder="Select Template"
            searchPlaceholder="Search..."
            value={tempMessage}
            onChange={selectTemplate}
          />
        </View>
        {tempMessage && tempMessage.text && (
          <View style={styles.editorContainer}>
            <View style={styles.editorInnerContainer}>
              <RichEditor
                ref={richText}
                placeholder="Write message.."
                editorInitializedCallback={onEditorInitialized}
                onChange={updateTemplate}
                style={styles.editorStyle}
                editorStyle={{
                  contentCSSText: styles.editorContaxt,
                }}
              />
            </View>
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
        <TouchableOpacity
          style={StyleSheet.flatten([styles.sendIcon, {marginTop: 20}])}
          onPress={onSubmit}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <AppText color="white">Send</AppText>
          )}
        </TouchableOpacity>
      </View>
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
  editorContainer: {marginTop: 20},
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
  editorInnerContainer: {
    borderColor: color.borderColor,
    borderRadius: 6,
    borderWidth: 1,
    height: 200,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  editorStyle: {color: '#000', flex: 1, fontFamily: font.reg},
  sendIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    marginLeft: 15,
    width: 66,
  },
});
