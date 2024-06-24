import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import moment from 'moment';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
// import { FlatList } from 'react-native-gesture-handler'

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import BottomSheetComponent from '../Component/BottomSheetComponent';
import DatePickerNew from '../Component/DatePickerNew';
import Filters from '../Component/FilterData';
import Header from '../Component/Header';
import {color, font} from '../Component/Styles';
import {API} from '../Privet';

const {height} = Dimensions.get('window');

export default function SupportTicket(props: AppScreenProps) {
  const accessToken = useAppStore(s => s.accessToken);

  const [isLoading, setIsLoading] = useState(true);
  const [supportData, setSupportData] = useState<any[]>([]);
  const [tagList, setTagList] = useState<any[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);
  const [userList, setUserList] = useState<any[]>([]);
  const [assignedUser, setAssignedUser] = useState<any>(null);
  const [userDate, setUserDate] = useState<any>(null);
  const [createdDate, setCreatedDate] = useState<any>(null);
  const [lastDate, setLastDate] = useState<any>(null);
  const [allCompanyDepartment, setAllCompanyDepartment] = useState<any>();
  const [companyDepartment, setCompanyDepartment] = useState<any>();
  const [priority, setPriority] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [subject, setSubject] = useState('');
  const [company, setCompany] = useState('');
  const [statusDropdownItems, setStatusDropdownItems] = useState<any[]>([]);

  useEffect(() => {
    getTicketsList();
    getAssignedUser();
    getCompanyDepartment();
    tagListApi();
    statusItemsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tagListApi = () => {
    fetch(`${API.companytags}`, {
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
          let temp: any = [];
          response.data.map((item: any) => {
            let data = {
              label: item.title,
              value: item.id,
            };
            temp.push(data);
          });
          setTagList(temp);
        } else {
          setTagList([]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const statusItemsApi = () => {
    fetch(`${API.status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        // console.log(' ---response---> ',response )

        const obj = response.map((item: any) => ({
          label: item.title,
          value: item.tag,
        }));

        console.log(' --obj----> ', obj);
        setStatusDropdownItems(obj);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const resetAllFilters = () => {
    setSearchFilter(false);

    setSubject('');
    setPriority(undefined);
    setCompanyDepartment(undefined);
    setAssignedUser(null);
    setCompany('');
    setStatus('');
    setUserDate(null);
    setCreatedDate(null);
    setLastDate(null);
    setSelectedTagList([]);
    setIsLoading(true);
    getTicketsList();
  };

  const getTicketsList = () => {
    console.log(
      '`${API.supportingTicket}?limit=100&status=active`',
      `${API.supportingTicket}?limit=100&status=active`,
    );
    fetch(`${API.supportingTicket}?limit=100&status=active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        setSearchFilter(false);
        console.log('response::>>LL: ', response);
        if (response) {
          setIsLoading(false);
          if (response.data) {
            console.log(response.data.length);
            setSupportData(response.data);
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch(e => {
        setIsLoading(false);
        console.log('error: ', e);
      });
  };
  const getCompanyDepartment = () => {
    fetch(`${API.companyDepartments}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('response.data::>> ', response.data);
        if (response.data) {
          let temp: any[] = [];
          response.data.map((item: any) => {
            let data = {
              label: item.title,
              value: item.id,
            };
            temp.push(data);
          });

          setAllCompanyDepartment(temp);
        }
      })
      .catch(e => {
        setIsLoading(false);
        console.log('error: ', e);
      });
  };
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

  const filterTicketsData = () => {
    setIsLoading(true);
    let url = `${API.supportingTicket}`;
    let tempArr = '?';
    if (subject.length > 0) {
      tempArr = tempArr + `subject=${subject}&`;
    }
    if (priority?.value) {
      tempArr = tempArr + `priority=${priority?.value}&`;
    }
    if (companyDepartment?.value) {
      console.log('companyDepartment:: >> ', companyDepartment?.value);
      tempArr = tempArr + `user_id=${companyDepartment?.value}&`;
    }
    if (assignedUser?.value) {
      tempArr = tempArr + `contact_id=${assignedUser?.value}&`;
    }
    if (company.length > 0) {
      tempArr = tempArr + `organization=${company}&`;
    }
    if (status?.value) {
      tempArr = tempArr + `status=${status?.value}&`;
    }
    if (userDate != null) {
      let days = moment(userDate).diff(moment(), 'days');
      if (days > 0 && days <= 31) {
        tempArr = tempArr + `day=${days}&`;
      }
    }
    if (createdDate != null) {
      let days = moment(createdDate).diff(moment(), 'days');
      if (days > 0) {
        let yearOnly = moment(createdDate).format('YYYY');
        let dateOnly = moment(createdDate).format('DD');
        let monOnly = moment(createdDate).format('MM');

        tempArr =
          tempArr +
          `created_year=${yearOnly}&created_month=${monOnly}&created_day=${dateOnly}&`;
      }
    }
    if (lastDate != null) {
      let days = moment(lastDate).diff(moment(), 'days');
      if (days > 0) {
        let yearOnly = moment(lastDate).format('YYYY');
        let dateOnly = moment(lastDate).format('DD');
        let monOnly = moment(lastDate).format('MM');

        tempArr =
          tempArr +
          `updated_year=${yearOnly}&updated_month=${monOnly}&updated_day=${dateOnly}&`;
      }
    }
    if (selectedTagList.length) {
      tempArr = tempArr + `tags=${selectedTagList}&`;
    }

    // console.log('url>>>>> ', `${url}` + tempArr)
    fetch(`${url}` + tempArr, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        setShowModal(false);
        setSearchFilter(true);
        if (response) {
          setIsLoading(false);
          if (response.data) {
            setSupportData(response.data);
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title="Support Tickets"
        Limg={require('assets/img/back.png')}
        Lpress={() => props.navigation.goBack()}
        customeRightButton={
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CreateNewTicket');
            }}
            style={{
              marginTop: 8,
              backgroundColor: '#0052CB',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 5,
              marginRight: 15,
            }}>
            <Text style={{fontFamily: font.semi, color: '#fff', fontSize: 15}}>
              Add
            </Text>
          </TouchableOpacity>
        }
      />

      {isLoading ? (
        <View
          style={{
            height: '90%',
            width: '100%',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={'#0003'} />
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              padding: 10,
            }}>
            <Text style={styles.resetText}>Filter</Text>
            <View
              style={{
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('assets/img/filter.png')}
                style={{height: 15, width: 15}}
              />
              {searchFilter && (
                <TouchableOpacity onPress={() => resetAllFilters()}>
                  <Text style={[styles.resetText, {marginTop: 8}]}>RESET</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          <FlatList
            data={supportData}
            contentContainerStyle={{paddingVertical: 10}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('SupportTicketDetail', {
                      data: item,
                    });
                  }}
                  style={{
                    // height: 30,
                    width: '100%',
                    borderRadius: 20,
                    justifyContent: 'center',
                    paddingHorizontal: 2,
                    alignSelf: 'center',
                    marginTop: 5,
                    marginBottom: 10,
                    shadowRadius: 4,
                    elevation: 4,
                  }}>
                  {index === 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#F6F7F7',
                        paddingVertical: 5,
                        height: 40,
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontFamily: font.semi,
                          fontSize: 14,
                          color: color.fontcolor,
                        }}>
                        Ticket No
                      </Text>
                      <Text
                        style={{
                          flex: 2,
                          fontFamily: font.semi,
                          fontSize: 14,
                          color: color.fontcolor,
                        }}>
                        Subject
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          fontFamily: font.semi,
                          fontSize: 14,
                          color: color.fontcolor,
                        }}>
                        Status
                      </Text>
                    </View>
                  )}
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: font.semi,
                        // marginLeft: 15,
                        fontSize: 14,
                        color: color.fontcolor,
                      }}>
                      {item.index}
                    </Text>

                    <Text
                      style={{
                        flex: 2,
                        fontFamily: font.semi,
                        fontSize: 14,
                        color: color.fontcolor,
                      }}>
                      {item.subject}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        color: item.status.tag === 'active' ? 'green' : 'red',
                        fontSize: 14,
                        fontFamily: font.semi,
                        // color: color.fontcolor,
                        textAlign: 'center',
                      }}>
                      {item.status.tag}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <>
                {searchFilter ? (
                  <View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: 'grey',
                        marginTop: '70%',
                      }}>
                      No supporting tickets with this filter
                    </Text>
                    <TouchableOpacity onPress={() => getTicketsList()}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: color.bottomNavColor,
                          marginTop: '2%',
                        }}>
                        RESET
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: 'grey',
                        marginTop: '80%',
                      }}>
                      No supporting tickets
                    </Text>
                  </View>
                )}
              </>
            }
          />
        </>
      )}

      <BottomSheetComponent
        isVisible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View>
          <View
            style={{
              height: (height / 100) * 80,
            }}>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
              <Text style={styles.textTile}>Subject</Text>
              <TextInput
                style={styles.fieldView}
                placeholder="Subject"
                value={subject}
                onChangeText={text => {
                  setSubject(text);
                }}
                placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
              />

              <Text style={styles.textTile}>Priority</Text>
              <Dropdown
                // placeholderStyle={styles.placeholderStyle}
                style={styles.modalView}
                // selectedTextStyle={styles.selectedColor}
                data={Filters.PriorityData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Priority"
                value={priority}
                onChange={value => {
                  setPriority(value);
                }}
              />
              <Text style={styles.textTile}>Department</Text>
              <Dropdown
                // placeholderStyle={styles.placeholderStyle}
                style={styles.modalView}
                // selectedTextStyle={styles.selectedColor}
                data={allCompanyDepartment}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Department"
                value={companyDepartment}
                onChange={value => {
                  setCompanyDepartment(value);
                }}
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
              <Text style={styles.textTile}>Company</Text>
              <TextInput
                style={styles.fieldView}
                placeholder="Company"
                value={company}
                onChangeText={text => {
                  setCompany(text);
                }}
                placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
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
                onSelect={(_userDate: any) => setUserDate(_userDate)}
              />
              <Text style={styles.textTile}>Created Date</Text>
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
                onSelect={(_userDate: any) => setCreatedDate(_userDate)}
              />
              <Text style={styles.textTile}>Last Updated</Text>
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
                value={lastDate}
                mode={'date'}
                onSelect={(_userDate: any) => setLastDate(_userDate)}
              />
              <Text style={styles.textTile}>Tags</Text>
              <MultiSelect
                style={styles.modalView}
                // placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                search
                data={tagList}
                labelField="label"
                valueField="value"
                placeholder="Select tags"
                searchPlaceholder="Search..."
                value={selectedTagList}
                onChange={item => {
                  setSelectedTagList(item);
                }}
                renderLeftIcon={() => (
                  <View
                    style={{
                      backgroundColor: color.bottomNavColor,
                      height: 10,
                      width: 10,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                  />
                )}
                // selectedStyle={styles.selectedStyle}
              />

              <TouchableOpacity
                onPress={() => filterTicketsData()}
                style={styles.filterBtn}>
                {isLoading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text style={styles.filterText}>Filter Tickets</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 35,
    marginTop: 10,
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
  resetText: {
    color: '#0052CB',
    fontFamily: font.semi,
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
