import React from 'react';
import {StyleSheet} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';

import PickerNew from 'components/PickerNew';
import {useCompanyLocation} from 'src/service/company/company';
import {RespLocation_Data} from 'src/types/location.types';
import {color, font, shadow} from 'src/Component/Styles';
import {Dropdown} from 'react-native-element-dropdown';

interface Props {
  value: RespLocation_Data | undefined;
  onChange(p: RespLocation_Data): void;
}

export function LocationPicker(props: Props) {
  const {data} = useCompanyLocation();

  return (
    <AppBlock>
      <AppText size={13} style={styles.label}>
        Location
      </AppText>
      <AppBlock flex mb={15}>
        {/* <PickerNew
          placeholder="Location"
          nameKey="title"
          idKey={'id'}
          data={data?.data}
          value={props.value}
          onSelect={props.onChange}
        /> */}

        <Dropdown
          style={styles.modalView}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedColor}
          data={data?.data ?? []}
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="Location"
          value={props.value}
          onChange={props.onChange}
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
