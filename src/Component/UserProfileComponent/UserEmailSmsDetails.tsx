import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import HTMLView from 'react-native-htmlview';

import {utcToLocal} from 'src/helper/timeHelper';
import {AppScreenProps} from 'src/navigation/navigation.types';

import SmsModal from './SmsModal';
import Header from '../Header';
import ModalComponent from '../ModalComponent';
import {color, font, shadow} from '../Styles';

const UserEmailSmsDetails = ({navigation, route}: AppScreenProps) => {
  const data = (route?.params && route?.params?.data) || {};
  const userData = (route?.params && route?.params.userData) || {};
  const type = (data && data.object && data.object.type) || 'email';
  const [smsModal, setSmsModal] = useState(false);

  // console.log('data==>', data);
  // console.log('userData==>', userData);

  const handleEmailReply = () => {
    navigation.navigate('ComposeMail', {detail: userData, data: data});
  };

  const handleSmsReply = () => {
    //setSmsModal(!smsModal);
    navigation.navigate('ComposeSms', {detail: userData, data: data});
  };

  return (
    <View style={styles.container}>
      <Header
        Limg={require('assets/img/back.png')}
        Lpress={() => navigation.goBack()}
      />

      <View style={styles.headerContainer}>
        <View style={{marginBottom: 5, marginLeft: 60}}>
          <Text style={styles.timeText}>{utcToLocal(data?.time) || '-'}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.userImageContainer}>
            <View style={styles.userNameInitials}>
              <Text style={styles.initials}>{userData?.initials}</Text>
            </View>
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.flSpace}>
              <Text style={styles.userName} numberOfLines={1}>
                {userData?.first_name} {userData?.last_name}
              </Text>
            </View>
            <Text style={styles.subjectName} numberOfLines={2}>
              {userData?.email ||
                data?.object?.object_details?.phone ||
                data?.object?.object_details?.subject}{' '}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          Fwd:{' '}
          {type === 'sms'
            ? data?.object?.object_details?.phone
            : data?.object?.object_details?.subject}{' '}
        </Text>
      </View>

      <View style={styles.messageDetailsOuter}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {/* <Text style={styles.forwardText}>---------- Forwarded message ----------</Text>
                    <Text style={styles.fromText}>From: <Text style={styles.userFromName}>Leon Andrew</Text> <Text style={styles.arrowText}>{'<'}</Text><Text style={styles.mailText}>support@videomax.io</Text><Text style={styles.arrowText}>{'>'}</Text></Text>
                    <Text style={styles.fromText}>Date: {utcToLocal(data?.time, 'ddd, MMM DD, YYYY') || '-'} at {utcToLocal(data?.time, ' hh:mm A') || '-'}</Text>
                    <Text style={styles.fromText}>Subject: {data?.object?.object_details?.subject}</Text>
                    <Text style={styles.fromText}>To: <Text style={styles.arrowText}>{'<'}</Text><Text style={styles.mailText}>support@videomax.io</Text><Text style={styles.arrowText}>{'>'}</Text></Text> */}

          <HTMLView
            style={{overflow: 'hidden'}}
            value={data?.object?.object_details?.text.trim()}
            textComponentProps={{
              style: {color: '#000', fontFamily: font.semi, fontSize: 14},
            }}
          />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.bottomContainer}
        onPress={
          type === 'sms' ? () => handleSmsReply() : () => handleEmailReply()
        }>
        <Image
          style={styles.userImage}
          source={require('assets/img/sms.png')}
        />
        <Text style={styles.replytext} numberOfLines={1}>
          Reply to {userData?.first_name} {userData?.last_name}
        </Text>
      </TouchableOpacity>

      <ModalComponent
        isVisible={smsModal}
        onRequestClose={() => setSmsModal(false)}>
        <SmsModal
          handleClose={() => setSmsModal(false)}
          // image={image}
          detail={userData}
        />
      </ModalComponent>
    </View>
  );
};

export default UserEmailSmsDetails;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    width: '100%',
    ...shadow,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  flSpace: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
  },
  initials: {
    color: '#000',
    fontFamily: font.semi,
    fontSize: 18,
  },
  messageContainer: {
    borderBottomWidth: 1,
    borderColor: color.borderColor,
    marginTop: 10,
    padding: 20,
    width: '100%',
  },
  messageDetailsOuter: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  messageText: {
    color: '#000',
    fontFamily: font.bold,
    fontSize: 18,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 15,
  },
  replytext: {
    color: '#616161',
    fontFamily: font.semi,
    fontSize: 15,
  },
  subjectName: {
    color: '#000',
    fontFamily: font.reg,
    fontSize: 15,
    marginTop: 5,
  },
  timeText: {
    color: 'rgba(58, 53, 65, 0.78)',
    fontFamily: font.reg,
    fontSize: 13,
  },
  userImage: {
    borderRadius: 20,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  userImageContainer: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  userName: {
    color: '#000',
    flex: 1,
    fontFamily: font.bold,
    fontSize: 18,
    marginRight: 5,
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
