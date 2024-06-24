import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {AppBlock, appSize, AppText} from '@starlingtech/element';
import moment from 'moment';
import AppFlatList from '@vn.starlingTech/elements/screens/AppFlatList';
import {colorDefault} from '@vn.starlingTech/theme/theming';

import Header from 'components/Header';
import {goBack} from 'src/navigation/navigation';
import {useTodo} from 'src/service/todo/todo';
import useAppStore from 'src/store/appStore';
import {RespTodo_Data} from 'src/types/todo.types';

import {TodoItem} from './Todo.Item';
import BottomSheetComponent from 'components/BottomSheetComponent';
import {Dropdown} from 'react-native-element-dropdown';
import DatePickerNew from 'components/DatePickerNew';
import {API} from 'src/Privet';
import {color, font} from 'components/Styles';

const {height} = Dimensions.get('window');

export function TodoScreen({navigation}: any) {
  const taskSyncing = useAppStore(s => s.syncing.tasks);
  const accessToken = useAppStore(s => s.accessToken);

  const [tabIndex, setTabIndex] = useState(0);

  const [timing, setTiming] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [assignedUser, setAssignedUser] = useState<any>(null);
  const [userList, setUserList] = useState<any[]>([]);
  const [isFilter, setIsFilter] = useState(false);

  const [priority, setPriority] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [userDate, setUserDate] = useState<any>(null);
  const [createdDate, setCreatedDate] = useState<any>(null);

  const [companyDepartment, setCompanyDepartment] = useState<any>();

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    due_date: null,
    created_date: null,
    priority: null,
    contact_id: null,
    user_id: null, // Assuming user_id is for company department
  });

  const resetAllFilters = () => {
    setName('');
    setPriority(undefined);
    setCompanyDepartment(undefined);
    setAssignedUser(null);
    setStatus('');
    setUserDate(null);
    setCreatedDate(null);
  };

  const useGetScreenData = (_page: number, offset: number) => {
    let resp;
    if (tabIndex === 3) {
      // Filter tab
      resp = useTodo(
        {
          offset,
          limit: 20,
          ...filters,
        },
        () => {
          setIsLoading(false);
        },
      );
    } else {
      resp = useTodo(
        {
          offset,
          limit: 20,
          status:
            tabIndex === 0 ? 'All' : tabIndex === 1 ? 'Active' : 'Completed',
        },
        () => {
          setIsLoading(false);
        },
      );
    }
    return resp;
  };

  const handleFilterSubmit = () => {
    // Update filters based on user selections in the bottom sheet
    setFilters({
      ...filters,
      // limit: 20,
      name: name,
      status: status?.value ?? null,
      due_date: userDate ?? null,
      created_date: createdDate ?? null,
      priority: priority?.value ?? null,
      contact_id: companyDepartment?.value ?? null,
      user_id: assignedUser?.value ?? null,
    });

    setIsFilter(pre => !pre);
    setTabIndex(3);
    setShowModal(false);
  };

  const renderItem = ({item}: ListRenderItemInfo<RespTodo_Data>) => {
    return <TodoItem item={item} />;
  };

  useEffect(() => {
    setIsLoading(true);
    setTiming(moment().unix());
  }, [tabIndex, taskSyncing, isFilter]);

  useEffect(() => {
    getAssignedUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let statusDropdownItems = [
    {label: 'Active', value: 'Active'},
    {label: 'Completed', value: 'Completed'},
  ];
  let priorityDropdownItems = [
    {label: 'Low', value: 0},
    {label: 'Medium', value: 1},
    {label: 'High', value: 2},
  ];

  const getAssignedUser = () => {
    fetch(`${API.companyusers}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        if (response?.data != null) {
          // console.log("response.data:: ::>> ", response.data);
          let temp: any[] = [];
          response.data.map((item: any) => {
            let data = {label: item.title, value: item.id};
            temp.push(data);
          });
          setUserList(temp);
        } else {
          setUserList([]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <AppBlock flex>
      <Header
        title="To Do"
        SafeAreaViewColor={'#fff4'}
        Limg={require('assets/img/back.png')}
        Lpress={() => {
          navigation.goBack();
        }}
      />
      <AppBlock mh={16} mt={16} mb={9} row>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => setTabIndex(0)}
          style={[tabIndex === 0 && styles.segmentActive, styles.segment]}>
          <AppText color={tabIndex === 0 ? 'white' : 'primary'}>All</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => setTabIndex(1)}
          style={[tabIndex === 1 && styles.segmentActive, styles.segment]}>
          <AppText color={tabIndex === 1 ? 'white' : 'primary'}>Open</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => setTabIndex(2)}
          style={[tabIndex === 2 && styles.segmentActive, styles.segment]}>
          <AppText color={tabIndex === 2 ? 'white' : 'primary'}>
            Completed
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            // setTabIndex(3)
            setShowModal(true);
          }}
          style={[tabIndex === 3 && styles.segmentActive, styles.segment]}>
          <AppText color={tabIndex === 3 ? 'white' : 'primary'}>Filter</AppText>
        </TouchableOpacity>
      </AppBlock>
      {isLoading && <ActivityIndicator />}
      <AppFlatList
        useGetScreenData={useGetScreenData}
        renderItem={renderItem}
        limit={20}
        timing={timing}
      />
      <BottomSheetComponent
        isVisible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View>
          <View
            style={{
              maxHeight: (height / 100) * 80,
            }}>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
              <Text style={styles.textTile}>Name</Text>
              <TextInput
                style={styles.fieldView}
                placeholder="Name"
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
                placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
              />
              <Text style={styles.textTile}>Assigned User</Text>
              <Dropdown
                // placeholderStyle={styles.placeholderStyle}
                style={styles.modalView}
                // selectedTextStyle={styles.selectedColor}
                data={userList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Assigned user"
                value={assignedUser}
                onChange={data => setAssignedUser(data)}
              />

              <Text style={styles.textTile}>Status</Text>
              <Dropdown
                // placeholderStyle={styles.placeholderStyle}
                style={styles.modalView}
                // selectedTextStyle={styles.selectedColor}
                // data={Filters.StatusData}
                data={statusDropdownItems}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Status"
                value={status}
                onChange={value => {
                  setStatus(value);
                }}
              />

              <Text style={styles.textTile}>Priority</Text>
              <Dropdown
                // placeholderStyle={styles.placeholderStyle}
                style={styles.modalView}
                // selectedTextStyle={styles.selectedColor}
                data={priorityDropdownItems}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Priority"
                value={priority}
                onChange={value => {
                  setPriority(value);
                }}
              />

              <Text style={styles.textTile}>Due Date</Text>
              <DatePickerNew
                //
                style={{
                  paddingHorizontal: 12,
                  marginTop: 5,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: color.borderColor,
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                placeholder="Date"
                value={userDate}
                mode={'date'}
                onSelect={(_userDate: any) =>
                  setUserDate(moment(_userDate)?.format('YYYY-MM-DD'))
                }
              />
              <Text style={styles.textTile}>Date Created</Text>
              <DatePickerNew
                style={{
                  paddingHorizontal: 12,
                  marginTop: 5,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: color.borderColor,
                  paddingVertical: 15,
                  marginBottom: 10,
                }}
                placeholder="Date"
                value={createdDate}
                mode={'date'}
                onSelect={(_userDate: any) =>
                  setCreatedDate(moment(_userDate)?.format('YYYY-MM-DD'))
                }
              />

              <TouchableOpacity
                onPress={() => handleFilterSubmit()}
                style={styles.filterBtn}>
                {isLoading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text style={styles.filterText}>Filter Todo</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => resetAllFilters()}
                style={styles.resetBtn}>
                <Text style={styles.resetText}>RESET</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </BottomSheetComponent>
    </AppBlock>
  );
}

const styles = StyleSheet.create({
  segment: {
    alignSelf: 'baseline',
    borderColor: colorDefault.primary,
    borderRadius: appSize(8),
    borderWidth: 1,
    marginRight: appSize(8),
    paddingHorizontal: appSize(16),
    paddingVertical: appSize(8),
  },
  segmentActive: {backgroundColor: colorDefault.primary},
  fieldView: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 0.5,
    color: '#000',
    height: 50,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  filterBtn: {
    alignItems: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
  },
  resetBtn: {
    alignItems: 'center',
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
    marginBottom: 35,
    marginTop: 10,
  },
  resetText: {
    color: color.primeColor,
    fontFamily: font.semi,
    fontSize: 15,
  },
  filterText: {
    color: '#fff',
    fontFamily: font.semi,
    fontSize: 15,
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 0.5,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '100%',
    zIndex: 0,
  },
  scrollStyle: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  textTile: {
    color: '#7E8EAA',
    fontFamily: font.reg,
    marginBottom: 5,
    marginTop: 10,
  },
});
