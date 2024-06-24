import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';

// import { navigate } from 'src/navigation/navigation'

import {color, font} from '../../Component/Styles';
import NavigationService from 'src/utils/NavigationService';

type Props = {
  companyId: string;
  data: any;
};

export default class RelatedCompany extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  onRelatedContactsPress = () => {
    NavigationService.navigate('RelatedContacts', {
      organizationId: this.props.companyId,
    });
  };

  render() {
    const {data} = this.props;
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={require('assets/img/pipeline.png')}
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
            Opportunity Value
          </Text>
          <Text
            style={{
              fontFamily: font.reg,
              color: color.fontcolor,
              fontSize: 16,
            }}>
            {data.value + '' || '0'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}
          onPress={this.onRelatedContactsPress}>
          <Image
            source={require('assets/img/People.png')}
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
            People Associated with Company
          </Text>
          <Text
            style={{
              fontFamily: font.reg,
              color: color.fontcolor,
              fontSize: 16,
            }}>
            {data.other.contacts_count || '0'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
