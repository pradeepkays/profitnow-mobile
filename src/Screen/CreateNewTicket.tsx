import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import {Dropdown} from 'react-native-element-dropdown';

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import CustomTags from '../Component/CustomTags';
import DatePickerNew from '../Component/DatePickerNew';
import FilterSupportData from '../Component/FilterSupportData';
import Header from '../Component/Header';
import {color, font} from '../Component/Styles';
import {API} from '../Privet';

export default function SupportTicket(props: AppScreenProps) {
  const accessToken = useAppStore(s => s.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  // const [supportData, setSupportData] = useState([])
  const [clientValue, setClientValue] = useState<any>(null);
  const [departmentValue, setDepartmentValue] = useState<any>(null);
  const [typeValue, setTypeValue] = useState<any>(null);
  const [companyValue, setCompanyValue] = useState<any>(null);
  const [assignedUserValue, setAssignedUserValue] = useState<any>(null);
  const [priorityValue, setPriorityValue] = useState<any>(null);
  const [setStatusValue, setSetStatusValue] = useState<any>(null);
  const [statusDropdownItems, setStatusDropdownItems] = useState<any[]>([]);
  const [communicationValue, setCommunicationValue] = useState<any>(null);
  const [streetAddress, setStreetAddress] = useState('');
  const [userDate, setUserDate] = useState(new Date());
  const [question, setQuestion] = useState('');
  const [tags, setTags] = useState<any>(null);

  const createTicket = () => {
    console.log('bro', moment(userDate).format('YYYY'));
    setIsLoading(true);
    console.log('setStatusValue', moment(userDate).format('MM'));
    const data = {
      subject: streetAddress,
      text: 'string',
      priority: priorityValue?.value ?? '',
      status: setStatusValue?.value || '',
      time_due: {
        year: moment(userDate).format('YYYY'),
        month: moment(userDate).format('MM'),
        day: moment(userDate).format('DD'),
      },
      department: 0,
      assigned_user: 0,
      // contact_id: 0,
      additional: [
        {
          id: 0,
          value: 'string',
        },
      ],
      // attachments: [0],
      communication_channel: communicationValue?.value ?? '',
    };
    fetch(`${API.createTicket}`, {
      method: 'POST',
      body: JSON.stringify(data),

      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        setIsLoading(false);
        console.log('logging is:::>>>>>', response);
        if (response) {
          Alert.alert('Ticket Created Successfully');
          console.log('response--=--=-=', response);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(e => {
        setIsLoading(false);
        console.log('error: ', e);
      });
  };

  const getStatusDropdown = () => {
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
        // console.log(' ----response--> ',response )

        const obj = response.map((item: any) => ({
          label: item.title,
          value: item.tag,
        }));

        setStatusDropdownItems(obj);
      })
      .catch(e => {
        console.log('error: ', e);
      });
  };

  useEffect(() => {
    getStatusDropdown();
  }, []);

  const getSelectedValue = (myValues: any) => {
    if (myValues.length) {
      if (tags.length === 0) {
        setTags(myValues);
      } else {
        setTags([...tags, myValues]);
      }
      //  this.setState({ tags: myValues });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title="Create Ticket"
        Limg={require('assets/img/back.png')}
        Lpress={() => props.navigation.goBack()}
      />

      <ScrollView style={{alignSelf: 'center', width: '90%'}}>
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Client
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.ClientFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Client"
            searchPlaceholder="Search..."
            value={clientValue}
            onChange={value => {
              setClientValue(value);
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Department
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.DepartmentFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Department"
            searchPlaceholder="Search..."
            value={departmentValue}
            onChange={titleValue => {
              setDepartmentValue(titleValue);
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Type
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.TypeFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Type"
            searchPlaceholder="Search..."
            value={typeValue}
            onChange={titleValue => {
              setTypeValue(titleValue);
            }}
          />
        </View>
        {/*  */}
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Company
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.companyList}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Company"
            searchPlaceholder="Search..."
            value={companyValue}
            onChange={value => {
              setCompanyValue(value);
            }}
          />
        </View>
        {/*  */}
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Assigned User
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.assignedUser}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Assigned User"
            searchPlaceholder="Search..."
            value={assignedUserValue}
            onChange={value => {
              setAssignedUserValue(value);
            }}
          />
        </View>
        {/*  */}
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Set Priority
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.PriorityFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="priority Value"
            searchPlaceholder="Search..."
            value={priorityValue}
            onChange={value => {
              setPriorityValue(value);
            }}
          />
        </View>
        {/*  */}
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Set Status
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            // data={FilterSupportData.setStatusFilter}
            data={statusDropdownItems}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Set Status"
            searchPlaceholder="Search..."
            value={setStatusValue}
            onChange={value => {
              setSetStatusValue(value);
            }}
          />
        </View>
        {/*  */}
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          DATE
        </Text>
        <DatePickerNew
          // icon={null}
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
          mode={'datetime'}
          onSelect={(_userDate: any) => setUserDate(_userDate)}
        />
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          TAGS
        </Text>
        <CustomTags myData={value => getSelectedValue(value)} />

        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Communication Channel
        </Text>
        <View>
          <Dropdown
            style={styles.modalView}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedColor}
            data={FilterSupportData.communicationFilter}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Communication"
            searchPlaceholder="Search..."
            value={communicationValue}
            onChange={value => {
              setCommunicationValue(value);
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 20,
            marginTop: 8,
          }}>
          Request
        </Text>

        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
          }}>
          Subject
        </Text>
        <TextInput
          style={{
            color: '#000',
            borderWidth: 1,
            borderRadius: 8,
            flex: 1,
            borderColor: color.borderColor,
            paddingHorizontal: 12,
            height: 50,
            // marginTop: 5,
          }}
          placeholder="Subject"
          value={streetAddress}
          onChangeText={text => {
            setStreetAddress(text);
          }}
          placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
        />
        <Text
          style={{
            fontFamily: font.bold,
            paddingTop: 5,
            paddingBottom: 15,
            color: '#7E8EAA',
            fontSize: 16,
            marginTop: 5,
          }}>
          Question
        </Text>
        <TextInput
          style={{
            color: '#000',
            borderWidth: 1,
            borderRadius: 8,
            flex: 1,
            borderColor: color.borderColor,
            paddingHorizontal: 12,
            height: 150,
            // marginTop: 5,
            marginBottom: 20,
          }}
          placeholder="Question"
          value={question}
          onChangeText={text => {
            setQuestion(text);
          }}
          placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
        />

        <TouchableOpacity
          onPress={() => createTicket()}
          style={styles.filterBtn}>
          {isLoading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.filterText}>Create</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 0.5,
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    zIndex: 0,
  },
  placeholderStyle: {
    color: 'lightgrey',
    fontFamily: font.reg,
    fontSize: 14,
  },
  selectedColor: {
    color: '#000',
    fontSize: 16,
  },
});
