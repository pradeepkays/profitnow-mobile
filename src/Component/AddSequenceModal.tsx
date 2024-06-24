import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import useAppStore from 'src/store/appStore';

import PickerNew from './PickerNew';
import {color, font} from './Styles';
import {API} from '../Privet';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {
  handleClose(): void;
  contactId: string;
};

const AddSequence = ({handleClose, contactId}: Props) => {
  const accessToken = useAppStore(s => s.accessToken);

  const [listData, setListData] = useState([]);
  const [selectedValue, setSelectedValue] = useState<{
    id: string;
    title: string;
  }>();

  const handleSentMessage = () => {
    handleClose();
    const data = {
      campaign_id: selectedValue?.id,
    };
    fetch(`${API.contacts}/${contactId}/campaigns/create`, {
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
  };

  useEffect(() => {
    fetch(`${API.contacts}/${contactId}/available-campaigns`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response', response);
        setListData(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <Text style={styles.userName} numberOfLines={2}>
        Select The Campaign
      </Text>
      <View style={{padding: 20, flex: 1, width: '100%'}}>
        {/* <PickerNew
          // icon={require('assets/img/drop.png')}
          // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
          placeholder="Select Category"
          nameKey="title"
          data={listData}
          value={selectedValue?.title}
          onSelect={v => {
            setSelectedValue(v);
          }}
        /> */}

        <Dropdown
          style={styles.modalView}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedColor}
          data={listData ?? []}
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Select Category"
          searchPlaceholder="Search..."
          value={selectedValue?.title}
          onChange={v => {
            setSelectedValue(v);
          }}
        />

        <TouchableOpacity
          style={StyleSheet.flatten([styles.sendIcon, {marginTop: 20}])}
          onPress={() => handleSentMessage()}>
          <Text style={{fontFamily: font.semi, color: '#fff', fontSize: 15}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddSequence;

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
    height: 300,
    marginBottom: 20,
    overflow: 'hidden',
    width: '100%',
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
  userName: {
    color: color.fontblack,
    fontFamily: font.semi,
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 18,
    textAlign: 'center',
  },
});
