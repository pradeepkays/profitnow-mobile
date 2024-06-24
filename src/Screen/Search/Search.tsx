import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

import {AppBlock} from '@starlingtech/element';

import {AppScreenProps} from 'src/navigation/navigation.types';
import useAppStore from 'src/store/appStore';

import {SearchFilter} from './components/Search.Filter';
import SearchCompany from './SearchCompany';
import SearchContact from './SearchContact';
import Header from '../../Component/Header';

export default function Search({navigation, route}: AppScreenProps) {
  const param = route?.params?.activeSteps ?? '';

  const [keyword, setKeyword] = useState('');
  const [filterTarget, setFilterTarget] = useState<'contact' | 'company'>(
    param === 'Companies' ? 'company' : 'contact',
  );
  const [filterStatus, setFilterStatus] = useState<
    'lead' | 'opportunities' | undefined
  >();
  const [filterSize, setFilterSize] = useState<string | undefined>();

  useEffect(() => {
    useAppStore.setState({isTabBar: true, activeRoute: 'Search'});
  }, []);

  const willFocus = () => {
    useAppStore.setState({isTabBar: true, activeRoute: 'Search'});
  };

  const onSearchClose = () => {
    setKeyword('');
    Keyboard.dismiss();
  };

  return (
    <AppBlock flex background="white">
      <Header
        searchBar
        text={keyword}
        placeholderType={'Search'}
        closeSearchBar={onSearchClose}
        _onWillFocus={willFocus}
        searchFilterFunction={setKeyword}
      />
      <AppBlock height={0.5} background="icon" mb={9} mt={4} />
      <SearchFilter
        target={filterTarget}
        setTarget={setFilterTarget}
        status={filterStatus}
        setStatus={setFilterStatus}
        size={filterSize}
        setSize={setFilterSize}
      />
      <AppBlock height={6} />
      {filterTarget === 'contact' ? (
        <SearchContact status={filterStatus} keyword={keyword} />
      ) : (
        <SearchCompany size={filterSize} keyword={keyword} />
      )}
    </AppBlock>
  );
}
