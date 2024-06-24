import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import moment from 'moment'

import { color, font } from '../Styles'
type Props = {
  data: any
}
const UserBookedCalls = ({ data }: Props) => {
  const utcToLocal = (date: any, format = 'MM/DD/YYYY hh:mm A') => {
    return moment.utc(date).format(format)
  }

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.userImageContainer}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${data?.assigned_contact?.name}`,
          }}
          style={styles.userNameInitials}
        />

        <View style={styles.emailImageShort}>
          <Image
            source={require('assets/img/call.png')}
            style={styles.emailImage}
          />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text
          numberOfLines={2}
          style={[
            styles.descText,
            { fontWeight: data.unread ? 'bold' : '600' },
          ]}
        >
          {data?.assigned_contact?.name}
        </Text>
        {/* {type === "email" ? (
          <Text style={styles.fromText} numberOfLines={1}>
            From: {userData?.email || "-"}{" "}
          </Text>
        ) : (
          <Text style={styles.fromText} numberOfLines={1}>
            From: {userData?.first_name} {userData?.last_name}
          </Text>
        )} */}

        <Text style={styles.timeText}>
          {utcToLocal(data?.time_created) || '-'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default UserBookedCalls

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  descText: {
    color: color.fontcolor,
    fontFamily: font.semi,
    marginBottom: 5,
    marginRight: 10,
  },
  detailsContainer: {
    marginLeft: 15,
    width: '90%',
  },
  emailImage: {
    height: 11,
    resizeMode: 'contain',
    tintColor: '#FFF',
    width: 11,
  },
  emailImageShort: {
    alignItems: 'center',
    backgroundColor: color.secondColor,
    borderRadius: 10,
    bottom: -2,
    height: 18,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: -2,
    width: 18,
  },
  timeText: {
    color: 'rgba(58, 53, 65, 0.78)',
    fontFamily: font.reg,
    fontSize: 14,
  },
  userImageContainer: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  userNameInitials: {
    alignItems: 'center',
    backgroundColor: 'rgba(58,53,65,.08)',
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 45,
  },
})
