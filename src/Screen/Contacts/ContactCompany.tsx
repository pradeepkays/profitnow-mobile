import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {AppBlock, AppText} from '@starlingtech/element';

import useAppStore from 'src/store/appStore';

import {CompanyFilter} from './components/Company.Filter';
import CompanyList from './components/CompanyList';
import Contact from './components/Contact';
import {ContactFilter} from './components/Contact.Filter';
import {ContactsCompanyType} from './ContactCompany.props';
import Header from '../../Component/Header';
import {color} from '../../Component/Styles';
import {API} from '../../Privet';
import {AppScreenProps} from 'src/navigation/navigation.types';

export default function ContactsCompany({navigation}: AppScreenProps) {
  const [state, dispatchState] = useState<ContactsCompanyType>({
    active: 'Contacts',
    isReloadAgain: false,
    companyFilter: false,
    contactsFilter: false,
    filteredContacts: [],
    filteredCompanies: [],
    stageList: [
      {label: 'Item 1', value: '1'},
      {label: 'Item 2', value: '2'},
      {label: 'Item 3', value: '3'},
    ],
    stageName: null,
    isLoading: false,

    //pickers
    titleValue: null,
    phoneValue: '',
    emailValue: null,
    citylValue: null,
    stateValue: null,
    employeeValue: null,
    confidenceValue: null,
    companyAssignedUser: null,
    open: false,
    value: [],
    tags: null,
    companyValue: null,

    statusValue: '',
    contactValue: '',
    locationValue: '',
    socialValue: '',
    assignedValue: null,

    showValue: null,
    addedValue: null,
    touchesValue: '',
    sortByValue: null,
    sortByConfidenceValue: null,
    itemPerPageValue: null,
    dateBefore: '',
    afterDate: '',
    contactFound: false,
  });

  const accessToken = useAppStore(s => s.accessToken);

  useEffect(() => {
    // useAppStore.setState({ isTabBar: true, activeRoute: 'ContactCompany' })
  }, []);

  const setState = (_state: any) => {
    dispatchState((prev: any) => ({...prev, ..._state}));
  };

  const filterCompaniesData = () => {
    const {
      tags,
      phoneValue,
      titleValue,
      emailValue,
      citylValue,
      stateValue,
      employeeValue,
      confidenceValue,
      companyAssignedUser,
    } = state;

    let tempUrl = '';
    if (titleValue?.label) {
      tempUrl = `title=${titleValue?.label}&`;
    }
    if (phoneValue) {
      tempUrl = tempUrl + `phone=${phoneValue}&`;
    }
    if (emailValue?.label) {
      tempUrl = tempUrl + `email_beginning=${emailValue?.label}&`;
    }
    if (citylValue?.label) {
      tempUrl = tempUrl + `city=${citylValue?.label}&`;
    }
    if (stateValue?.label) {
      tempUrl = tempUrl + `state=${stateValue?.label}&`;
    }
    if (employeeValue?.label) {
      tempUrl = tempUrl + `employees=${employeeValue?.value}&`;
    }
    if (confidenceValue?.label) {
      tempUrl = tempUrl + `confidence_level=${confidenceValue?.value}&`;
    }
    if (companyAssignedUser?.label) {
      tempUrl = tempUrl + `user=${companyAssignedUser?.value}&`;
    }
    if (tags) {
      tempUrl = tempUrl + `tags=${tags}&`;
    }

    fetch(API.organizations + '?limit=15&' + tempUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: '*/*',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(async response => {
        resetValues();

        setState({
          companyFilter: false,
          contactFound: true,
          filteredCompanies: response?.data,
        });
      })
      .catch(() => {
        setState({isLoading: false});
      });
  };

  /**
   * Not in use in navigation v6
   */
  const willFocus = () => {
    useAppStore.setState({isTabBar: true, activeRoute: 'ContactCompany'});
    setState({isReloadAgain: false});
  };

  const resetValues = () => {
    setState({
      //pickers
      titleValue: null,
      phoneValue: null,
      emailValue: null,
      citylValue: null,
      stateValue: null,
      employeeValue: null,
      confidenceValue: null,
      companyAssignedUser: null,
      open: false,
      value: [],
      tags: null,
      companyValue: null,
      statusValue: '',
      contactValue: '',
      locationValue: '',
      socialValue: '',
      assignedValue: null,
      showValue: null,
      addedValue: null,
      touchesValue: '',
      sortByValue: null,
      sortByConfidenceValue: null,
      itemPerPageValue: null,
      dateBefore: '',
      afterDate: '',
      contactFound: false,
    });
  };

  const callBackFunction = () => {
    setState({
      contactFound: false,
      filteredContacts: [],
      filterCompaniesData: [],
    });
  };

  const onCloseFilter = () => {
    resetValues();
    setState({companyFilter: false, contactsFilter: false});
  };

  const {active, isReloadAgain} = state;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header
        title={active === 'Contacts' ? 'Contacts' : 'Companies'}
        Rimg={require('assets/img/homeemail.png')}
        Rpress={() => navigation.navigate('Home')}
        Rimg2={require('assets/img/searchToday.png')}
        Rpress2={() =>
          navigation.navigate('Search', {
            activeSteps: active,
          })
        }
        Rimg3={require('assets/img/plus.png')}
        Rpress3={() =>
          active === 'Contacts'
            ? navigation.navigate('AddContact')
            : active === 'Companies'
            ? navigation.navigate('AddCompany')
            : null
        }
        Rimg4={require('assets/img/filter.png')}
        Rpress4={() => {
          if (active === 'Companies') {
            setState({companyFilter: true});
          } else {
            setState({contactsFilter: true});
          }
        }}
        // _onWillFocus={willFocus}
        active
        // count={null}
      />

      <AppBlock row height={50}>
        <TouchableOpacity
          onPress={() => {
            setState({
              active: 'Contacts',
              contactFound: false,
              filteredContacts: [],
              filterCompaniesData: [],
            });
          }}
          style={[
            styles.tabItem,
            active === 'Contacts' && styles.tabItemActive,
          ]}>
          <AppText color={active === 'Contacts' ? 'secondary' : 'placeholder'}>
            Contacts
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setState({
              active: 'Companies',
              contactFound: false,
              filteredContacts: [],
              filterCompaniesData: [],
            });
          }}
          style={[
            styles.tabItem,
            active === 'Companies' && styles.tabItemActive,
          ]}>
          <AppText color={active === 'Companies' ? 'secondary' : 'placeholder'}>
            Companies
          </AppText>
        </TouchableOpacity>
      </AppBlock>
      {active === 'Contacts' ? (
        <Contact />
      ) : (
        <CompanyList
          data={state.filteredCompanies}
          myFunction={() => callBackFunction()}
          dataFound={state.contactFound}
          isReloadAgain={isReloadAgain}
        />
      )}
      <ContactFilter state={state} onClose={onCloseFilter} />
      <CompanyFilter
        state={state}
        setState={setState}
        onClose={onCloseFilter}
        onSubmit={filterCompaniesData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    borderBottomColor: color.borderColor,
    borderBottomWidth: 2,
    flex: 1,
    justifyContent: 'center',
  },
  tabItemActive: {
    borderBottomColor: color.secondColor,
  },
});
