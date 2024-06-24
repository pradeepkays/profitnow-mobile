import React, {Component} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {color, font} from 'components/Styles';
// import {navigate} from 'src/navigation/navigation';
import {API} from 'src/Privet';
import useAppStore from 'src/store/appStore';
import NavigationService from 'src/utils/NavigationService';

type Props = {
  id: string;
  data: any;
};

type State = {
  detailsApi: any;
  isLoading: boolean;
};

export default class Related extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      detailsApi: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    this.relatedApi();
  }

  relatedApi() {
    const {id} = this.props;
    this.setState({isLoading: true});

    fetch(`${API.contacts}/${id + ''}/stats`, {
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
        if (response?.contact_stats) {
          this.setState({
            isLoading: false,
            detailsApi: response.contact_stats,
          });
        } else {
          this.setState({isLoading: false});
        }
      })
      .catch(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {detailsApi, isLoading} = this.state;

    const {data, id} = this.props;

    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}>
        {data?.organization?.id ? (
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate('CompanyDetails', {
                companyId: data?.organization?.id
                  ? data?.organization?.id + ''
                  : '',
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={require('assets/img/Companies.png')}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: color.secondColor,
              }}
            />
            <Text
              style={{
                flex: 1,
                textAlignVertical: 'center',
                fontFamily: font.reg,
                color: color.fontcolor,
                marginLeft: 15,
                fontSize: 16,
              }}>
              Company
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('CurrentSequence', {id: id})
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={require('assets/img/check-mark.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: color.secondColor,
            }}
          />
          <Text
            style={{
              flex: 1,
              textAlignVertical: 'center',
              fontFamily: font.reg,
              color: color.fontcolor,
              marginLeft: 15,
              fontSize: 16,
            }}>
            Current Sequence
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => this.props.navigate("SupportTickets", {id: id})}
          onPress={() => NavigationService.navigate('ContactCustomerSupport', {id: id})}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={require('assets/img/Supporttickets.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: color.secondColor,
            }}
          />
          <Text
            style={{
              flex: 1,
              textAlignVertical: 'center',
              fontFamily: font.reg,
              color: color.fontcolor,
              marginLeft: 15,
              fontSize: 16,
            }}>
            Support tickets
          </Text>
          {isLoading ? (
            <ActivityIndicator color={color.fontcolor} />
          ) : (
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontcolor,
                fontSize: 16,
              }}>
              {detailsApi?.support_tickets_count || '0'}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.navigate('VideoScreen', {id: id})}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={require('assets/img/Videos.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: color.secondColor,
            }}
          />
          <Text
            style={{
              flex: 1,
              textAlignVertical: 'center',
              fontFamily: font.reg,
              color: color.fontcolor,
              marginLeft: 15,
              fontSize: 16,
            }}>
            Videos
          </Text>
          {isLoading ? (
            <ActivityIndicator color={color.fontcolor} />
          ) : (
            <Text
              style={{
                fontFamily: font.reg,
                color: color.fontcolor,
                fontSize: 16,
              }}>
              {detailsApi?.videos_count || '0'}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.navigate('Purchases', {id: id})}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={require('assets/img/Purchases.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              tintColor: color.secondColor,
            }}
          />
          <Text
            style={{
              flex: 1,
              textAlignVertical: 'center',
              fontFamily: font.reg,
              color: color.fontcolor,
              marginLeft: 15,
              fontSize: 16,
            }}>
            Purchases
          </Text>
          {/* {isLoading ? <ActivityIndicator color={color.fontcolor} /> : <Text style={{ fontFamily: font.reg, color: color.fontcolor, fontSize: 16 }}>{data.campaigns_count || '0'}</Text>} */}
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
