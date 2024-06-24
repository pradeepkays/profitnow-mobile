import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { utcToLocal } from 'src/helper/timeHelper'

import { color, font } from '../Styles'

type Props = {
  data: any
  userData: any
}
const UserCallList = ({ data, userData }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.userImageContainer}>
        <View style={styles.userNameInitials}>
          <Text style={styles.initials}>{userData?.initials}</Text>
        </View>
        <View style={styles.smsImageShort}>
          <Image
            source={require('assets/img/call.png')}
            style={styles.callIcon}
          />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.userName}>
          {userData?.first_name} {userData?.last_name}
        </Text>
        <View style={styles.flRow}>
          {data.object.direction === 'outgoing' ? (
            <Image
              source={require('assets/img/right-arrow.png')}
              style={styles.outgoingIcon}
            />
          ) : (
            <Image
              source={require('assets/img/right-arrow.png')}
              style={styles.inComingIcon}
            />
          )}
          <Text style={styles.timeText}>{utcToLocal(data?.time) || '-'}</Text>
        </View>
      </View>
    </View>
  )
}

export default UserCallList

const styles = StyleSheet.create({
  callIcon: {
    height: '45%',
    resizeMode: 'contain',
    tintColor: '#fff',
    width: '45%',
  },
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailsContainer: {
    marginLeft: 15,
  },
  flRow: {
    flexDirection: 'row',
  },
  inComingIcon: {
    height: 15,
    resizeMode: 'contain',
    tintColor: '#B24000',
    transform: [{ rotate: '140deg' }],
    width: 15,
  },
  initials: {
    color: '#000',
    fontFamily: font.semi,
    fontSize: 18,
  },
  outgoingIcon: {
    height: 15,
    resizeMode: 'contain',
    tintColor: '#4CB200',
    transform: [{ rotate: '320deg' }],
    width: 15,
  },
  smsImageShort: {
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
    marginLeft: 3,
  },
  userImageContainer: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  userName: {
    color: color.fontcolor,
    fontFamily: font.semi,
    marginBottom: 5,
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
