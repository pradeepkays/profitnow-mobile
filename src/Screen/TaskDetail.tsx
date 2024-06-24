import React, { Component } from 'react'
import { Text, View } from 'react-native'

import moment from 'moment'

import { AppScreenProps } from 'src/navigation/navigation.types'

import Header from '../Component/Header'
import { color } from '../Component/Styles'

export default class TaskDetail extends Component<AppScreenProps> {
  render() {
    const { navigation } = this.props
    console.log('navigation', navigation.state.params.item.name)
    return (
      <View>
        <Header
          title="Campaign"
          Limg={require('../assets/img/back.png')}
          Lpress={() => navigation.goBack()}
        />

        <View
          style={{
            backgroundColor: '#FFF',
            borderRadius: 10,
            marginTop: 20,
            marginHorizontal: 20,
            padding: 15,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
          >
            <View style={{ width: '50%' }}>
              <Text style={{ color: 'grey' }}>Campaign Name</Text>
              <Text style={{ fontWeight: 'bold' }}>
                {navigation?.state?.params?.item?.name}
              </Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={{ color: 'grey' }}>Stop Campaign</Text>
              <Text style={{ fontWeight: 'bold' }}>N/A</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}
          >
            <View style={{ width: '50%' }}>
              <Text style={{ color: 'grey' }}>Status</Text>
              <Text style={{ fontWeight: 'bold', color: color.primeColor }}>
                PENDING
              </Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={{ color: 'grey' }}>Date</Text>
              <Text style={{ fontWeight: 'bold' }}>
                {moment(navigation?.state?.params?.item?.time).format('ll')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
