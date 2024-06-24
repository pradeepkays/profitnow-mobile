import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import moment from 'moment';

// import {navigate} from 'src/navigation/navigation';

import {color, font} from '../Styles';
import {useNavigation} from '@react-navigation/native';
import NavigationService from 'src/utils/NavigationService';

type Props = {
  data: any;
  type: any;
  userData: any;
};

const UserEmailSmsList = ({data, userData, type}: Props) => {
  const navigation = useNavigation();
  const utcToLocal = (date: string, format = 'MM/DD/YYYY hh:mm A') => {
    return moment.utc(date).format(format);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        NavigationService.navigate('InboxStack', {
          screen: 'UserEmailSmsDetails',
          params: {data, userData},
        })
      }>
      <View style={styles.userImageContainer}>
        <View style={styles.userNameInitials}>
          <Text style={styles.initials}>{userData?.initials}</Text>
        </View>
        <View style={styles.emailImageShort}>
          <Image
            source={
              type === 'email'
                ? require('assets/img/Emailprime.png')
                : require('assets/img/sms.png')
            }
            style={styles.emailImage}
          />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text
          numberOfLines={2}
          style={[styles.descText, {fontWeight: data.unread ? 'bold' : '600'}]}>
          {data?.description}
        </Text>
        {type === 'email' ? (
          <Text style={styles.fromText} numberOfLines={1}>
            From: {userData?.email || '-'}{' '}
          </Text>
        ) : (
          <Text style={styles.fromText} numberOfLines={1}>
            From: {userData?.first_name} {userData?.last_name}
          </Text>
        )}

        <Text style={styles.timeText}>{utcToLocal(data?.time) || '-'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserEmailSmsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  descText: {
    color: color.fontcolor,
    fontFamily: font.semi,
    marginBottom: 5,
    marginRight: 10,
  },
  detailsContainer: {
    marginLeft: 15,
    width: '90%',
  },
  emailImage: {
    height: 11,
    resizeMode: 'contain',
    width: 11,
    //tintColor: '#fff',
  },
  emailImageShort: {
    alignItems: 'center',
    backgroundColor: color.secondColor,
    borderRadius: 10,
    bottom: -2,
    height: 18,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: -2,
    width: 18,
  },
  fromText: {
    color: color.fontcolor,
    fontFamily: font.reg,
    fontSize: 14,
    marginBottom: 5,
  },
  initials: {
    color: '#000',
    fontFamily: font.semi,
    fontSize: 18,
  },
  timeText: {
    color: 'rgba(58, 53, 65, 0.78)',
    fontFamily: font.reg,
    fontSize: 14,
  },
  userImageContainer: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  userNameInitials: {
    alignItems: 'center',
    backgroundColor: 'rgba(58,53,65,.08)',
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 45,
  },
});
