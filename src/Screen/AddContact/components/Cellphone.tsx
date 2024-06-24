import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';
import {Dropdown} from 'react-native-element-dropdown';

import {color, font} from 'src/Component/Styles';

export type PhoneType = {
  prefix: string;
  country: string;
  short_phone: string;
  ext: string;
  type: string;
};

type Props = {
  phones: PhoneType[];
  setPhones(p: PhoneType[]): void;
};
export function Cellphones(props: Props) {
  const {phones, setPhones} = props;

  const onAddMore = () => {
    const temp = [...phones];
    temp.push({
      prefix: countryList[0].callingCode,
      short_phone: '',
      country: countryList[0].name,
      ext: '',
      type: 'Other',
    });
    setPhones(temp);
  };

  if (!phones.some(x => x.type === 'Main')) {
    phones.unshift({
      prefix: countryList[0].callingCode,
      short_phone: '',
      country: countryList[0].name,
      ext: '',
      type: 'Main',
    });
  }

  return (
    <>
      {phones.map((item, index) => (
        <Item
          key={index?.toString()}
          item={item}
          index={index}
          phones={phones}
          setPhones={setPhones}
        />
      ))}
      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={onAddMore}>
        <Text style={{fontFamily: font.reg, color: '#7E8EAA'}}>Add More +</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={() => {
          console.log('showPhoneCount', phones)
        }}
      >
        <Text style={{ fontFamily: font.reg, color: '#7E8EAA' }}>Show All</Text>
      </TouchableOpacity> */}
    </>
  );
}

type ItemProps = {
  item: PhoneType;
  index: number;
  phones: PhoneType[];
  setPhones(p: PhoneType[]): void;
};

function Item({item, index, phones, setPhones}: ItemProps) {
  const onRemovePress = () => {
    const temp = [...phones];
    temp.splice(index, 1);
    setPhones(temp);
  };

  const onChangeText = (txt: string) => {
    const temp = [...phones];
    temp[index].short_phone = txt;
    setPhones(temp);
  };

  const onChangeTextExt = (txt: string) => {
    const temp = [...phones];
    temp[index].ext = txt;
    setPhones(temp);
  };

  const onSelect = (p: CountryCode) => {
    const temp = [...phones];
    temp[index].prefix = p.callingCode;
    temp[index].country = p.name;
    setPhones(temp);
  };

  const onSelectPhoneType = (p: PhoneTypes) => {
    const temp = [...phones];
    temp[index].type = p.name;
    setPhones(temp);
  };

  const selectedCountry = countryList.find(
    x => x.callingCode === item.prefix && x.name === item.country,
  );

  const selectedPhoneType = phoneTypesData.find(x => x.name === item.type);

  const isMain = item.type === 'Main';

  return (
    <View style={{marginBottom: 15}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.label}>{isMain ? 'Cellphone' : 'Phone'}</Text>
        {!isMain && (
          <TouchableOpacity onPress={onRemovePress}>
            <Text
              style={{
                fontFamily: font.reg,
                color: 'red',
                marginBottom: 5,
              }}>
              Remove
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={{width: '30%'}}>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            data={countryList}
            //search
            maxHeight={230}
            labelField={'code'}
            valueField={'name'}
            placeholder={'Select'}
            searchPlaceholder="Search..."
            value={selectedCountry}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={onSelect}
            renderItem={renderCountryItem}
            // dropdownPosition="bottom"
            // flatListProps={{
            //   ListEmptyComponent: renderEmptyData(),
            // }}
          />
        </View>
        <TextInput
          style={{
            color: '#000',
            borderWidth: 1,
            borderRadius: 8,
            width: '70%',
            marginLeft: '2%',
            borderColor: color.borderColor,
            paddingHorizontal: 12,
            height: 50,
          }}
          placeholder="Cellphone"
          value={item.short_phone}
          onChangeText={onChangeText}
          placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
        />
      </View>
      <AppBlock row justifyContent="space-between" mt={4}>
        <TextInput
          style={{
            color: '#000',
            borderWidth: 1,
            borderRadius: 8,
            width: index > 0 ? '30%' : '100%',
            borderColor: color.borderColor,
            paddingHorizontal: 12,
            height: 50,
          }}
          placeholder="Ext"
          value={item.ext}
          onChangeText={onChangeTextExt}
          placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
        />
        {!isMain && (
          <Dropdown
            style={[styles.dropdown, {width: '69%'}]}
            selectedTextStyle={styles.selectedTextStyle}
            data={phoneTypesData}
            maxHeight={230}
            labelField={'name'}
            valueField={'name'}
            placeholder={'Select'}
            searchPlaceholder="Search..."
            value={selectedPhoneType}
            onChange={onSelectPhoneType}
            renderItem={renderCountryItem}
          />
        )}
      </AppBlock>
    </View>
  );
}

const renderCountryItem = (item: CountryCode) => {
  return (
    <AppBlock ph={9} pv={8}>
      <AppText size={14}>{item.code}</AppText>
    </AppBlock>
  );
};

type PhoneTypes = {
  name: string;
  code: string;
};

export const phoneTypesData: PhoneTypes[] = [
  {name: 'Business', code: 'Business'},
  {name: 'Home', code: 'Home'},
  {name: 'Mobile', code: 'Mobile'},
  {name: 'Work', code: 'Work'},
  {name: 'Other', code: 'Other'},
];

type CountryCode = {
  code: string;
  name: string;
  callingCode: string;
};

export const countryList: CountryCode[] = [
  {code: 'US (+1)', callingCode: '1', name: 'United States'},
  {code: 'AU (+61)', callingCode: '61', name: 'Australia'},
  {code: 'NZ (+64)', callingCode: '64', name: 'New Zealand'},
  {code: 'CA (+1)', callingCode: '1', name: 'Canada'},
  {code: 'BR (+55)', callingCode: '55', name: 'Brazil'},
  {code: 'UK (+44)', callingCode: '44', name: 'United Kingdom'},
];

const styles = StyleSheet.create({
  dropdown: {
    borderColor: 'rgba(58, 53, 65, .26)',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 8,
    zIndex: 0,
  },
  label: {
    color: '#7E8EAA',
    flex: 1,
    fontFamily: font.reg,
    marginBottom: 5,
  },
  selectedTextStyle: {
    fontFamily: font.reg,
    fontSize: 14,
    //color: '#7E8EAA',
  },
});
