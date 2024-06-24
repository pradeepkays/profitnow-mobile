import React, {useEffect, useState} from 'react';
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

import {appSize} from '@starlingtech/element';

import settings from '@vn.starlingTech/config/settings';
import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList';

import {AppScreenProps} from 'src/navigation/navigation.types';
import {useOrganizationList} from 'src/service/contact/organization';
import useAppStore from 'src/store/appStore';
import {RespOrganization_Data} from 'src/types/company.types';
import {RespPipeline, Stage} from 'src/types/pipeline.types';

import {PipelineFilter} from './components/Pipeline.Filter';
import {color, font} from '../../Component/Styles';

const {StatusBarManager} = NativeModules;

export const PipelinesCompany = ({navigation}: AppScreenProps) => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<RespPipeline>();
  const [stage, setStage] = useState<Stage>();
  const [totalARR, setTotalARR] = useState<number | string>();
  const [totalMRR, setTotalMRR] = useState<number | string>();

  const syncingContact = useAppStore(s => s.syncing.contacts);

  const useGetScreenData = (_page: number, offset: number) => {
    console.log('useGetScreenData called');
    return useOrganizationList({
      status: status?.status,
      stage: stage?.stage,
      limit: settings.LIST_SIZE,
      name: keyword,
      offset,
    });
  };

  const organizationList = useOrganizationList({
    status: status?.status,
    stage: stage?.stage,
    limit: undefined,
    name: undefined,
    offset: undefined,
  })?.data;

  useEffect(() => {
    if (organizationList?.data) {
      console.log('useEffect setTotalARR called');
      setTotalARR(organizationList?.totalcounts[0]?.totalARR);
      setTotalMRR(organizationList?.totalcounts[0]?.totalMRR);
    }
  }, [organizationList?.data]);

  useEffect(() => {
    useAppStore.setState({isTabBar: true, activeRoute: 'Pipelines'});
  }, []);

  const handleSelect = (companyId: number) => {
    navigation.navigate('CompanyDetails', {companyId});
  };

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<RespOrganization_Data>) => {
    return (
      <TouchableOpacity
        style={styles.itemContianer}
        onPress={() => handleSelect(item.id)}>
        <View key={index + ''}>
          <View style={styles.flSpace}>
            <View>
              <Text style={styles.cellPhoneText}>
                ARR: <Text style={styles.valueText}>{item?.ARR}</Text>
              </Text>
              <Text style={styles.cellPhoneText}>
                MRR: <Text style={styles.valueText}>{item?.MRR}</Text>
              </Text>
              <Text style={styles.cellPhoneText}>
                Name: <Text style={styles.nameValue}>{item.title}</Text>
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
              {item.status ? (
                <Text style={styles.cellPhoneText}>
                  Stage: <Text style={styles.nameValue}>{item.status}</Text>
                </Text>
              ) : null}
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
      </TouchableOpacity>
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

      <PipelineFilter
        stage={stage}
        status={status}
        setStatus={setStatus}
        setStage={setStage}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View style={styles.totalView}>
          <Text style={styles.titleText}>Total MRR: </Text>
          <Text style={styles.valueText}>${totalMRR}</Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.titleText}>Total ARR: </Text>
          <Text style={styles.valueText}>${totalARR}</Text>
        </View>
      </View>

      <AppFlatList
        useGetScreenData={useGetScreenData}
        renderItem={renderItem}
        listContainerStyle={{paddingHorizontal: appSize(15)}}
        timing={syncingContact}
      />
    </View>
  );
};

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
    // borderWidth: 1,
  },
  labelText: {
    alignSelf: 'center',
    color: '#212121',
    fontFamily: font.semi,
    fontSize: 20,
    marginTop: StatusBarManager.HEIGHT + 25,
  },
  titleText: {
    color: '#212121',
    fontFamily: font.bold,
    fontSize: 16,
  },
  valueText: {
    color: '#212121',
    fontFamily: font.semi,
    fontSize: 8,
  },
  totalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
