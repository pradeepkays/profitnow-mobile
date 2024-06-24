import React, { Component } from 'react'
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { utcToLocal } from 'src/helper/timeHelper'

import { color, font } from '../../Component/Styles'

type Props = {
  data: any
}
const hours = [
  { hour: '-1 Hr' },
  { hour: '+1 Hr' },
  { hour: '+2 Hr' },
  { hour: '+3 Hr' },
  { hour: '+4 Hr' },
  { hour: '+5 Hr' },
  { hour: '+6 Hr' },
  { hour: '+1 Day' },
]

export default class DetailsTicket extends Component<Props> {
  render() {
    const detail = this.props.data
    return (
      <ScrollView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', marginBottom: 35 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Index
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.index || '-'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Status
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.status?.title || '-'}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 35 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Contact Info
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.assigned_contact?.name || '-'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Department
            </Text>
            <Text
              style={{ color: '#00AEEF', fontFamily: font.bold, fontSize: 13 }}
            >
              {detail?.department?.title || '-'}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 35 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Priority
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.priority?.title || '-'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Created
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.semi, fontSize: 13 }}
            >
              {utcToLocal(detail?.time_created)}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 35 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Age
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.age || '-'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Assigned User
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.assigned_user?.name || '-'}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 35 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            >
              Time spent
            </Text>
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            >
              {detail?.time_spent_sec || '-'}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#627390',
                fontFamily: font.reg,
                marginBottom: 10,
                fontSize: 15,
              }}
            />
            <Text
              style={{ color: '#000926', fontFamily: font.bold, fontSize: 15 }}
            />
          </View>
        </View>
        <Text style={{ color: '#7E8EAA', fontFamily: font.bold, fontSize: 16 }}>
          Additional Hours Needed
        </Text>
        <FlatList
          numColumns={3}
          data={hours}
          contentContainerStyle={{ flexWrap: 'wrap', paddingTop: 10 }}
          renderItem={({ item }) => (
            <View style={{}}>
              <TouchableOpacity
                // onPress={() => this.setHourApi(item.hour)}
                style={{
                  height: 35,
                  width: 100,
                  backgroundColor: color.secondColor,
                  marginBottom: 10,
                  marginRight: 15,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{ color: '#fff', fontFamily: font.semi, fontSize: 15 }}
                >
                  {item.hour}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    )
  }
}
