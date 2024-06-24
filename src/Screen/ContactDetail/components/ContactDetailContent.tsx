import React, {useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';
import Animated, {FadeIn} from 'react-native-reanimated';

import {showFlashMessageError} from '@vn.starlingTech/helpers/flashMessageHelper';
import {colorDefault} from '@vn.starlingTech/theme/theming';

import Header from 'components/Header';
import {color, font} from 'components/Styles';
import ActionImage from 'components/UserProfileComponent/ActionImage';
import CallModal from 'components/UserProfileComponent/CallModal';
// import {goBack, navigate} from 'src/navigation/navigation';
import NavigationService from 'src/utils/NavigationService'
import {useContactById} from 'src/service/contact/contact';
import useAppStore from 'src/store/appStore';
import {RespContact} from 'src/types/contact.types';

import Activity from './Activity/Activity';
import {CustomerStatus} from './CustomerStatus';
import Details from './Details';
import Related from './Related';
import {ContactDetailSkeleton} from './Skeleton';
import {useNavigation} from '@react-navigation/native';

type Props = {
  id: string | number;
  handleModal(p: string): void;
};
export function ContactDetailContent(props: Props) {
  const {id} = props;
  const navigation = useNavigation();
  const {contact_section} = useAppStore(s => s.userSetting);

  const [tabIndex, setTabIndex] = useState(0);

  const {isLoading, isFetching, data: detail, refetch} = useContactById(id);

  const [callingVisible, setCallingVisible] = useState(false);

  const twilioPhone = detail?.phones?.find(x => x.type === 'Main');

  const onNotePress = () => {
    navigation.navigate('Note', {
      contactId: detail?.id + '',
    });
  };

  const composeSMS = () => {
    if (detail?.email) {
      navigation.navigate('ComposeSms', {
        detail: detail,
      });
    }
  };

  const composeEmail = () => {
    if (detail?.email) {
      navigation.navigate('ComposeMail', {
        detail: detail,
      });
    }
  };

  // const onHome = () => {
  //   navigate('Home')
  // }

  // const onHandleModal = (type: 'phone' | undefined) => () => {
  //   if (type === 'phone') {
  //     if (detail?.phone) {
  //       handleModal('callModal')
  //     }
  //   } else {
  //     handleModal('callModal')
  //   }
  // }

  const onShowCalling = () => {
    if (twilioPhone) {
      setCallingVisible(true);
    } else {
      showFlashMessageError('No phone number associated with contact.');
    }
  };

  const onHideCalling = () => {
    setCallingVisible(false);
  };

  const tabContent = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return (
          <Details
            data={detail || ({} as RespContact)}
            phoneCallback={onShowCalling}
            emailCallback={composeEmail}
          />
        );
      case 1:
        return <Activity id={id + ''} data={detail || {}} />;
      case 2:
        return <Related id={id + ''} data={detail || {}} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail, id, tabIndex]);

  return (
    <>
      <Header
        title="Contact Details"
        Limg={require('assets/img/back.png')}
        Lpress={() => navigation.goBack()}
        _onWillFocus={refetch}
        customeRightButton={
          <TouchableOpacity
            style={styles.headerRightBtn}
            // onPress={() => this.setState({ isEditVisible: !isEditVisible })}
            onPress={() => {
              navigation.navigate('ContactsStack', {
                screen: 'AddContact',
                params: {
                  detail: detail,
                },
              });
            }}>
            <Image
              source={require('assets/img/dots.png')}
              style={{resizeMode: 'contain', height: '50%', width: '50%'}}
            />
          </TouchableOpacity>
        }
      />
      {isLoading ? (
        <ContactDetailSkeleton />
      ) : (
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.flexGrow}
          stickyHeaderIndices={[2]}>
          {/* 0 */}
          <View style={{backgroundColor: '#fff', paddingTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 32,
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  overflow: 'hidden',
                  backgroundColor: color.borderColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText weight="500" size={18}>
                  {detail?.initials}
                </AppText>
              </View>
              <View style={{flex: 1, marginLeft: 15, justifyContent: 'center'}}>
                <AppText weight="700" size={22} mb={3}>
                  {detail?.first_name} {detail?.last_name}
                </AppText>
                {detail?.email ? (
                  <AppText size={16}>{detail?.email}</AppText>
                ) : null}
              </View>

              {!isFetching ? (
                <Animated.View
                  entering={FadeIn}
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  <CustomerStatus id={id} status={detail?.contact_status} />
                </Animated.View>
              ) : null}
            </View>
          </View>

          {/* 1 */}
          <View style={{marginBottom: 10}}>
            <AppBlock row mb={35} justifyContent="space-between">
              <ActionImage
                onPress={onShowCalling}
                label="Call"
                image={require('assets/img/callprime.png')}
              />

              <ActionImage
                onPress={composeEmail}
                label="Email"
                image={require('assets/img/Emailprime.png')}
              />

              <ActionImage
                onPress={composeSMS}
                label="SMS"
                image={require('assets/img/sms.png')}
              />

              <ActionImage
                onPress={onNotePress}
                label="Note"
                image={require('assets/img/note.png')}
              />

              <ActionImage
                onPress={() =>
                  navigation.navigate('ContactsStack', {
                    screen: 'Task',
                    params: {
                      contactId: detail?.id + '',
                    },
                  })
                }
                label="Task"
                image={require('assets/img/task.png')}
              />

              <ActionImage
                onPress={() =>
                  navigation.navigate('CalendarScreen', {
                    contactId: detail?.id + '',
                  })
                }
                label="Calendar"
                image={require('assets/img/DateRange.png')}
              />
            </AppBlock>
            {contact_section.show_status ||
              (contact_section.show_stage && (
                <View style={{flexDirection: 'row', paddingBottom: 20}}>
                  {contact_section.show_status ? (
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <AppText size={15} mb={5} color="placeholder">
                        Status
                      </AppText>
                      <AppText
                        weight="500"
                        color="textFocus"
                        size={16}
                        transform="capitalize">
                        {detail?.status}
                      </AppText>
                    </View>
                  ) : null}
                  {contact_section.show_stage && (
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <AppText size={15} mb={5} color="placeholder">
                        Stage
                      </AppText>
                      <AppText
                        weight="500"
                        color="textFocus"
                        size={16}
                        transform="capitalize">
                        {detail?.stage}
                      </AppText>
                    </View>
                  )}
                </View>
              ))}

            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={styles.statBox}>
                <Text
                  style={{
                    fontFamily: font.semi,
                    marginBottom: 5,
                    color: color.fontblack,
                    fontSize: 16,
                  }}>
                  Confidence
                </Text>

                <Text style={styles.statLbl}>level</Text>
              </View>

              <View
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                  height: 80,
                  borderRadius: 8,
                  marginRight: 4,
                  marginLeft: 4,
                }}>
                <View style={styles.statBox}>
                  <Text
                    style={{
                      fontFamily: font.bold,
                      marginBottom: 5,
                      color: color.secondColor,
                      fontSize: 16,
                    }}>
                    {detail?.arr}
                  </Text>

                  <Text style={styles.statLbl}>ARR</Text>
                </View>
              </View>
              <View style={styles.statBox}>
                <Text
                  style={{
                    fontFamily: font.bold,
                    marginBottom: 5,
                    color: '#00B389',
                    fontSize: 16,
                  }}>
                  {detail?.mrr}
                </Text>

                <Text style={styles.statLbl}>MRR</Text>
              </View>
            </View>
          </View>
          {/* 2 Tab */}
          <>
            <View style={styles.tabView}>
              <TabItem
                active={tabIndex === 0}
                label="Details"
                index={0}
                onPress={setTabIndex}
              />
              <TabItem
                active={tabIndex === 1}
                label="Activity"
                index={1}
                onPress={setTabIndex}
              />
              <TabItem
                active={tabIndex === 2}
                label="Related"
                index={2}
                onPress={setTabIndex}
              />
            </View>
          </>
          {tabContent}
        </ScrollView>
      )}
      <CallModal
        visible={callingVisible}
        handleClose={onHideCalling}
        detail={detail}
        phone={twilioPhone}
      />
    </>
  );
}

type TabItemProps = {
  label: string;
  onPress(i: number): void;
  active: boolean;
  index: number;
};
const TabItem = (props: TabItemProps) => {
  const {label, index, active} = props;

  const onPress = () => {
    props.onPress(index);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabItem, active && styles.tabItemActive]}>
      <Text style={[styles.tabItemLabel, active && styles.tabItemLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexGrow: {flexGrow: 1},
  headerRightBtn: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: color.lightGaryBackground,
    borderRadius: 8,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  statLbl: {
    color: color.fontblack,
    fontFamily: font.reg,
    fontSize: 12,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tabItemActive: {
    borderBottomColor: colorDefault.secondary,
    borderBottomWidth: 2,
  },
  tabItemLabel: {
    color: 'rgba(58, 53, 65, 0.68)',
    fontFamily: font.reg,
  },
  tabItemLabelActive: {
    color: color.fontblack,
    fontFamily: font.semi,
  },
  tabView: {
    backgroundColor: colorDefault.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 50,
  },
});
