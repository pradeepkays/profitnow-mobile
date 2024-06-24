import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import moment from 'moment';

import {color, font} from 'src/Component/Styles';
import UserBookedCalls from 'src/Component/UserProfileComponent/UserBookedCalls';
import UserCallList from 'src/Component/UserProfileComponent/UserCallList';
import UserEmailSmsList from 'src/Component/UserProfileComponent/UserEmailSmsList';
// import {navigate} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService';

type Props = {
  type: string;
  item: any;
  details: any;
  index: number;
};

export function ActivityItem(props: Props) {
  const {type, item, details, index} = props;

  const utcToLocalCall = (date: any) => {
    // Yesterday
    let YesterdayTimeConvert = moment().subtract(1, 'day').utc();
    // Today
    const localtoday = moment().utc().toDate();
    // Date
    let localTime = moment.utc(date).toDate();

    if (
      moment(localTime).format('MM/DD/YYYY') ===
      moment(localtoday).format('MM/DD/YYYY')
    ) {
      return 'Today ' + moment(localTime).format('hh:mm A');
    } else if (
      moment(localTime).format('MM/DD/YYYY') ===
      moment(YesterdayTimeConvert).format('MM/DD/YYYY')
    ) {
      return 'Yesterday ' + moment(localTime).format('hh:mm A');
    } else {
      return moment(localTime).format('MM/DD/YYYY hh:mm A');
    }
  };

  return (
    <View style={{marginTop: 12}}>
      <View style={{paddingHorizontal: 20}}>
        {type === 'sms' || type === 'email' ? (
          <UserEmailSmsList
            data={item}
            userData={details}
            key={index}
            type={type}
          />
        ) : null}
        {type === 'Booked Calls' && <UserBookedCalls data={item} />}

        {/* Call  */}
        {type === 'call' ? (
          <UserCallList data={item} userData={details} key={index} />
        ) : null}
        {/* Note  */}
        {type === 'note' ? (
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <View
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                  overflow: 'hidden',
                  backgroundColor: color.borderColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: color.fontcolor,
                    fontSize: 18,
                  }}>
                  {details?.initials}
                </Text>
              </View>
              <View
                style={{
                  height: 18,
                  width: 18,
                  backgroundColor: color.secondColor,
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  borderRadius: 18,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('assets/img/note.png')}
                  style={{
                    height: '45%',
                    width: '45%',
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: font.semi,
                  color: color.fontcolor,
                  marginBottom: 5,
                }}>
                {item?.description}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: 'rgba(58, 53, 65, 0.78)',
                    fontSize: 11.5,
                    marginLeft: 3,
                  }}>
                  {utcToLocalCall(item?.time)}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {/* Task  */}
        {type === 'task' ? (
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <View
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                  overflow: 'hidden',
                  backgroundColor: color.borderColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: color.fontcolor,
                    fontSize: 18,
                  }}>
                  {details?.initials}
                </Text>
              </View>
              <View
                style={{
                  height: 18,
                  width: 18,
                  backgroundColor: color.secondColor,
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  borderRadius: 18,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('assets/img/file.png')}
                  style={{
                    height: '45%',
                    width: '45%',
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: font.semi,
                  color: color.fontcolor,
                  marginBottom: 5,
                }}>
                {item?.description}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: 'rgba(58, 53, 65, 0.78)',
                    fontSize: 11.5,
                    marginLeft: 3,
                  }}>
                  {utcToLocalCall(item?.time)}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        {type === 'Support Tickets' ? (
          <TouchableOpacity
            style={{flexDirection: 'row', marginBottom: 15}}
            onPress={() =>
              NavigationService.navigate('TicketDetails', {
                id: item.id + '',
              })
            }>
            <View
              style={{
                height: 45,
                width: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                  overflow: 'hidden',
                  backgroundColor: color.borderColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: font.semi,
                    color: color.fontcolor,
                    fontSize: 18,
                  }}>
                  {details?.initials}
                </Text>
              </View>
              <View
                style={{
                  height: 18,
                  width: 18,
                  backgroundColor: color.secondColor,
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  borderRadius: 18,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('assets/img/Supporttickets.png')}
                  style={{
                    height: '45%',
                    width: '45%',
                    resizeMode: 'contain',
                    tintColor: '#fff',
                  }}
                />
              </View>
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: font.semi,
                  color: color.fontcolor,
                  marginBottom: 5,
                }}>
                {item?.subject}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: font.reg,
                    color: 'rgba(58, 53, 65, 0.78)',
                    fontSize: 11.5,
                    marginLeft: 3,
                  }}>
                  {utcToLocalCall(item?.time_created)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
