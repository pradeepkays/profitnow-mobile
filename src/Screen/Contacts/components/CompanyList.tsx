import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// import { navigate } from 'src/navigation/navigation';
import useAppStore from 'src/store/appStore';

import {color, font, shadow} from '../../../Component/Styles';
import {API} from '../../../Privet';
import NavigationService from 'src/utils/NavigationService';
const {width} = Dimensions.get('window');

type Props = {
  data: any[];
  dataFound: boolean;
  isReloadAgain: boolean;
  myFunction: Function;
};

type State = {
  isLoading: boolean;
  totalSend: number;
  nodata: boolean;
  page: number;
  companyList: any[];
  forceRender: boolean;
};

export default class CompanyList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      nodata: false,
      page: 0,
      companyList: [],
      totalSend: 0,
      forceRender: true,
    };
  }
  async componentDidUpdate() {
    if (this.props?.dataFound) {
      this.setState({
        isLoading: false,
        companyList: this?.props?.data,
        totalSend: this?.props?.data?.length,
        page: 1,
      });
      this.setState({forceRender: !this.state.forceRender});
    }
  }
  async componentDidMount() {
    useAppStore.setState({isTabBar: true, activeRoute: 'ContactCompany'});
    await this.companyApi(0);
  }

  async componentWillReceiveProps(newProps: Props) {
    if (newProps && newProps.isReloadAgain === true) {
      await this.companyApi(0);
    }
  }

  companyApi(val?: number) {
    const {page, companyList, totalSend} = this.state;
    const pageValue = val === 0 ? 0 : page;

    if (totalSend >= pageValue || val === 0) {
      this.setState({isLoading: true});
      fetch(`${API.organizations}?limit=15&offset=${pageValue + ''}`, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          access_token: useAppStore.getState().accessToken,
        },
      })
        .then(response => response.json())
        .then(async response => {
          // console.log('response', response)
          if (response?.data.length !== 0) {
            if (companyList.length <= 0 || val === 0) {
              this.setState({
                isLoading: false,
                companyList: response.data,
                totalSend: response.pagination.total_items,
                page: pageValue + 15,
              });
              // this.arrayHold = response.data
            } else {
              this.setState({
                isLoading: false,
                companyList: [...companyList, ...response.data],
                page: pageValue + 15,
                totalSend: response.pagination.total_items,
              });
              // this.arrayHold = [...companyList, ...response.data]
            }
          } else {
            this.setState({
              isLoading: false,
              nodata: true,
              totalSend: response.pagination.total_items,
            });
          }
        })
        .catch(error => {
          this.setState({isLoading: false});
          console.log(error);
        });
    }
  }

  onRefresh() {
    this.setState(
      {page: 0, isLoading: false, nodata: false, companyList: []},
      () => this.companyApi(0),
    );
  }

  renderFooter = () => {
    const {nodata} = this.state;
    if (!nodata) {
      return (
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            ...shadow,
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={color.primeColor} style={{}} />
        </View>
      );
    } else {
      return (
        nodata && (
          <Text
            style={{
              flex: 1,
              fontFamily: font.bold,
              fontSize: 12,
              color: color.primeColor,
              textAlign: 'center',
            }}>
            No more data!
          </Text>
        )
      );
    }
  };

  render() {
    const {companyList, isLoading} = this.state;
    return (
      <View style={{flex: 1}}>
        {this.props?.dataFound && (
          <TouchableOpacity
            style={{alignItems: 'flex-end', padding: 10}}
            onPress={() => {
              this.setState({
                companyList: [],
              });
              this.props.myFunction();
              this.companyApi(0);
            }}>
            <Text style={{color: color.primeColor}}>RESET</Text>
          </TouchableOpacity>
        )}
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 20,
            paddingTop: 20,
          }}
          data={companyList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('CompanyDetails', {
                  companyId: item.id + '',
                });
              }}
              style={{
                flexDirection: 'row',
                marginBottom: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color.selectBgColor,
                  borderRadius: 45,
                  overflow: 'hidden',
                }}>
                {item?.img ? (
                  <Image
                    source={item.img}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      fontFamily: font.semi,
                      color: color.fontblack,
                      fontSize: 15,
                    }}>
                    {item?.initials}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  flex: 1,
                  fontFamily: font.semi,
                  marginLeft: 15,
                  fontSize: 14,
                  color: color.fontcolor,
                }}>
                {item?.title}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{flex: 1}}>
              {!isLoading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('assets/img/empty.png')}
                    style={{height: 90, width: 90}}
                  />
                  <Text
                    style={{
                      fontFamily: font.reg,
                      textAlign: 'center',
                      marginTop: 10,
                      color: color.lableColor,
                    }}>
                    Result not found!
                  </Text>
                </View>
              ) : (
                <SkeletonPlaceholder>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', paddingBottom: 10}}>
                    <View style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 18, justifyContent: 'center'}}>
                      <View
                        style={{
                          height: 20,
                          width: width / 2,
                          marginTop: 3,
                          borderRadius: 2.5,
                        }}
                      />
                      <View
                        style={{
                          height: 20,
                          width: width / 2.5,
                          marginTop: 2,
                          borderRadius: 2.5,
                        }}
                      />
                    </View>
                  </View>
                </SkeletonPlaceholder>
              )}
            </View>
          }
          keyExtractor={(item, index) => index + ''}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (!this.props?.dataFound) {
              this.companyApi();
            }
          }}
          ListFooterComponent={
            (!this.props?.dataFound && this.renderFooter) || undefined
          }
          refreshControl={
            <>
              {!this.props?.dataFound && (
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => this.onRefresh()}
                />
              )}
            </>
          }
        />
      </View>
    );
  }
}
