import React, {Component} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import Header from '../Component/Header';
// import PickerNew from "../Component/PickerNew";
import {color, font, shadow} from '../Component/Styles';
import {API} from '../Privet';
import {findObject} from 'src/utils/array';
import {Dropdown} from 'react-native-element-dropdown';

type State = {
  SICcode: string;
  employeeSize: string;
  phone: string;
  email: string;
  value: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  facebook: string;
  twitter: string;
  linkdin: string;
  instagram: string;
  note: string;
  website: string;
  sdrowner: any;
  orgdiscount: string;
  orgterm: string;
  orgplan: string;
  orglicensetotal: string;
  nextsteps: string;
  id: string;
  companyName: string;
  compaignList: any[];
  compaignName: any[];
  locationList: any[];
  locationName: any[];
  contactList: any[];
  contactName: any[];
  tagList: any[];
  tagName: any[];
  businessCategory: {id: number; name: string}[];
  categoryName: {name: string} | undefined;
  companyList: any[];
  assignUserList: any[];
  assignUserName: any[];
  isLoading: boolean;
};

export default class AddCompany extends Component<AppScreenProps, State> {
  accessToken = useAppStore.getState().accessToken;
  constructor(props: AppScreenProps) {
    super(props);
    this.state = {
      companyName: '',
      SICcode: '',
      employeeSize: '',
      phone: '',
      email: '',
      value: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      facebook: '',
      twitter: '',
      linkdin: '',
      instagram: '',
      note: '',
      website: '',
      sdrowner: null,
      orgterm: '',
      orgplan: '',
      orgdiscount: '',
      orglicensetotal: '',
      nextsteps: '',
      id: '',

      compaignList: [],
      compaignName: [],

      locationList: [],
      locationName: [],

      contactList: [],
      contactName: [],

      tagList: [],
      tagName: [],

      businessCategory: [
        {id: 1, name: 'leads'},
        {id: 2, name: 'customers'},
        {id: 3, name: 'opportunities'},
      ],
      categoryName: undefined,

      companyList: [],
      assignUserList: [],
      assignUserName: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const details = this.props?.route?.params?.detail;
    if (details) {
      this.handleUpdateData(details);
    }
    this.locationApi();
    this.companyListApi();
    this.assignedUserListApi();
  }

  handleUpdateData(data: any) {
    const filterStatus = this.state.businessCategory.filter(k => {
      return k.name === data.business_category;
    });
    this.setState({
      companyName: (data && data.title) || '',
      id: data && data.id,
      SICcode: (data && data.sic_code) || '',
      address: (data && data.address && data.address.street_address) || '',
      assignUserName: data && data.assigned_user ? data.assigned_user : [],
      categoryName:
        filterStatus && filterStatus.length ? filterStatus[0] : undefined,
      city: (data && data.address && data.address.city) || '',
      country: (data && data.address && data.address.country) || '',
      email: (data && data.email) || '',
      employeeSize: (data && data.employee_size) || '',
      facebook: (data && data.facebook_url) || '',
      instagram: (data && data.instagram_url) || '',
      linkdin: (data && data.linkedin_url) || '',
      locationName: data && data.location ? data.location : [],
      phone: (data && data.phone) || '',
      state: (data && data.address && data.address.state) || '',
      twitter: (data && data.twitter_url) || '',
      value: data.value !== '' ? data.value.toString() : '',
      website: (data && data.website) || '',
      sdrowner: (data && this.getSDROwner(data?.sdrowner)) || null,
      orgterm: (data && data.orgterm) || '',
      orgplan: (data && data.orgplan) || '',
      orgdiscount: (data && data.orgdiscount) || '',
      orglicensetotal: (data && data.orglicensetotal) || '',
      nextsteps: (data && data.nextsteps) || '',
      zip: (data && data.address && data.address.zip) || '',
    });
  }

  getSDROwner = (__sdrowner: number) => {
    const ____sdrowner = findObject(__sdrowner, this.state.assignUserList, {
      searchKey: 'id',
    });

    if (____sdrowner) {
      this.setState({sdrowner: ____sdrowner});
    }
  };

  // locationApi
  locationApi() {
    fetch(`${API.companylocations}`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        if (response?.data != null) {
          this.setState({locationList: response.data});
        } else {
          this.setState({locationList: []});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // CompanyList
  companyListApi() {
    fetch(`${API.organizations}?limit=15`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        if (response?.data != null) {
          this.setState({companyList: response.data});
        } else {
          this.setState({companyList: []});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // assignedUserListApi
  assignedUserListApi() {
    fetch(`${API.companyusers}?limit=100`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        if (response?.data != null) {
          this.setState({assignUserList: response.data});
        } else {
          this.setState({assignUserList: []});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  createApi() {
    const {
      phone,
      email,
      value,
      address,
      twitter,
      companyName,
      facebook,
      linkdin,
      categoryName,
      instagram,
      city,
      state,
      zip,
      country,
      website,
      sdrowner,
      orgterm,
      orgplan,
      orgdiscount,
      orglicensetotal,
      nextsteps,
      id,
    } = this.state;

    var data = {
      title: companyName,
      phone: phone,
      email: email,
      value: value,
      address: {
        street_address: address,
        city: city,
        state: state,
        zip: zip,
        country: country,
      },
      status:
        categoryName && categoryName?.name ? categoryName?.name : 'customers',
      facebook_url: facebook,
      twitter_url: twitter,
      linkedin_url: linkdin,
      instagram_url: instagram,
      website: website,
      sdrowner: sdrowner || null,
      orgterm: orgterm,
      orgplan: orgplan,
      orgdiscount: orgdiscount,
      orglicensetotal: orglicensetotal,
      nextsteps: nextsteps,
    };
    this.setState({isLoading: true});

    fetch(id !== '' ? `${API.organizations}/${id}` : API.newOrganisation, {
      method: id === '' ? 'POST' : 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Accept: '*/*',
        access_token: this.accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        if (response) {
          Alert.alert('Success', 'Organisation Added Successfully', [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.goBack();
              },
            },
          ]);
        } else {
          // this.refs.snackbar.show(response.message)
        }
      })
      .catch(e => {
        console.log('eeror: ', e);
      });
  }

  disabledFunc() {
    const {companyName, phone, categoryName, email, value, employeeSize} =
      this.state;
    if (
      companyName === '' &&
      phone === '' &&
      categoryName &&
      !categoryName &&
      email === '' &&
      value === '' &&
      employeeSize === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      sdrowner,
      orgterm,
      orgplan,
      orgdiscount,
      orglicensetotal,
      nextsteps,
      website,
      employeeSize,
      businessCategory,
      categoryName,
      phone,
      companyName,
      address,
      SICcode,
      email,
      value,
      city,
      state,
      zip,
      country,
      facebook,
      twitter,
      linkdin,
      instagram,
      id,
      assignUserList,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <Header
          title={id !== '' ? 'Edit Company' : 'Add Company'}
          SafeAreaViewColor={'#f3f6fa'}
          Limg={require('assets/img/back.png')}
          Lpress={() => this.props.navigation.goBack()}
          customeRightButton={
            <TouchableOpacity
              disabled={this.disabledFunc()}
              onPress={() => {
                this.createApi();
              }}
              style={{
                marginTop: 8,
                backgroundColor: color.primeColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 5,
                marginRight: 15,
              }}>
              <Text
                style={{fontFamily: font.semi, color: '#fff', fontSize: 15}}>
                SAVE
              </Text>
            </TouchableOpacity>
          }
        />
        <KeyboardAwareScrollView
          style={{flex: 1}}
          // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          // extraScrollHeight={40}
          // keyboardVerticalOffset={80 + 47}
          // behavior="padding"
          // style={{ flex: 1 }}
          // enabled
        >
          <ScrollView
            bounces={false}
            contentContainerStyle={{flexGrow: 1, paddingVertical: 20}}>
            <View
              style={{
                ...shadow,
                marginHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingHorizontal: 25,
                paddingVertical: 20,
              }}>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Company Name
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
                    marginTop: 5,
                  }}
                  placeholder="Company Name"
                  value={companyName}
                  onChangeText={text => {
                    this.setState({companyName: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Phone
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
                    marginTop: 5,
                  }}
                  placeholder="Phone"
                  value={phone}
                  onChangeText={text => {
                    this.setState({phone: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Email
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
                    marginTop: 5,
                  }}
                  placeholder="Email"
                  value={email}
                  onChangeText={text => {
                    this.setState({email: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Value
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
                    marginTop: 5,
                  }}
                  placeholder="Value"
                  value={value}
                  onChangeText={text => {
                    this.setState({value: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Business Category
                </Text>
                <View style={{flex: 1}}>
                  <Dropdown
                    style={styles.modalView}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedColor}
                    data={businessCategory ?? []}
                    maxHeight={300}
                    labelField="name"
                    valueField="id"
                    placeholder="Select List"
                    searchPlaceholder="Search..."
                    value={categoryName}
                    onChange={value => {
                      // console.log('businessCategory onChange value==>', value);
                      this.setState({categoryName: value});
                    }}
                  />
                  {/*                   
                  <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    placeholder="Select List"
                    data={businessCategory}
                    value={categoryName?.name}
                    onSelect={(_categoryName) =>
                      this.setState({ categoryName: _categoryName })
                    }
                  /> */}
                </View>
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  SIC/NAICS Code
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
                    marginTop: 5,
                  }}
                  placeholder="Code"
                  value={SICcode}
                  onChangeText={text => {
                    this.setState({SICcode: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Employee Size
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
                    marginTop: 5,
                  }}
                  placeholder="Employee Size"
                  value={employeeSize}
                  onChangeText={text => {
                    this.setState({employeeSize: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  SDR Owner
                </Text>
                <View style={{flex: 1}}>
                  <Dropdown
                    style={styles.modalView}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedColor}
                    data={assignUserList ?? []}
                    maxHeight={300}
                    labelField="title"
                    valueField="id"
                    placeholder="Assigned User"
                    searchPlaceholder="Search..."
                    value={sdrowner}
                    onChange={item => {
                      this.setState({sdrowner: item?.id});
                    }}
                  />

                  {/* <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    labelField="title"
                    valueField="id"
                    placeholder="SDR Owner"
                    searchPlaceholder="Search..."
                    nameKey="title"
                    data={assignUserList}
                    value={sdrowner}
                    onSelect={(item) => {
                      console.log("onSelect item==>", item);
                      this.setState({ sdrowner: item });
                    }}
                  /> */}
                </View>
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Discount
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
                    marginTop: 5,
                  }}
                  placeholder="Discount"
                  value={orgdiscount}
                  onChangeText={text => {
                    this.setState({orgdiscount: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Term
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
                    marginTop: 5,
                  }}
                  placeholder="Term"
                  value={orgterm}
                  onChangeText={text => {
                    this.setState({orgterm: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Plan
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
                    marginTop: 5,
                  }}
                  placeholder="Plan"
                  value={orgplan}
                  onChangeText={text => {
                    this.setState({orgplan: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>

              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  License Total
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
                    marginTop: 5,
                  }}
                  placeholder="License Total"
                  value={orglicensetotal}
                  onChangeText={text => {
                    this.setState({orglicensetotal: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
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
                Address
              </Text>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Address
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
                    marginTop: 5,
                  }}
                  placeholder="Address"
                  value={address}
                  onChangeText={text => {
                    this.setState({address: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  City
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
                    marginTop: 5,
                  }}
                  placeholder="City"
                  value={city}
                  onChangeText={text => {
                    this.setState({city: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  State
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
                    marginTop: 5,
                  }}
                  placeholder="State"
                  value={state}
                  onChangeText={text => {
                    this.setState({state: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Zip
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
                    marginTop: 5,
                  }}
                  placeholder="Zip"
                  value={zip}
                  onChangeText={text => {
                    this.setState({zip: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Country
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
                    marginTop: 5,
                  }}
                  placeholder="Country"
                  value={country}
                  onChangeText={text => {
                    this.setState({country: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
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
                Social Media Profiles
              </Text>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Facebook
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
                    marginTop: 5,
                  }}
                  placeholder="Facebook"
                  value={facebook}
                  onChangeText={text => {
                    this.setState({facebook: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Twitter
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
                    marginTop: 5,
                  }}
                  placeholder="Twitter"
                  value={twitter}
                  onChangeText={text => {
                    this.setState({twitter: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  LinkedIn
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
                    marginTop: 5,
                  }}
                  placeholder="LinkedIn"
                  value={linkdin}
                  onChangeText={text => {
                    this.setState({linkdin: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Instagram
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
                    marginTop: 5,
                  }}
                  placeholder="Instagram"
                  value={instagram}
                  onChangeText={text => {
                    this.setState({instagram: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
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
                Other
              </Text>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Website
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
                    marginTop: 5,
                  }}
                  placeholder="Website"
                  value={website}
                  onChangeText={text => {
                    this.setState({website: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text
                  style={{
                    flex: 1,
                    fontFamily: font.reg,
                    color: '#7E8EAA',
                    marginBottom: 5,
                  }}>
                  Next Steps
                </Text>
                <TextInput
                  style={{
                    color: '#000',
                    borderWidth: 1,
                    borderRadius: 8,
                    flex: 1,
                    borderColor: color.borderColor,
                    paddingHorizontal: 12,
                    // height: 50,
                    marginTop: 5,
                    textAlignVertical: 'top',
                    minHeight: Platform.OS === 'ios' ? 20 * 5 : null,
                  }}
                  multiline={true}
                  numberOfLines={5}
                  placeholder="Next Steps"
                  value={nextsteps}
                  onChangeText={text => {
                    this.setState({nextsteps: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        {/* <SnackBar ref="Snackbar" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    zIndex: 0,
  },
  placeholderStyle: {
    color: 'lightgrey',
    // fontFamily: font.reg,
    fontSize: 14,
  },
  selectedColor: {
    color: '#000',
    fontSize: 14,
  },
});
