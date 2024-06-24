import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppBlock} from '@starlingtech/element';

import {consoleLog} from '@vn.starlingTech/helpers/logHelper';

import {CompanyUserPicker} from 'components/CompanyUserPicker';
import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';
import {AssignedUser, RespContact} from 'src/types/contact.types';
import {RespLocation_Data} from 'src/types/location.types';
import {RespPipeline, Stage} from 'src/types/pipeline.types';

import {State} from './AddContact.types';
import {Cellphones, countryList, PhoneType} from './components/Cellphone';
import {GooglePlaceSuggestion} from './components/GooglePlaceSuggestion';
import {LocationPicker} from './components/LocationPicker';
import {AddContactSave} from './components/Save';
import {StageFilter} from './components/StageFilter';
import Header from '../../Component/Header';
import PickerNew from '../../Component/PickerNew';
import SnackBar from '../../Component/SnackBar';
import {color, font, shadow} from '../../Component/Styles';
import {API} from '../../Privet';
import {Dropdown} from 'react-native-element-dropdown';

export default class AddContact extends Component<AppScreenProps, State> {
  snackBar: SnackBar | null = null;

  accessToken = useAppStore.getState().accessToken;
  details: RespContact;

  constructor(props: AppScreenProps) {
    super(props);
    this.details = this.props?.route?.params?.detail;
    this.state = {
      firstname: '',
      lastname: '',
      cellphone: '',
      email: '',
      value: '0',
      streetnumber: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      facebook: '',
      twitter: '',
      linkdin: '',
      instagram: '',
      note: '',
      id: '',
      forceRender: true,
      phones: [
        {
          prefix: countryList[0].callingCode,
          country: countryList[0].name,
          short_phone: '',
          ext: '',
          type: 'Main',
        },
      ],
      compaignList: [],
      compaignName: [],

      contactList: [],
      contactName: [],

      tagList: [],
      tagName: [],

      showSecondPhone: false,

      CountryList: [
        {stage: 'US', title: '+1'},
        {stage: 'AU', title: '+61'},
        {stage: 'NZ', title: '+64'},
        // { stage: "CA", title: "+1" },
        {stage: 'BR', title: '+55'},
        {stage: 'UK', title: '+44'},
      ],
      countryName: '',

      companyList: [],
      companyName: [],

      assignUserList: [],
      assignUserId: '',

      isLoading: true,
      title: '',
      psa: '',
      awaiting_feature: '',
      demo_reporting: '',

      status: undefined,
      stage: undefined,
      location: undefined,
    };
  }

  componentDidMount() {
    if (this.details) {
      this.handleUpdateData(this.details);
      this.companyListApi(this.details);
    }
  }

  handleUpdateData(data: RespContact) {
    this.setState({
      assignUserId: data?.assigned_user.id || '',
      // phones: (data && data.phones) || '',
      city: (data && data.address && data.address.city) || '',
      country: (data && data.address && data.address.country) || '',
      email: (data && data.email) || '',
      facebook: (data && data.facebook_url) || '',
      firstname: (data && data.first_name) || '',
      id: data && data.id,
      instagram: (data && data.instagram_url) || '',
      lastname: (data && data.last_name) || '',
      linkdin: (data && data.linkedin_url) || '',
      location: data && data.location ? data.location : undefined,
      state: (data && data.address && data.address.state) || '',
      //statusName: filterStatus && filterStatus.length ? filterStatus[0] : [],
      //stageName: filterStage && filterStage.length ? filterStage[0] : {},
      streetnumber: (data && data.address && data.address.street_address) || '',
      twitter: (data && data.twitter_url) || '',
      value: data.value ? data.value?.toString() : '',
      zip: (data && data.address && data.address.zip) || '',
      title: data?.title || '',
      psa: data?.PSA || '',
      awaiting_feature: data?.awaiting_feature || '',
      demo_reporting: data?.demo_reporting || '',
    });
    if (data.phones.length) {
      const tmp: PhoneType[] = [];
      data.phones.forEach(x => {
        tmp.push({
          prefix: x.prefix,
          country: x.country,
          short_phone: x.short_phone,
          type: x.type,
          ext: x.extension,
        });
      });
      consoleLog(data.phones, tmp, 'tmp?');
      this.setState({phones: tmp});
    }
  }

