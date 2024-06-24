import React, { useEffect, useState } from 'react';
import {
  Image,
  ListRenderItemInfo,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppBlock, appSize, AppText } from '@starlingtech/element';
import settings from '@vn.starlingTech/config/settings';
import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList';

import { AppScreenProps } from 'src/navigation/navigation.types';
import { useContactList } from 'src/service/contact/contact';
import useAppStore from 'src/store/appStore';
import { RespContacts_Data } from 'src/types/contact.types';
import { RespPipeline, Stage } from 'src/types/pipeline.types';

import { PipelineFilter } from './components/Pipeline.Filter';
import { color, font } from '../../Component/Styles';

const { StatusBarManager } = NativeModules;

const PipelinesContacts = ({ navigation }: AppScreenProps) => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<RespPipeline>();
  const [stage, setStage] = useState<Stage>();

  const syncingContact = useAppStore((s) => s.syncing.contacts);

  const useGetScreenData = (_page: number, offset: number) => {
    return useContactList({
      status: status?.status,
      stage: stage?.stage,
      limit: settings.LIST_SIZE,
      name: keyword,
      offset,
      // Additional modification here
      extraParam: 'example',
    });
  };

  useEffect(() => {
    // useAppStore.setState({ isTabBar: true, activeRoute: 'Pipelines' });
  }, []);

  const handleSelect = (id: number) => {
    navigation.navigate('UserDetails', { id });
  };

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<RespContacts_Data>) => {
    return (
      <View key={index + ''} style={styles.itemContainer}>
        <View style={styles.flSpace}>
          <View>
            <AppBlock
              radius={6}
              padding={[2, 6]}
              mb={18}
              alignSelf="baseline"
              background={
                item.contact_status === 'Active' ? 'success' : 'danger'
              }
            >
              <AppText color="white">{item.contact_status}</AppText>
            </AppBlock>
            <Text style={styles.cellPhoneText}>
              Name: <Text style={styles.nameValue}>{item.name}</Text>
            </Text>
            {item.phone ? (
              <Text style={styles.cellPhoneText}>
                Cell Phone: <Text style={styles.nameValue}>{item.phone}</Text>
              </Text>
            ) : null}
            <Text style={styles.cellPhoneText}>
              Email:{' '}
              <Text style={styles.nameValue}>
                {item.email ? item.email : 'N/A'}
              </Text>
            </Text>
            {item.stage ? (
              <Text style={styles.cellPhoneText}>
                Stage: <Text style={styles.nameValue}>{item.stage}</Text>
              </Text>
            ) : null}
            <Text style={styles.cellPhoneText}>
              Value:{' '}
              <Text style={styles.valueText}>
                {'$'}
                {item.value}
              </Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => handleSelect(item.id)}>
            <Image
              source={require('assets/img/dots.png')}
              style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
                tintColor: 'rgba(58, 53, 65, 0.54)',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Pipelines</Text>
      <View style={styles.searchHeader}>
        <View style={styles.searchIconOuter}>
          <Image
            source={require('assets/img/Search.png')}
            style={styles.searchIcon}
          />
        </View>

        <TextInput
          style={styles.searchStyle}
          placeholder="Search"
          value={keyword}
          blurOnSubmit
          onChangeText={setKeyword}
        />
      </View>

      {/* <PipelineFilter
        stage={stage}
        status={status}
        setStatus={setStatus}
        setStage={setStage}
      /> */}

      <AppFlatList
        useGetScreenData={useGetScreenData}
        renderItem={renderItem}
        listContainerStyle={{ paddingHorizontal: appSize(15) }}
        timing={syncingContact}
      />
    </View>
  )
}

export default PipelinesContacts

const styles = StyleSheet.create({
  cellPhoneText: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    fontSize: 14,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  flSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemContianer: {
    backgroundColor: color.whiteColor,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingVertical: 26,
    width: '100%',
  },
  labelText: {
    alignSelf: 'center',
    color: '#212121',
    fontFamily: font.semi,
    fontSize: 20,
    marginTop: StatusBarManager.HEIGHT + 25,
  },
  nameValue: {
    color: 'rgba(21, 28, 42, 0.87)',
    fontFamily: font.semi,
  },
  searchHeader: {
    alignItems: 'center',
    borderBottomColor: color.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 15,
    paddingHorizontal: 12,
    width: '100%',
  },
  searchIcon: {
    height: '45%',
    resizeMode: 'contain',
    tintColor: 'rgba(58, 53, 65, 0.87)',
    width: '45%',
  },
  searchIconOuter: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginRight: 10,
    width: 50,
  },
  searchStyle: {
    color: '#000',
    flex: 1,
    fontFamily: font.reg,
    fontSize: 18,
    height: 50,
    padding: 0,
  },
  valueText: {
    color: '#5E8DF7',
    fontFamily: font.semi,
  },
})
