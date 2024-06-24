import React from 'react';

import {AppBlock, AppText} from '@starlingtech/element';

import {useCompanyUsers} from 'src/service/company/company';
import {AssignedUser} from 'src/types/contact.types';

import PickerNew from './PickerNew';
import {Dropdown} from 'react-native-element-dropdown';
import {StyleSheet} from 'react-native';
import {color, font, shadow} from 'src/Component/Styles';

type Props = {
  label?: string;
  value: string | number;
  onChanged: (p: AssignedUser) => void;
};
export function CompanyUserPicker(props: Props) {
  const {label = 'Assigned User', value, onChanged} = props;

  const {data} = useCompanyUsers();

  return (
    <AppBlock style={{marginBottom: 15}}>
      <AppText
        size={13}
        style={{
          flex: 1,
          color: '#7E8EAA',
        }}
        mb={5}>
        {label}
      </AppText>
      <AppBlock style={{flex: 1}}>
        {/* <PickerNew
          data={data?.data}
          placeholder="Assigned User"
          nameKey="title"
          idKey="id"
          value={value}
          onSelect={onChanged}
        /> */}

        <Dropdown
          style={styles.modalView}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedColor}
          data={
            data?.data?.length ? data?.data : [{title: 'No records', id: 0}]
          }
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Assigned Users"
          value={value}
          onChange={onChanged}
        />
      </AppBlock>
    </AppBlock>
  );
}

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
  label: {
    color: '#7E8EAA',
    flex: 1,
    marginBottom: 5,
  },
});