  // CompanyList
  companyListApi(data: any) {
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
        if (response?.data !== null) {
          if (data && data.organization && data.organization.id) {
            const orgName = response.data?.filter(k => {
              return k.id === data.organization.id;
            });
            this.setState({
              companyList: response.data,
              companyName: orgName && orgName.length ? orgName[0] : [],
            });
          } else {
            this.setState({companyList: response.data});
          }
        } else {
          this.setState({companyList: []});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  dispatchLoading = () => {
    this.setState({isLoading: true});
  };

  // addStage = (id: string) => {
  //   const { stage } = this.state
  //   fetch(`${API.contacts}/${id}/setstage`, {
  //     method: 'POST',
  //     body: JSON.stringify({ stage: stage.stage }),
  //     headers: {
  //       'Content-Type': 'application/',
  //       Accept: '*/*',
  //       access_token: this.accessToken,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (response) => {
  //       console.log('response', response)
  //       if (response) {
  //         Alert.alert('Success', 'Contact Added Successfully', [
  //           {
  //             text: 'OK',
  //           },
  //         ])
  //       } else {
  //         // this.refs.snackbar.show(response.message)
  //       }
  //     })
  //     .catch(() => {
  //       //
  //     })
  // }

  assignUserChanged = (user: AssignedUser) => {
    this.setState({assignUserId: user.id});
  };

  disabledFunc() {
    const {firstname, cellphone, stage} = this.state;
    if (firstname === '' && cellphone === '' && !stage) {
      return true;
    } else {
      return false;
    }
  }

  setStatus = (status: RespPipeline) => {
    this.setState({status});
  };

  setStage = (stage: Stage) => {
    this.setState({stage});
  };

  onLocationChanged = (p?: RespLocation_Data) => {
    this.setState({location: p});
  };

  render() {
    const {
      companyList,
      companyName,
      firstname,
      lastname,
      email,
      value,
      streetnumber,
      zip,
      country,
      facebook,
      twitter,
      linkdin,
      instagram,
      id,
      psa,
      title,
      demo_reporting,
      awaiting_feature,
      status,
      stage,
      location,
    } = this.state;

    return (
      <View style={{flex: 1}}>
        {/* <ActivityIndicator color={'#000'} style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} /> */}
        <Header
          title={id ? 'Update Contact' : 'Create Contact'}
          SafeAreaViewColor={'#f3f6fa'}
          Limg={require('assets/img/back.png')}
          //tintActive
          Lpress={() => this.props.navigation.goBack()}
          customeRightButton={
            <AddContactSave
              state={this.state}
              dispatchLoading={this.dispatchLoading}
              disabled={this.disabledFunc()}
            />
          }
        />

        <KeyboardAwareScrollView
          style={{flex: 1, zIndex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            bounces={false}
            style={{zIndex: 1}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 20,
              zIndex: 1,
            }}>
            <View
              style={{
                ...shadow,
                marginHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 6,
                paddingHorizontal: 25,
                paddingVertical: 20,
                zIndex: 999,
              }}>
              <AppBlock mb={15}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="First Name"
                  value={firstname}
                  onChangeText={text => {
                    this.setState({firstname: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>
              <AppBlock mb={15}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Last Name"
                  value={lastname}
                  onChangeText={text => {
                    this.setState({lastname: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>

              <Cellphones
                phones={this.state.phones}
                setPhones={_phones => this.setState({phones: _phones})}
              />

              <AppBlock mv={15}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  value={email}
                  onChangeText={text => {
                    this.setState({email: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>
              <AppBlock mb={15}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="title"
                  value={title}
                  onChangeText={text => {
                    this.setState({title: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>
              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>Value</Text>
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

              <StageFilter
                stage={stage}
                status={status}
                setStage={this.setStage}
                setStatus={this.setStatus}
                statusVal={this.details?.status}
                stageVal={this.details?.stage}
              />

              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>Company</Text>
                <View style={{flex: 1}}>
                  {/* <PickerNew
                    // icon={require('assets/img/drop.png')}
                    // style={{ borderWidth: 1, borderRadius: 8, flex: 1 }}
                    placeholder="Company"
                    nameKey="title"
                    data={companyList}
                    value={companyName}
                    onSelect={_companyName =>
                      this.setState({companyName: _companyName})
                    }
                  /> */}
                  <Dropdown
                    style={styles.modalView}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedColor}
                    data={companyList}
                    maxHeight={300}
                    labelField="title"
                    valueField="id"
                    placeholder="Company"
                    value={companyName}
                    onChange={value => {
                      this.setState({companyName: value});
                    }}
                  />
                </View>
              </View>

              <CompanyUserPicker
                value={this.state.assignUserId}
                onChanged={this.assignUserChanged}
              />

              <AppBlock mb={15}>
                <Text style={styles.label}>PSA</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="PSA"
                  value={psa}
                  onChangeText={text => {
                    this.setState({psa: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>

              <AppBlock mb={15}>
                <Text style={styles.label}>Awaiting Feature</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Awaiting Feature"
                  value={awaiting_feature}
                  onChangeText={text => {
                    this.setState({awaiting_feature: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>

              <AppBlock mb={15}>
                <Text style={styles.label}>Demo Recording</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Demo Recording"
                  value={demo_reporting}
                  onChangeText={text => {
                    this.setState({demo_reporting: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </AppBlock>

              <LocationPicker
                value={location}
                onChange={this.onLocationChanged}
              />

              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>Street Address</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Street Address"
                  value={streetnumber}
                  onChangeText={text => {
                    this.setState({streetnumber: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              {/* <View style={{ marginBottom: 15, zIndex: 999 }}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="City"
                  value={city}
                  onChangeText={(text) => {
                    this.setState({ city: text })
                  }}
                  placeholderTextColor={'rgba (58, 53, 65, 0.38)'}
                />
              </View> */}
              <GooglePlaceSuggestion
                value={this.state.city}
                label="City"
                type="city"
                country={country}
                onChanged={txt => this.setState({city: txt})}
              />
              <GooglePlaceSuggestion
                value={this.state.state}
                label="State"
                type="state"
                country={country}
                onChanged={txt => this.setState({state: txt})}
              />
              {/* <View style={{ marginBottom: 15 }}>
                <Text style={styles.label}>State</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="State"
                  value={state}
                  onChangeText={(text) => {
                    this.setState({ state: text })
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View> */}
              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>Zip</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Zip"
                  value={zip}
                  onChangeText={text => {
                    this.setState({zip: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <GooglePlaceSuggestion
                value={this.state.country}
                label="Country"
                type="country"
                country={country}
                onChanged={txt => this.setState({country: txt})}
              />
              {/* <View style={{ marginBottom: 15 }}>
                <Text style={styles.label}>Country</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Country"
                  value={country}
                  onChangeText={(text) => {
                    this.setState({ country: text })
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View> */}
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
                <Text style={styles.label}>Facebook</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Facebook"
                  value={facebook}
                  autoCapitalize="none"
                  onChangeText={text => {
                    this.setState({facebook: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>Twitter</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Twitter"
                  autoCapitalize="none"
                  value={twitter}
                  onChangeText={text => {
                    this.setState({twitter: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>LinkedIn</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="LinkedIn"
                  autoCapitalize="none"
                  value={linkdin}
                  onChangeText={text => {
                    this.setState({linkdin: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <Text style={styles.label}>Instagram</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Instagram"
                  value={instagram}
                  autoCapitalize="none"
                  onChangeText={text => {
                    this.setState({instagram: text});
                  }}
                  placeholderTextColor={'rgba(58, 53, 65, 0.38)'}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <SnackBar ref={ref => (this.snackBar = ref)} />
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
  label: {
    color: '#7E8EAA',
    flex: 1,
    fontFamily: font.reg,
    marginBottom: 5,
  },
  textInput: {
    borderColor: color.borderColor,
    borderRadius: 8,
    borderWidth: 1,
    color: '#000',
    flex: 1,
    height: 50,
    marginTop: 5,
    paddingHorizontal: 12,
  },
});
