import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {shallow} from 'zustand/shallow';

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import InboxFilter from './components/InboxFilter';
import BottomSheetComponent from '../../Component/BottomSheetComponent';
import Header from '../../Component/Header';
import ModalComponent from '../../Component/ModalComponent';
import {color, font, shadow} from '../../Component/Styles';
import SmsModal from '../../Component/UserProfileComponent/SmsModal';
import UserEmailSmsList from '../../Component/UserProfileComponent/UserEmailSmsList';
import {API} from '../../Privet';

const {width} = Dimensions.get('window');

export default function Home({navigation, route}: AppScreenProps) {
  const [accessToken, userId] = useAppStore(
    s => [s.accessToken, s.user.id],
    shallow,
  );

  const refPage = useRef(0);

  const [emailList, setEmailList] = useState<any[]>([]);
  const [type, setType] = useState('email');
  const [totalSend, setTotalSend] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [countstate, setCountstate] = useState<any>('');
  const [isSmsModal, setIsSmsModal] = useState(false);
  const [smsData] = useState<any>({});
  const [hasMore, setHasMore] = useState(false);

  // const {params} = route;
  // console.log(' ---paramsticket_id---> ', params?.ticket_id);

  const count = useCallback(() => {
    fetch(API.common_appstate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        // console.log("response", response);
        if (response?.badges) {
          setCountstate(response.badges);
        }
      })
      .catch(e => {
        console.log('count error==>', e);
      });
  }, [accessToken]);

  const getEmailactivitiestApi = useCallback(() => {
    setVisible(false);
    setIsLoading(true);
    fetch(
      `${API.activities}?user_id=${userId}}&type=${type}&direction=outgoing&limit=15&offset=${refPage.current}`,
      {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        if (response?.data != null) {
          const _totalSend =
            Math.ceil(
              response.pagination.total_items /
                response.pagination.current_limit,
            ) - 1;
          if (refPage.current === 0) {
            setIsLoading(false);
            setEmailList(response.data);
          } else {
            setEmailList(prev => [...prev, ...response.data]);
          }
          setIsLoading(false);

          setTotalSend(_totalSend);
          refPage.current++;
          setHasMore(_totalSend >= refPage.current);
        } else {
          setIsLoading(false);
          refPage.current++;
          setEmailList([]);
          setHasMore(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        refPage.current++;
      });
  }, [accessToken, type, userId]);

  useEffect(() => {
    useAppStore.setState({isTabBar: true, activeRoute: 'Home'});
    count();
    getEmailactivitiestApi();
  }, [count, getEmailactivitiestApi]);

  // async componentDidMount() {
  //   useAppStore.setState({ isTabBar: true, activeRoute: 'Home' })
  //   await this.count()
  //   await this.getEmailactivitiestApi('email')
  // }

  const willFocus = () => {
    useAppStore.setState({isTabBar: true, activeRoute: 'Home'});
  };

  const onRefresh = () => {
    setTotalSend(0);
    refPage.current = 0;
    getEmailactivitiestApi();
  };

  const onEndReached = () => {
    if (hasMore) {
      getEmailactivitiestApi();
    }
  };

  const renderFooter = () => {
    if (totalSend >= refPage.current && !isLoading) {
      return (
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            ...shadow,
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={color.primeColor} style={{}} />
        </View>
      );
    } else {
      return null;
    }
  };

  const onPress = (pType: string) => {
    setEmailList([]);
    refPage.current = 0;
    setTotalSend(0);
    setType(pType);
    // getEmailactivitiestApi()
  };

  const renderCard = ({item, index}: any) => {
    if (item.object.object_details.contact_id === '') {
      return null;
    } else {
      const firstName =
        item.object &&
        item.object.object_details &&
        item.object.object_details.name.split(' ')[0];
      const lastName =
        item.object &&
        item.object.object_details &&
        item.object.object_details.name.split(' ')[1];
      const detail = {
        id:
          item.object &&
          item.object.object_details &&
          item.object.object_details.contact_id,
        first_name: firstName,
        last_name: lastName,
        initials: `${firstName[0]}${lastName[0]}`,
        email:
          item.object &&
          item.object.object_details &&
          item.object.object_details.email,
        name:
          item.object &&
          item.object.object_details &&
          item.object.object_details.name,
      };
      return (
        <View style={{marginTop: 12}}>
          <View style={{paddingHorizontal: 20}}>
            <UserEmailSmsList
              type={type}
              data={item}
              userData={detail}
              key={index}
              // navigation={navigation}
            />
          </View>
          <View
            style={{
              borderWidth: 0.5,
              marginBottom: 13,
              borderColor: color.borderColor,
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title="Inbox"
        _onWillFocus={willFocus}
        //active
        Limg={require('assets/img/back.png')}
        Lpress={navigation.goBack}
      />

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => onPress('email')}
          style={styles.tabsItem}>
          <View style={{position: 'relative'}}>
            <Text
              style={{
                color:
                  type === 'email'
                    ? color.secondColor
                    : 'rgba(58, 53, 65, 0.68)',
                fontFamily: type === 'email' ? font.semi : font.reg,
              }}>
              Email
            </Text>
            {countstate.unread_emails !== '0' ? (
              <View style={styles.countOuter}>
                <Text style={styles.countText}>{countstate.unread_emails}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress('sms')}
          style={styles.tabsItem}>
          <View style={{position: 'relative'}}>
            <Text
              style={{
                color:
                  type === 'sms' ? color.secondColor : 'rgba(58, 53, 65, 0.68)',
                fontFamily: type === 'sms' ? font.semi : font.reg,
              }}>
              SMS
            </Text>
            {countstate.unread_sms !== '0' ? (
              <View style={styles.countOuter}>
                <Text style={styles.countText}>{countstate.unread_sms}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderBottomWidth: 2,
            flex: 1,
            borderBottomColor:
              type === 'email' ? color.secondColor : color.borderColor,
          }}
        />
        <View
          style={{
            borderBottomWidth: 2,
            flex: 1,
            borderBottomColor:
              type === 'sms' ? color.secondColor : color.borderColor,
          }}
        />
      </View>

      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          marginTop: 5,
        }}
        data={emailList}
        renderItem={renderCard}
        ListEmptyComponent={
          <View style={{flex: 1, paddingHorizontal: 20, marginTop: 15}}>
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
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
                        width: width / 2.5,
                        marginTop: 2,
                        borderRadius: 2.5,
                      }}
                    />
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <View style={{height: 50, width: 50, borderRadius: 50}} />
                  <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                    <View
                      style={{
                        height: 20,
                        width: width / 2,
                        marginTop: 3,
                        borderRadius: 2.5,
                      }}
                    />
                    <View
                      style={{
                        height: 20,
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
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => onRefresh()}
          />
        }
      />

      <ModalComponent
        isVisible={isSmsModal}
        onRequestClose={() => setIsSmsModal(false)}>
        <SmsModal handleClose={() => setIsSmsModal(false)} detail={smsData} />
      </ModalComponent>

      <BottomSheetComponent
        isVisible={visible}
        onRequestClose={() => setVisible(false)}>
        <InboxFilter
          handleClose={() => setVisible(false)}
          handleSelectedFilter={(v: any) => onPress(v)}
          selectedValue={type}
        />
      </BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  countOuter: {
    alignItems: 'center',
    backgroundColor: color.secondColor,
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: -20,
    top: -10,
    width: 22,
  },
  countText: {color: '#fff', fontFamily: font.bold, fontSize: 10},
  tabsContainer: {flexDirection: 'row', height: 50},
  tabsItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
});
