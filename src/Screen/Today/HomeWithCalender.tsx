import React, {useEffect, useState} from 'react';
import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import ActivityCalender from './components/ActivityCalender';
import Today from './components/Today';
import Header from '../../Component/Header';
import {color, font} from '../../Component/Styles';

export default function HomeWithCalender({navigation}: AppScreenProps) {
  const userId = useAppStore(s => s.user.id);

  const [active, setActive] = useState('Today');

  useEffect(() => {}, []);

  /**
   * Not in use in navigation v6
   */
  const willFocus = () => {
    useAppStore.setState({isTabBar: true, activeRoute: 'HomeWithCalender'});
  };

  return (
    <View style={styles.container}>
      <Header
        title={active === 'Today' ? 'Today' : 'Activity'}
        Rpress3={() =>
          navigation.navigate('SelectContact', {
            contactId: userId,
          })
        }
        Rpress={() => navigation.navigate('Search')}
        Rimg={require('assets/img/searchToday.png')}
        Rimg3={require('assets/img/plus.png')}
        // _onWillFocus={willFocus}
        active
      />
      <View style={{height: 50, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setActive('Today')}
          style={[
            styles.tabItem,
            {
              borderBottomColor:
                active === 'Today' ? color.secondColor : color.borderColor,
            },
          ]}>
          <Text
            style={{
              color:
                active === 'Today'
                  ? color.secondColor
                  : 'rgba(58, 53, 65, 0.68)',
              fontFamily: active === 'Today' ? font.semi : font.reg,
            }}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActive('Activity')}
          style={[
            styles.tabItem,
            {
              borderBottomColor:
                active === 'Activity' ? color.secondColor : color.borderColor,
            },
          ]}>
          <Text
            style={{
              color:
                active === 'Activity'
                  ? color.secondColor
                  : 'rgba(58, 53, 65, 0.68)',
              fontFamily: active === 'Activity' ? font.semi : font.reg,
            }}>
            Activity
          </Text>
        </TouchableOpacity>
      </View>
      {active === 'Today' ? (
        <Today navigation={navigation} />
      ) : (
        <ActivityCalender />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', flex: 1},
  tabItem: {
    alignItems: 'center',
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: 'center',
  },
});
