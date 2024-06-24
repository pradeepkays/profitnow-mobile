import {font} from 'components/Styles';
import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';

interface NavigationIconProps {
  route: string;
  isFocused: boolean;
}

const NavigationIcon = ({route, isFocused}: NavigationIconProps) => {
  const renderIcon = (route: string, isFocues: boolean) => {
    switch (route) {
      case 'TodayStack':
        return (
          <Image
            source={require('assets/img/CalenderHome.png')}
            style={[styles.image, {tintColor: isFocues ? '#fff' : '#fff7'}]}
          />
        );
      case 'ContactsStack':
        return (
          <Image
            source={require('assets/img/PersonHome.png')}
            style={[styles.image, {tintColor: isFocues ? '#fff' : '#fff7'}]}
          />
        );
      case 'PipelinesStack':
        return (
          <Image
            source={require('assets/img/FilterHome.png')}
            style={[styles.image, {tintColor: isFocues ? '#fff' : '#fff7'}]}
          />
        );
      case 'InboxStack':
        return (
          <Image
            source={require('assets/img/inboxHome.png')}
            style={[styles.image, {tintColor: isFocues ? '#fff' : '#fff7'}]}
          />
        );
      case 'MoreStack':
        return (
          <Image
            source={require('assets/img/moremenu.png')}
            style={[styles.image, {tintColor: isFocues ? '#fff' : '#fff7'}]}
          />
        );
      case 'SupportStack':
        return (
          <Image
            source={require('assets/img/DateRangeold.png')}
            style={[styles.image, {tintColor: isFocues ? '#fff' : '#fff7'}]}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      {renderIcon(route, isFocused)}
      {route && (
        <Text style={[styles.label, {color: isFocused ? '#fff' : '#fff7'}]}>
          {route.replace('Stack', '')}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {height: 25, resizeMode: 'contain', width: 25},
  label: {fontFamily: font.reg, fontSize: 12, marginTop: 5},
});

export default NavigationIcon;
