import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import useAppStore from 'src/store/appStore';

import {API} from '../../Privet';
import PickerNew from '../PickerNew';
import {color, font} from '../Styles';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  handleClose(): void;
  image?: number;
  detail: any;
};

const SmsModal = ({handleClose, image, detail}: Props) => {
  const accessToken = useAppStore(s => s.accessToken);

  const [messageValue, setMessageValue] = useState('');
  const [activeState, setActiveState] = useState(1);
  const [templateCategory, setTemplateCategory] = useState([]);
  const [templateName, setTemplateName] = useState<any>();
  const [templateList, setTemplateList] = useState([]);
  const [templateText, setTemplateText] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleSentMessage = (val: string) => {
    handleClose();
    if (val && val === '') {
      Alert.alert('Please Enter Message');
    } else {
      const data = {
        text: val,
      };
      fetch(`${API.contactMessage}/${detail.id}`, {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: accessToken,
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log('response', response);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };

  const activityTickets = () => {
    setLoading(true);
    fetch(`${API.templateCategory}/text`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response', response);
        if (response.length) {
          setTemplateCategory(response);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const getTemplateList = (val: any) => {
    setTemplateName(val);
    setLoading(true);
    fetch(`${API.smsTemplateList}/${val.id}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response', response);
        if (response.data.length) {
          setTemplateList(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    activityTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  console.log('templateList', templateList);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleClose()}
        style={styles.closeContainer}>
        <Image
          source={require('assets/img/cancle_icon.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={image} style={styles.userImageStyle} />
        ) : (
          <Text style={styles.avatarText}>{detail?.initials}</Text>
        )}
      </View>

      <Text style={styles.userName} numberOfLines={2}>
        {detail?.first_name} {detail?.last_name}
      </Text>

      <View style={{height: 50, marginTop: 20, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setActiveState(1)}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color:
                activeState === 1
                  ? color.secondColor
                  : 'rgba(58, 53, 65, 0.68)',
              fontFamily: activeState === 1 ? font.semi : font.reg,
            }}>
            SMS Template
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveState(2)}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color:
                activeState === 2
                  ? color.secondColor
                  : 'rgba(58, 53, 65, 0.68)',
              fontFamily: activeState === 2 ? font.semi : font.reg,
            }}>
            Custom Message
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderBottomWidth: 2,
            flex: 1,
            borderBottomColor:
              activeState === 1 ? color.secondColor : color.borderColor,
          }}
        />
        <View
          style={{
            borderBottomWidth: 2,
            flex: 1,
            borderBottomColor:
              activeState === 2 ? color.secondColor : color.borderColor,
          }}
        />
      </View>

      {activeState === 1 ? (
        <View style={{padding: 20, flex: 1, width: '100%'}}>
          {/* <PickerNew
            // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
            placeholder="Select Category"
            nameKey="title"
            data={templateCategory}
            value={templateName.title}
            onSelect={v => getTemplateList(v)}
          /> */}

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={templateCategory ?? []}
            maxHeight={300}
            labelField="title"
            valueField="id"
            placeholder="Select Category"
            searchPlaceholder="Search..."
            value={templateName.title}
            onChange={v => getTemplateList(v)}
          />

          <View style={{marginTop: 20}}>
            {/* <PickerNew
              // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
              placeholder="Select Template"
              nameKey="type_title"
              data={templateList}
              value={
                templateText && templateText.type_title
                  ? templateText.type_title
                  : ''
              }
              onSelect={v => setTemplateText(v)}
            /> */}
            <Dropdown
              style={styles.modalView}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedColor}
              data={templateList ?? []}
              maxHeight={300}
              labelField="type_title"
              valueField="id"
              placeholder="Select Template"
              searchPlaceholder="Search..."
              value={
                templateText && templateText.type_title
                  ? templateText.type_title
                  : ''
              }
              onChange={v => setTemplateText(v)}
            />
          </View>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.sendIcon, {marginTop: 20}])}
            onPress={() =>
              templateText && templateText.text
                ? handleSentMessage(templateText.text)
                : Alert.alert('Please Select Template')
            }>
            <Text style={{fontFamily: font.semi, color: '#fff', fontSize: 15}}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.sendContainer}>
          <TextInput
            placeholderTextColor="rgba(58, 53, 65, 0.38)"
            style={styles.inputContainer}
            placeholder="Write message.."
            value={messageValue}
            autoCapitalize="none"
            onChangeText={e => setMessageValue(e)}
          />

          <TouchableOpacity
            style={styles.sendIcon}
            onPress={
              messageValue
                ? () => handleSentMessage(messageValue)
                : () => Alert.alert('Please Enter Message')
            }>
            <Image
              source={require('assets/img/right-arrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={'blue'} />
        </View>
      )}
    </View>
  );
};

export default SmsModal;

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
  arrowIcon: {
    height: 24,
    tintColor: color.whiteColor,
    width: 24,
  },
  avatarText: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 25,
  },
  closeContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 24,
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 15,
    width: 24,
  },
  closeIcon: {
    height: 14,
    tintColor: 'rgba(58, 53, 65, 0.54)',
    width: 14,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 500,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    borderColor: color.secondColor,
    borderRadius: 54,
    borderWidth: 1,
    height: 107,
    justifyContent: 'center',
    marginTop: 10,
    padding: 27,
    width: 107,
  },
  inputContainer: {
    backgroundColor: color.whiteColor,
    borderColor: 'rgba(58, 53, 65, 0.26)',
    borderRadius: 4,
    borderWidth: 1,
    color: '#000',
    fontFamily: font.reg,
    fontSize: 15,
    height: 48,
    paddingHorizontal: 10,
    width: '65%',
  },
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  sendContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
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
  userImageStyle: {
    borderRadius: 50,
    height: '100%',
    width: '100%',
  },
  userName: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 20,
    marginTop: 18,
    textAlign: 'center',
  },
});
