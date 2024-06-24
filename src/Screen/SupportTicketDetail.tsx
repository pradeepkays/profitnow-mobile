import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';
import {Timer} from 'react-native-element-timer';
// import {FlatList} from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';
import {RichEditor} from 'react-native-pell-rich-editor';

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import BottomSheetComponent from '../Component/BottomSheetComponent';
import Header from '../Component/Header';
import PickerNew from '../Component/PickerNew';
import {color, font} from '../Component/Styles';
import {API} from '../Privet';

export default function SupportTicketDetail(props: AppScreenProps) {
  const {height} = Dimensions.get('window');
  const accessToken = useAppStore(s => s.accessToken);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [PublicReplyResponse, setPublicReplyResponse] = useState<any>();
  const [internalReplyResponse, setInternalReplyResponse] = useState<any>();
  const [auditLogResponse, setAuditLogResponse] = useState<any>();
  const [timeLogResponse, setTimeLogResponse] = useState<any>();

  const [publicMessage, setPublicMessage] = useState('');
  const [internalMessage, setInternalMessage] = useState('');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [isTicketClosed, setTicketClosed] = useState(false);
  //modal values
  const [departmentValue, setDepartmentValue] = useState<any>();
  const [assignUser, setAssignUser] = useState<any>();
  const [allCompanyDepartment, setAllCompanyDepartment] = useState<any>();
  const [companyDepartment, setCompanyDepartment] = useState<any>();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  //timer
  const richText = useRef(null);
  // const [descHTML, setDescHTML] = useState('')
  // const [showDescError, setShowDescError] = useState(false)

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      // setShowDescError(false)
      // setDescHTML(descriptionText)
      // setPublicMessage(descriptionText)
    } else {
      // setShowDescError(true)
      // setDescHTML('')
    }
  };
  const [timerValue, setTimerValue] = useState(0);
  const timerRef = useRef(null);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportNotes, setSupportNotes] = useState('');
  // const [assignedUser, setAssignedUser] = useState<any>()
  const [categorytypes, setCategorytypes] = useState<any>();
  const [selectedCategoryType] = useState<any>();
  const [selectedTemplate, setselectedTemplate] = useState<any>();
  // const [messageTemplates, setMessageTemplates] = useState([])
  const [filteredMessageTemplates, setfilteredMessageTemplates] = useState([]);

  useEffect(() => {
    // console.log("Global.main.state", Global.main.state.id);
    // console.log(
    //   "props.route?.params?.ticketId",
    //   props.route?.params?.data?
    // );
    Keyboard.dismiss();
    getPublicReply();
    getInternalReply();
    getAuditLog();
    getTimeLog();

    getAssignedusers();
    getCompanyDepartment();
    //  getMessageTemplates();
    getTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMessageTemplates = id => {
    fetch(`${API.messageTemplate + '?type=' + id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        setIsLoading(false);
        setfilteredMessageTemplates(response?.data);
        // console.log("lest", response);
        // if (response) {
        //   setMessageTemplates(response?.data);
        // }
      })
      .catch(e => {
        console.log('error: ', e);
      });
  };
  const getTypes = () => {
    fetch(`${API.supportTypes}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        console.log('chse', response);
        setCategorytypes(response);
        //  if (response) {
        //    setMessageTemplates(response?.data[0]?.body);
        //  }
      })
      .catch(e => {
        console.log('error: ', e);
      });
  };
  const getPublicReply = () => {
    Keyboard.dismiss();
    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/messages`
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        Keyboard.dismiss();
        if (response) {
          setIsLoading(false);
          if (response?.data) {
            setPublicReplyResponse(response?.data);
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
  const getInternalReply = () => {
    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/note`
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        if (response) {
          setIsLoading(false);
          if (response?.data) {
            setInternalReplyResponse(response?.data);
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
  const getAuditLog = () => {
    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/activity`
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        if (response) {
          setIsLoading(false);
          if (response?.data) {
            setAuditLogResponse(response?.data);
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
  const getTimeLog = () => {
    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/timelog`
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        if (response) {
          setIsLoading(false);
          if (response?.data) {
            setTimeLogResponse(response?.data);
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
  const sendReply = () => {
    setIsLoading(true);
    let data = {
      text: selectedIndex === 0 ? publicMessage : internalMessage,
      close_ticket: isTicketClosed === true ? 1 : 0,
    };
    console.log('all set', data);
    fetch(
      selectedIndex === 0
        ? `${
            API.supportTicket +
            '/' +
            `${props.route?.params?.data?.id}/messages`
          }`
        : `${
            API.supportTicket +
            '/' +
            `${props.route?.params?.data?.id}/note`
          }`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        setIsLoading(false);
        if (response) {
          setPublicMessage('');
          setSupportNotes('');
          setSupportMessage('');
          setInternalMessage('');
          // richText.current?.setContentHTML('')
          setPublicMessage('');
          if (selectedIndex === 0) {
            getPublicReply();
          } else {
            getInternalReply();
          }
          Alert.alert('Success', 'Message added Successfully', [
            {
              text: 'OK',
              onPress: () => {
                setPublicMessage('');
              },
            },
          ]);
        }
      })
      .catch(e => {
        setIsLoading(false);

        console.log('eeror: ', e);
      });
  };
  const submitTimeLog = () => {
    setIsLoading(true);
    let data = {
      time_start: moment(),
      time_end: moment().add(moment.duration(timerValue, 'second')),
      text: supportMessage,
      note: supportNotes,
    };

    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/timelog`
      }`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        getTimeLog();
        setIsLoading(false);
        if (response) {
          setSupportMessage('');
          setSupportNotes('');
          setShowTimeModal(false);

          Alert.alert('Success', 'TimeLog added Successfully', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        } else {
        }
      })
      .catch(e => {
        setIsLoading(false);
        setShowTimeModal(false);

        console.log('eeror: ', e);
      });
  };
  const submitAssignedUser = () => {
    setIsLoading(true);
    let data = {
      user_id: departmentValue?.value,
    };

    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/user`
      }`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        getTimeLog();
        setIsLoading(false);
        if (response) {
          setShowUserModal(false);

          Alert.alert('Success', 'Department assigned Successfully', [
            {
              text: 'OK',
              onPress: () => {
                setShowDepartmentModal(false);
              },
            },
          ]);
        } else {
        }
      })
      .catch(e => {
        setIsLoading(false);
        setShowTimeModal(false);

        console.log('eeror:::: ', e);
      });
  };
  const submitDepartment = () => {
    setIsLoading(true);
    let data = {
      department_id: companyDepartment?.value,
    };

    fetch(
      `${
        API.supportTicket +
        '/' +
        `${props.route?.params?.data?.id}/department`
      }`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/',
          Accept: '*/*',
          access_token: accessToken,
        },
      },
    )
      .then(response => response.json())
      .then(async response => {
        getTimeLog();
        setIsLoading(false);
        if (response) {
          setShowUserModal(false);

          Alert.alert('Success', 'Department assigned Successfully', [
            {
              text: 'OK',
              onPress: () => {
                setShowDepartmentModal(false);
              },
            },
          ]);
        } else {
        }
      })
      .catch(e => {
        setIsLoading(false);
        setShowTimeModal(false);

        console.log('eeror:::: ', e);
      });
  };
  const getAssignedusers = () => {
    fetch(`${API.companyusers}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        if (response.data) {
          let temp: any[] = [];
          response.data.map((item: any) => {
            let data = {
              label: item.title,
              value: item.id,
            };
            temp.push(data);
          });

          setAssignUser(temp);
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

  return (
    <KeyboardAwareScrollView
      ref={scrollViewRef}
      keyboardShouldPersistTaps="always"
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}
      enableResetScrollToCoords={false}>
      <Header
        title="Support Detail"
        Limg={require('assets/img/back.png')}
        Lpress={() => props.navigation.goBack()}
      />

      <View style={{padding: 10}}>
        <Text
          style={{
            padding: 5,
            fontFamily: font.semi,
            // marginLeft: 15,
            fontSize: 14,
            color: color.fontcolor,
          }}>
          Ticket id:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {props.route?.params?.data?.index}
          </Text>
        </Text>
        <Text
          style={{
            padding: 5,
            fontFamily: font.semi,
            // marginLeft: 15,
            fontSize: 14,
            color: color.fontcolor,
          }}>
          Status:{' '}
          <Text style={{fontWeight: 'bold', color: '#0052CB'}}>
            {props.route?.params?.data?.status?.title}
          </Text>
        </Text>
        <Text
          style={{
            padding: 5,
            fontFamily: font.semi,
            // marginLeft: 15,
            fontSize: 14,
            color: color.fontcolor,
          }}>
          Subject:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {props.route?.params?.data?.subject}
          </Text>
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              padding: 5,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
              color: color.fontcolor,
            }}
            onPress={() => setShowUserModal(true)}>
            Assigned User:{' '}
            <Text style={{fontWeight: 'bold', color: '#0052CB'}}>
              {departmentValue?.label ??
                props.route?.params?.data?.assigned_user?.name}
            </Text>
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            padding: 5,
            fontFamily: font.semi,
            // marginLeft: 15,
            fontSize: 14,
            color: color.fontcolor,
          }}>
          Time due:{' '}
          <Text style={{fontWeight: 'bold'}}>
            {props.route?.params?.data?.time_created}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => setShowTimeModal(true)}>
          <Text
            style={{
              padding: 5,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
              color: color.fontcolor,
            }}>
            Support Timer:{' '}
            <Text style={{fontWeight: 'bold'}}>
              {timerValue
                ? timerValue
                : props.navigation.state?.params?.data?.time_spent_sec
                ? props.navigation.state?.params?.data?.time_spent_sec
                : 'Edit'}
            </Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDepartmentModal(true)}>
          <Text
            style={{
              padding: 5,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
              color: color.fontcolor,
            }}>
            Department:{' '}
            <Text style={{fontWeight: 'bold'}}>
              {companyDepartment?.label
                ? companyDepartment?.label
                : props.navigation.state?.params?.data?.department?.title
                ? props.navigation.state?.params?.data?.department?.title
                : 'Edit'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsView}>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(0);
            // getPublicReply();
          }}
          style={[
            styles.viewTab,
            {
              borderBottomWidth: 2,
              borderBottomColor:
                selectedIndex === 0 ? color.bottomNavColor : undefined,
            },
          ]}>
          <Text
            style={{
              color: selectedIndex === 0 ? '#5C67ED' : color.fontblack,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
              // color: color.fontcolor,
            }}>
            Public Reply
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(1);
            // getInternalReply();
          }}
          style={[
            styles.viewTab,
            {
              borderBottomWidth: 2,
              borderBottomColor:
                selectedIndex === 1 ? color.bottomNavColor : undefined,
            },
          ]}>
          <Text
            style={{
              color: selectedIndex === 1 ? '#5C67ED' : color.fontblack,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
            }}>
            Internal Reply
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(2);
            // getAuditLog();
          }}
          style={[
            styles.viewTab,
            {
              borderBottomWidth: 2,
              borderBottomColor:
                selectedIndex === 2 ? color.bottomNavColor : undefined,
            },
          ]}>
          <Text
            style={{
              color: selectedIndex === 2 ? '#5C67ED' : color.fontblack,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
            }}>
            Audit Log
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(3);
            // getTimeLog();
          }}
          style={[
            styles.viewTab,
            {
              borderBottomWidth: 2,
              borderBottomColor:
                selectedIndex === 3 ? color.bottomNavColor : undefined,
            },
          ]}>
          <Text
            style={{
              color: selectedIndex === 3 ? '#5C67ED' : color.fontblack,
              fontFamily: font.semi,
              // marginLeft: 15,
              fontSize: 14,
            }}>
            Time Log
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => scrollViewRef.current?.scrollToEnd(true)}
        style={{margin: 10, alignSelf: 'center'}}>
        <View
          style={{
            backgroundColor: color.primeColor,
            padding: 10,
            width: 100,
            borderRadius: 15,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Reply</Text>
        </View>
      </TouchableOpacity>
      {selectedIndex === 0 && (
        <View>
          <FlatList
            data={PublicReplyResponse}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginTop: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View style={{width: '90%'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontFamily: font.semi,
                        // marginLeft: 15,
                        fontSize: 14,
                        color: color.fontcolor,
                      }}>
                      {item.sender_name}
                    </Text>
                    <HTMLView
                      value={item.text}
                      stylesheet={[
                        styles,
                        {
                          fontFamily: font.semi,
                          // marginLeft: 15,
                          fontSize: 14,
                          color: color.fontcolor,
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.dateText,
                        {
                          fontFamily: font.semi,
                          // marginLeft: 15,
                          fontSize: 14,
                          color: color.fontcolor,
                        },
                      ]}>
                      {moment(item?.added_time).format('YYYY/DD/MM  HH:MM:SS')}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View style={{margin: 20}}>
            <Dropdown
              style={styles.modalView}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedColor}
              data={categorytypes ? categorytypes : []}
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder="Select Category"
              searchPlaceholder="Search..."
              value={selectedCategoryType}
              onChange={value => {
                setIsLoading(true);
                getMessageTemplates(value?.id);
              }}
            />

            {/* <PickerNew
              placeholder="Select Category"
              nameKey="title"
              data={categorytypes ? categorytypes : []}
              value={selectedCategoryType}
              onSelect={v => {
                console.log('id', v);
                setIsLoading(true);
                getMessageTemplates(v.id);
                // setselectedCategoryType(v);

                // let data = messageTemplates.filter(function (item) {
                //   console.log("ap " + item.id, "bp" + v.id);
                //   return item.id===v.id;
                // });
                // console.log("messageTemplates", messageTemplates);
                // if (data.length===0) {
                //   setfilteredMessageTemplates([]);
                // } else {
                //   setfilteredMessageTemplates([...data]);
                // }
              }}
              placeHolderTextStyle={styles.placeHolderTextStyle}
              dropDownStyle={{height: 40}}
            /> */}
            <View style={{marginTop: 10}} />
            {/* <PickerNew
              placeholder="Select Template"
              nameKey="title"
              data={filteredMessageTemplates ? filteredMessageTemplates : []}
              value={selectedTemplate}
              onSelect={v => {
                setselectedTemplate(v);

                setPublicMessage(v.body);
                richText.current?.setContentHTML(v.body);
              }}
              placeHolderTextStyle={styles.placeHolderTextStyle}
              dropDownStyle={{height: 40}}
            /> */}
            <Dropdown
              style={styles.modalView}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedColor}
              data={filteredMessageTemplates ?? []}
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder="Select Template"
              searchPlaceholder="Search..."
              value={selectedTemplate}
              onChange={v => {
                setselectedTemplate(v);
                setPublicMessage(v.body);
                richText.current?.setContentHTML(v.body);
              }}
            />
          </View>
          <KeyboardAwareScrollView keyboardVerticalOffset={50}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginHorizontal: 20}}
              onPress={() => Keyboard.dismiss()}>
              <Text
                style={{
                  backgroundColor: color.primeColor,
                  color: 'white',
                  padding: 5,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
          <KeyboardAwareScrollView keyboardVerticalOffset={50}>
            <View style={styles.richTextContainer}>
              <TextInput
                ref={richText}
                onChangeText={setPublicMessage}
                placeholder="Write your message here"
                // androidHardwareAccelerationDisabled={true}
                style={{
                  flex: 1,
                  width: '100%',
                  height: 250,
                  textAlignVertical: 'top',
                }}
                multiline
                value={publicMessage}
                autoCorrect={true}
              />
              {/* <RichEditor
                ref={richText}
                onChange={richTextHandle}
                autoCorrect
                placeholder="Write your message here"
                androidHardwareAccelerationDisabled={true}
                style={styles.richTextEditorStyle}
                initialHeight={250}
                autoCapitalize={'on'}
              /> */}
            </View>
          </KeyboardAwareScrollView>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 10,
              marginLeft: 20,
            }}>
            <Text style={{color: 'grey', paddingRight: 10}}>Close Ticket</Text>
            <CheckBox
              style={{
                width: 20,
                height: 20,
              }}
              disabled={false}
              boxType="square"
              value={isTicketClosed}
              onValueChange={newValue => setTicketClosed(newValue)}
            />
          </View>
          <TouchableOpacity
            onPress={() => sendReply()}
            style={styles.filterBtn}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={styles.filterText}>Reply</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {selectedIndex === 1 && (
        <View style={{marginTop: 20}}>
          <FlatList
            data={internalReplyResponse}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: '100%',
                  }}>
                  {/* <Image
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${item.user.initials}`,
                    }}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                  /> */}
                  <View style={{width: '75%', marginLeft: 5}}>
                    <Text style={{fontWeight: 'bold'}}>{item.user.name}</Text>
                    <HTMLView value={item.text} stylesheet={styles} />

                    <Text style={styles.dateText}>
                      {moment(item?.added_time).format('YYYY/DD/MM  HH:MM:SS')}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <TextInput
            placeholderTextColor="rgba(58, 53, 65, 0.38)"
            style={styles.inputField}
            multiline={true}
            placeholder="Your message here"
            autoCapitalize="none"
            value={internalMessage}
            onChangeText={value => setInternalMessage(value)}
          />
          <TouchableOpacity
            onPress={() => sendReply()}
            style={styles.filterBtn}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={styles.filterText}>Send a Message</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {selectedIndex === 2 && (
        <FlatList
          data={auditLogResponse}
          ItemSeparatorComponent={ItemSeparatorComponent}
          contentContainerStyle={{marginTop: 10}}
          renderItem={({item}) => {
            return (
              <View style={styles.innerContainer}>
                <View style={{width: '95%'}}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: '#12B981',
                        padding: 5,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={require('assets/img/conversation.png')}
                        style={{height: 14, width: 14, tintColor: 'white'}}
                      />
                    </View>
                    <Text style={{fontWeight: 'bold', paddingLeft: 10}}>
                      {item?.text}
                    </Text>
                  </View>
                  <Text style={styles.dateText}>
                    {moment(item?.time).format('YYYY/DD/MM  HH:MM:SS')}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}

      {selectedIndex === 3 && (
        <View style={{marginTop: 20}}>
          <FlatList
            data={timeLogResponse}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={({item}) => {
              return (
                <View style={styles.innerContainer}>
                  <View style={{width: '95%'}}>
                    <Text style={{fontWeight: 'bold'}}>{item?.user?.name}</Text>
                    {item?.text?.length > 0 && <Text>{item?.text}</Text>}

                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <Text style={{color: color.fontcolor}}>
                        {moment(item?.time).format('YYYY/DD/MM  HH:MM:SS')}
                      </Text>
                      <Text style={{color: color.fontcolor}}>
                        {moment(item?.time).format('YYYY/DD/MM  HH:MM:SS')}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      <BottomSheetComponent
        isVisible={showUserModal}
        onRequestClose={() => {
          setShowUserModal(false);
          setSupportMessage('');
          setSupportNotes('');
          setTimerValue(0);
        }}>
        <View
          style={{
            height: (height / 100) * 45,
            backgroundColor: color.whiteColor,
            width: '100%',
            alignSelf: 'center',
            borderRadius: 20,
            padding: '5%',
          }}>
          <Text style={styles.titleMenu}>Assign User</Text>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={assignUser}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Assign user"
            value={departmentValue}
            onChange={value => {
              setDepartmentValue(value);
            }}
          />

          <TouchableOpacity
            onPress={() => submitAssignedUser()}
            style={[styles.filterBtn, {marginTop: '40%', width: '100%'}]}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={styles.filterText}>Submit User</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetComponent>
      <BottomSheetComponent
        isVisible={showDepartmentModal}
        onRequestClose={() => {
          setShowDepartmentModal(false);
          setSupportMessage('');
          setSupportNotes('');
          setTimerValue(0);
        }}>
        <View
          style={{
            height: (height / 100) * 45,
            backgroundColor: color.whiteColor,
            width: '100%',
            alignSelf: 'center',
            borderRadius: 20,
            padding: '5%',
          }}>
          <Text style={styles.titleMenu}>Assign Department</Text>

          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={allCompanyDepartment}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Department"
            searchPlaceholder="Department..."
            value={companyDepartment}
            onChange={value => {
              setCompanyDepartment(value);
            }}
          />
          <TouchableOpacity
            onPress={() => submitDepartment()}
            style={[styles.filterBtn, {marginTop: '40%', width: '100%'}]}>
            {isLoading ? (
              <ActivityIndicator color={'#fff'} />
            ) : (
              <Text style={styles.filterText}>Submit Department</Text>
            )}
          </TouchableOpacity>
        </View>
      </BottomSheetComponent>

      <BottomSheetComponent
        isVisible={showTimeModal}
        onRequestClose={() => {
          setShowTimeModal(false);
          setSupportMessage('');
          setSupportNotes('');
          setTimerValue(0);
        }}>
        <View
          style={{
            height: timerValue > 0 ? (height / 100) * 45 : (height / 100) * 30,
            backgroundColor: color.whiteColor,
            width: '100%',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          {timerValue > 0 ? (
            <>
              <Text style={styles.textTimer}>Timer: {timerValue}</Text>

              <TextInput
                placeholderTextColor="rgba(58, 53, 65, 0.38)"
                style={styles.inputField}
                placeholder="Your message here"
                autoCapitalize="none"
                value={supportMessage}
                multiline={true}
                onChangeText={value => setSupportMessage(value)}
              />

              <TextInput
                placeholderTextColor="rgba(58, 53, 65, 0.38)"
                style={styles.inputField}
                placeholder="Your notes here"
                autoCapitalize="none"
                value={supportNotes}
                multiline={true}
                onChangeText={value => setSupportNotes(value)}
              />

              <TouchableOpacity
                onPress={() => submitTimeLog()}
                style={styles.filterBtn}>
                {isLoading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : (
                  <Text style={styles.filterText}>Submit</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Timer
                ref={timerRef}
                style={styles.timer}
                textStyle={styles.timerText}
                onTimes={() => {}}
                onPause={() => {}}
                onEnd={e => {
                  setTimerValue(e);
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  style={styles.button}
                  title={'Start'}
                  onPress={() => {
                    timerRef.current.start();
                  }}
                />
                <Button
                  style={styles.button}
                  title={'Pause'}
                  onPress={() => {
                    timerRef.current.pause();
                  }}
                />
                <Button
                  style={styles.button}
                  title={'Resume'}
                  onPress={() => {
                    timerRef.current.resume();
                  }}
                />
                <Button
                  style={styles.button}
                  title={'Stop'}
                  onPress={() => {
                    timerRef.current.stop();
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </BottomSheetComponent>
    </KeyboardAwareScrollView>
  );
}

const ItemSeparatorComponent = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  dateText: {
    color: color.fontcolor,

    marginTop: 10,
    textAlign: 'right',
    width: '100%',
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    height: 1,
    marginVertical: 5,
    width: '90%',
  },
  filterBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: color.primeColor,
    borderRadius: 5,
    height: 38,
    justifyContent: 'center',
    marginBottom: 35,
    marginTop: 10,
    width: '90%',
  },
  filterText: {color: color.whiteColor},
  innerContainer: {
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    width: '90%',
  },
  inputField: {
    alignSelf: 'center',
    backgroundColor: '#F4F5F5',
    borderRadius: 10,
    color: '#000',
    fontFamily: font.reg,
    fontSize: 15,
    height: 90,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '90%',
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
  placeHolderTextStyle: {
    color: 'rgba(95, 100, 126, 0.87)',
    fontFamily: font.reg,
    fontSize: 14,
  },
  placeholderStyle: {
    color: 'lightgrey',
    fontFamily: font.reg,
    fontSize: 14,
  },
  richTextContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    margin: 20,
    marginTop: 0,
  },
  selectedColor: {
    color: '#000',
    fontSize: 16,
  },
  tabsView: {
    backgroundColor: '#F4F4F5',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  textTimer: {
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  timer: {
    fontSize: 25,
    marginBottom: 10,
    marginTop: 60,
  },
  timerText: {
    fontSize: 30,
  },
  titleMenu: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  viewTab: {
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
});
