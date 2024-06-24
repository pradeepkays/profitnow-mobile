import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {useAppUserSetting} from 'src/service/common/common';
import useAppStore from 'src/store/appStore';

import {color, font} from '../../../Component/Styles';
import {API} from '../../../Privet';

const {width} = Dimensions.get('window');

export default function Today({navigation}: any) {
  const tasksSyncing = useAppStore(s => s.syncing.tasks);

  const [timetableList, setTimetableList] = useState([global]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  useAppUserSetting(useAppStore.getState().accessToken);

  const getData = useCallback(() => {
    const day = moment(date).format('DD');
    const month = moment(date).format('MM');
    const year = moment(date).format('YYYY');
    fetch(`${API.calendar}?day=${day}&month=${month}&year=${year}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: useAppStore.getState().accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        setIsLoading(false);
        if (response?.data) {
          setTimetableList(response?.data?.reverse());
        } else {
          setTimetableList([]);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setTimetableList([]);
      });
  }, [date]);

  useEffect(() => {
    getData();
  }, [getData, tasksSyncing]);

  const onDateSelected = (_date: Date) => {
    setDate(_date);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F9'}}>
      <View style={{paddingHorizontal: 10, marginTop: -5}}>
        <CalendarStrip
          scrollable={false}
          showMonth={false}
          selectedDate={new Date()}
          style={{height: 90}}
          dateNameStyle={{color: color.fontcolor, fontFamily: font.reg}}
          dateNumberStyle={{color: color.fontcolor, fontFamily: font.reg}}
          highlightDateNumberContainerStyle={{
            backgroundColor: color.secondColor,
            borderRadius: 50,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          highlightDateNumberStyle={{color: '#fff', fontFamily: font.reg}}
          highlightDateNameStyle={{color: '#000'}}
          onDateSelected={(e: any) => onDateSelected(e._d)}
        />
      </View>
      <FlatList
        contentContainerStyle={{
          paddingTop: 25,
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        data={timetableList}
        renderItem={({item}: any) => (
          <View style={{flex: 1, flexDirection: 'row', paddingBottom: 0}}>
            <Text
              style={{
                fontFamily: font.reg,
                color: '#212121',
                marginTop: 10,
              }}>
              {formDateTime(item?.timescheduled_user_tz)}
            </Text>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                ellipsizeMode="clip"
                numberOfLines={1}
                style={{color: 'rgba(0, 0, 0, 0.1)'}}>
                _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                _ _ _ _ _
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  marginTop: 10,
                  overflow: 'hidden',
                  flexDirection: 'row',
                }}
                onPress={() => {
                  navigation.navigate('UserDetails', {
                    id: item?.contact_id + '',
                    item: item,
                  });
                }}>
                <View
                  style={{
                    width: 10,
                    backgroundColor: '#4CB200',
                    height: '100%',
                  }}
                />
                <View
                  style={{
                    paddingVertical: 15,
                    marginHorizontal: 15,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: font.semi,
                      color: '#000',
                      marginRight: 20,
                    }}>
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.bold,
                      color: color.lableColor,
                      fontSize: 11,
                    }}>
                    {item?.note}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={{flex: 1}}>
            {!isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('assets/img/empty.png')}
                  style={{height: 90, width: 90}}
                />
                <Text
                  style={{
                    fontFamily: font.reg,
                    textAlign: 'center',
                    marginTop: 10,
                    color: color.lableColor,
                  }}>
                  Result not found!
                </Text>
              </View>
            ) : (
              <SkeletonPlaceholder>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 60, width: 60, borderRadius: 10}} />
                  <View style={{paddingLeft: 18}}>
                    <View
                      style={{
                        height: 15,
                        width: width,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 60, width: 60, borderRadius: 10}} />
                  <View style={{paddingLeft: 18}}>
                    <View
                      style={{
                        height: 15,
                        width: width,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 60, width: 60, borderRadius: 10}} />
                  <View style={{paddingLeft: 18}}>
                    <View
                      style={{
                        height: 15,
                        width: width,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 60, width: 60, borderRadius: 10}} />
                  <View style={{paddingLeft: 18}}>
                    <View
                      style={{
                        height: 15,
                        width: width,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,
                        width: width / 2,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,

                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 60, width: 60, borderRadius: 10}} />
                  <View style={{paddingLeft: 18}}>
                    <View
                      style={{
                        height: 15,

                        width: width,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,

                        width: width / 2,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,

                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 60, width: 60, borderRadius: 10}} />
                  <View style={{paddingLeft: 18}}>
                    <View
                      style={{
                        height: 15,

                        width: width,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,

                        width: width / 2,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 15,

                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            )}
          </View>
        }
        keyExtractor={(item, index) => index + ''}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getData} />
        }
      />
    </View>
  );
}

function formDateTime(date: any, format = 'hh:mm A') {
  let localTime = moment(date).format(format);
  return localTime;
}

function utcToLocal(date: any, format = 'hh:mm A') {
  let localTime = moment.utc(date).format(format);
  return localTime;
}
